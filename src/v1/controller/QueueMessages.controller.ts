import BaseController from "../../base/base.controller";
import RabbitMQConnector from "../../common/connection-manager/rabbitqueue-connector";
import APIException from "../../common/exceptions/api.exception";
import { Request, Response } from "express"


class QueueMessagesController extends BaseController {

    constructor() {
        super();
    }

    public async fetch(req: Request, res: Response) {
        try {
            
            return res.json(RabbitMQConnector.publicMessages);

        } catch (error: any) {
            console.log(error)
            const apiException = (typeof error.isHandled == 'undefined'  || error.isHandled === false) ? new APIException(error.message, error.stack) : error;
            this.httpError(res, apiException);
        }
    }

}

export default QueueMessagesController;