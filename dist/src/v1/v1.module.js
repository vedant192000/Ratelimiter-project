"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_route_groups_1 = __importDefault(require("express-route-groups"));
const items_master_controller_1 = __importDefault(require("./controller/items-master.controller"));
const rate_limiter_middleware_1 = __importDefault(require("../common/middlewares/rate-limiter-middleware"));
const token_middleware_1 = __importDefault(require("../common/middlewares/token-middleware"));
const QueueMessages_controller_1 = __importDefault(require("./controller/QueueMessages.controller"));
const v1 = (0, express_1.default)();
const rateLimiter = new rate_limiter_middleware_1.default().getmiddleware;
const tokenMiddleware = new token_middleware_1.default();
const verifyTokenMiddleware = new token_middleware_1.default().verifyAppTokenMiddleware;
const itemsManagementController = new items_master_controller_1.default();
const rabbitMessangerController = new QueueMessages_controller_1.default();
v1.post('/login', (req, res) => { tokenMiddleware.createToken(req, res); });
v1.use((0, express_route_groups_1.default)('/items', [verifyTokenMiddleware, rateLimiter], (router) => {
    router.get('/list', (req, res) => { itemsManagementController.fetch(req, res); });
}));
v1.get('/messages', (req, res) => {
    rabbitMessangerController.fetch(req, res);
});
exports.default = v1;
