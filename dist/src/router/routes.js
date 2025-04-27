"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_module_1 = __importDefault(require("../v1/v1.module"));
const appRouter = express_1.default.Router();
appRouter.all('/health-check', (req, res) => {
    res.status(200).send({
        status: 200,
        message: "success",
    });
});
appRouter.use('/api/v1/', v1_module_1.default);
appRouter.all('*', (req, res) => {
    res.status(404).send({ status: 404, message: `Method [${req.method}] Path : ${req.originalUrl} route not found.` });
});
exports.default = appRouter;
