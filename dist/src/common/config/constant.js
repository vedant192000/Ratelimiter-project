"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = {
    CORS_OPTIONS: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
    },
    BODY_PARSER_OPTIONS: { extended: true }
};
exports.default = constants;
