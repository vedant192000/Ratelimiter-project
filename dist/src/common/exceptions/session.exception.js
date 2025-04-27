"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SessionException extends Error {
    constructor(message = '') {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.status = HTTP_CODE.SESSION_EXPIRED;
        this.message = message || HTTP_MESG.SESSION_EXPIRED;
        this.isHandled = true;
        this.body = {};
    }
}
exports.default = SessionException;
