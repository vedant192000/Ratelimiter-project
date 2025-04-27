"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exception_1 = __importDefault(require("../exceptions/api.exception"));
const rateLimiter_exception_1 = __importDefault(require("../exceptions/rateLimiter.exception"));
class ErrorHandler {
    constructor() { }
    static handle(res, capturedError) {
        try {
            let errorResponse = {
                status: (capturedError === null || capturedError === void 0 ? void 0 : capturedError.status) || HTTP_CODE.INTERNAL_SERVER_ERROR,
                message: (capturedError === null || capturedError === void 0 ? void 0 : capturedError.message) || HTTP_MESG.INTERNAL_SERVER_ERROR,
                error: (capturedError === null || capturedError === void 0 ? void 0 : capturedError.body) || {}
            };
            if (capturedError instanceof rateLimiter_exception_1.default) {
                console.error(`Instance of RateLimiterExceptionException : ${errorResponse.message}`);
            }
            else if (capturedError instanceof api_exception_1.default) {
                console.error(`Instance of APIException : ${errorResponse.message}`);
            }
            else {
                console.warn(`This error was not handled :Instance of Error : ${errorResponse.message}`);
            }
            res.body = errorResponse;
            res.status(errorResponse.status).header(HTTP_HEADER.CONTENT_TYPE, HTTP_HEADER.JSON).send(res.body);
        }
        catch (error) {
            const exception = new api_exception_1.default('', error.stack);
            res.body = { status: HTTP_CODE.INTERNAL_SERVER_ERROR, message: HTTP_MESG.INTERNAL_SERVER_ERROR, error: exception.body };
            res.status(exception.status).header(HTTP_HEADER.CONTENT_TYPE, HTTP_HEADER.JSON).send(res.body);
        }
    }
}
exports.default = ErrorHandler;
