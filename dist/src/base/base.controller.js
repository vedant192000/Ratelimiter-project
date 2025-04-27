"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exception_1 = __importDefault(require("../common/exceptions/api.exception"));
const error_handler_1 = __importDefault(require("../common/handlers/error-handler"));
class BaseController {
    constructor() { }
    httpOk(res, data) {
        try {
            if ('debug' in data) {
                delete data.debug;
            }
            const jsonResponse = {
                status: HTTP_CODE.OK,
                message: HTTP_MESG.OK,
                data
            };
            res.body = jsonResponse;
            res.status(HTTP_CODE.OK).send(res.body);
        }
        catch (baseError) {
            const apiException = new api_exception_1.default('', baseError.stack);
            error_handler_1.default.handle(res, apiException);
        }
    }
    httpError(res, error) {
        try {
            let exception = error;
            if (typeof error.isHandled == 'undefined' || (error === null || error === void 0 ? void 0 : error.isHandled) === false) {
                exception = new api_exception_1.default();
            }
            res.body = res;
            res.status(exception.status).send(res.body);
        }
        catch (baseError) {
            const apiException = new api_exception_1.default('', baseError.stack);
            error_handler_1.default.handle(res, apiException);
        }
    }
}
exports.default = BaseController;
