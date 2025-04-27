"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIGURATION = {
    APP_PUBLIC_KEY_PATH: ((_a = global.env) === null || _a === void 0 ? void 0 : _a.PUBLIC_KEY_PATH) || 'src/common/config/application-keys/publicKey.pem',
    APP_PRIVATE_KEY_PATH: ((_b = global.env) === null || _b === void 0 ? void 0 : _b.PRIVATE_KEY_PATH) || 'src/common/config/application-keys/privateKey.pem',
    APP_PORT: global.env.NODE_PORT || 3009,
    ROUTE_PATH: '/E-commerce',
    TOKEN_EXPIRY: ((_c = global.env) === null || _c === void 0 ? void 0 : _c.TOKEN_EXPIRY) || 86400,
    PASSPHRASE: '',
    redis: {
        host: (process.env.USE_KUBE == 'YES') ? 'redis' : global.env.REDIS_HOST || 'localhost',
        port: global.env.REDIS_PORT || 6379,
    },
    rateLimit: {
        windowMs: ((_d = global.env) === null || _d === void 0 ? void 0 : _d.TROTTLE_WINDOW) || 15 * 60 * 1000,
        maxRequests: ((_e = global.env) === null || _e === void 0 ? void 0 : _e.TROTTLE_REQUEST) || 5,
    },
    rabbitmq: {
        url: (process.env.USE_KUBE == 'YES') ? 'amqp://rabbitmq:5672' : global.env.RABBITMQ_URL || 'amqp://localhost',
        queue: 'excessive_requests',
    },
};
exports.default = CONFIGURATION;
