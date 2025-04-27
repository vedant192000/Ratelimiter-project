"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedException extends Error {
    constructor(message = '') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.UNAUTHORIZED;
        this.message = message || HTTP_MESG.UNAUTHORIZED;
        this.isHandled = true;
        this.body = {};
    }
}
exports.default = UnauthorizedException;
