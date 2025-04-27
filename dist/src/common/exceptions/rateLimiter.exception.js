"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RateLimiterException extends Error {
    constructor(message = '') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.TO_MANY_REQUEST;
        this.message = message || HTTP_MESG.TO_MANY_REQUEST;
        this.isHandled = true;
        this.body = {};
    }
}
exports.default = RateLimiterException;
