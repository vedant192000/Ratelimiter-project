"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_http_context_1 = __importDefault(require("express-http-context"));
class AppMiddleware {
    constructor() { }
    loadMiddlewares() {
        const { CORS_OPTIONS, BODY_PARSER_OPTIONS } = CONSTANTS;
        const bodyParserMiddleware = body_parser_1.default.json();
        const bodyUrlEncodedMiddleware = body_parser_1.default.urlencoded(BODY_PARSER_OPTIONS);
        const corsMiddleware = (0, cors_1.default)(CORS_OPTIONS);
        const httpContextMiddleware = express_http_context_1.default.middleware;
        return [
            httpContextMiddleware,
            bodyParserMiddleware,
            bodyUrlEncodedMiddleware,
            corsMiddleware,
        ];
    }
}
exports.default = AppMiddleware;
