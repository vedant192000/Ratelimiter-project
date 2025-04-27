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
const redis_connector_1 = __importDefault(require("../connection-manager/redis-connector"));
class CacheHandler {
    constructor() {
        this.redisConnector = redis_connector_1.default.getInstance();
    }
    GET(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const redis = yield this.redisConnector;
                const response = yield redis.get(key);
                return response;
            }
            catch (error) {
                console.error("GET Error:", error);
                throw error;
            }
        });
    }
    SET(key, value, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const redis = yield this.redisConnector;
                const args = [key, value];
                if (options === null || options === void 0 ? void 0 : options.EX) {
                    args.push("EX", options.EX);
                }
                else if (options === null || options === void 0 ? void 0 : options.PX) {
                    args.push("PX", options.PX);
                }
                if (options === null || options === void 0 ? void 0 : options.NX) {
                    args.push("NX");
                }
                else if (options === null || options === void 0 ? void 0 : options.XX) {
                    args.push("XX");
                }
                const response = yield redis.set(...args);
                return response;
            }
            catch (error) {
                console.error("SET Error:", error);
                throw error;
            }
        });
    }
    INCR(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const redis = yield this.redisConnector;
                const response = yield redis.incr(key);
                return response;
            }
            catch (error) {
                console.error("INCR Error:", error);
                throw error;
            }
        });
    }
}
exports.default = CacheHandler;
