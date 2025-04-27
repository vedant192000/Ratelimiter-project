import { Response } from "express";
import { JsonResponseType } from "../common/types";
import APIException from "../common/exceptions/api.exception";
import ErrorHandler from "../common/handlers/error-handler";


/**
* =======================================
*  Base Controller
* ---------------------------------------
* @author : Vedant Maral
* @desc : Base class for controllers in an application handles success and error response.
* @version : 1.0.0
*/

class BaseController {

    constructor() { }

    /**
    * @author : Vedant Maral
    * @desc : Function handles all the success responses
    * @param {object} res : Express response object
    * @param {object} data : Json response object
    * @return {void}
    */
    public httpOk(res: Response, data: object): void {
        try {

            //* Removed the debug data from the final API Response;
            if ('debug' in data) {
                delete data.debug;
            }

            const jsonResponse: JsonResponseType = {
                status: HTTP_CODE.OK,
                message: HTTP_MESG.OK,
                data
            }

            res.body = jsonResponse;
            res.status(HTTP_CODE.OK).send(res.body);
        } catch (baseError: any) {
            const apiException = new APIException('', baseError.stack);
            ErrorHandler.handle(res, apiException);
        }
    }

    /**
    * @author :  Vedant Maral
    * @desc : Function handles all the handled errors
    * @param {object} res : Express response object
    * @param {object} error : Error object
    * @return {void}
    */
    public httpError(res: Response, error: any): void {
        try {
            let exception = error
            if (typeof error.isHandled == 'undefined' || error?.isHandled === false) { exception = new APIException(); }
            res.body = res;
            res.status(exception.status).send(res.body);

        } catch (baseError: any) {
            const apiException = new APIException('', baseError.stack);
            ErrorHandler.handle(res, apiException);
        }
    }
}

export default BaseController;