"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_exception_1 = __importDefault(require("../exceptions/api.exception"));
const error_handler_1 = __importDefault(require("../handlers/error-handler"));
const cache_handler_1 = __importDefault(require("../handlers/cache-handler"));
const rateLimiter_exception_1 = __importDefault(require("../exceptions/rateLimiter.exception"));
const rabbitqueue_connector_1 = __importDefault(require("../connection-manager/rabbitqueue-connector"));
class RateLimiterMiddleware {
    constructor() {
        this.init();
        this.cacheHandler = new cache_handler_1.default();
    }
    init() {
        this.middleware = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userKey = req.userInfo.user_id;
                const cacheKey = this.generateCacheKey(userKey);
                let cachedRequests = yield this.cacheHandler.GET(cacheKey);
                console.log(cachedRequests);
                if (!cachedRequests) {
                    yield this.cacheHandler.SET(cacheKey, 1, { "EX": CONFIG.rateLimit.windowMs });
                }
                else if (parseInt(cachedRequests) >= CONFIG.rateLimit.maxRequests) {
                    yield rabbitqueue_connector_1.default.publish(CONFIG.rabbitmq.queue, {
                        userKey,
                        message: HTTP_MESG.TO_MANY_REQUEST
                    });
                    throw new rateLimiter_exception_1.default();
                }
                else {
                    yield this.cacheHandler.INCR(cacheKey);
                }
                next();
            }
            catch (error) {
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled == false) ? new api_exception_1.default('', error.stack) : error;
                error_handler_1.default.handle(res, apiException);
            }
        });
    }
    get getmiddleware() {
        return this.middleware;
    }
    generateCacheKey(userID) {
        return `rate-limit:${userID}`;
    }
}
exports.default = RateLimiterMiddleware;
