"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIException extends Error {
    constructor(message = '', stack = '') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.status = HTTP_CODE.INTERNAL_SERVER_ERROR;
        this.message = message || HTTP_MESG.INTERNAL_SERVER_ERROR;
        this.isHandled = true;
        this.body = {
            type: 'Operational Error',
            stack: (stack != '') ? `[Function] ${(stack.toString().split('\n    at')[0]).trim()} \n ${(stack.toString().split('\n    at')[1]).trim()}` : ''
        };
    }
}
exports.default = APIException;
