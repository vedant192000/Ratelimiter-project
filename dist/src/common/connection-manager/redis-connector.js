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
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = __importDefault(require("../config"));
class RedisConnector {
    constructor() {
        RedisConnector.connectionInstance = this.connect();
    }
    connect() {
        var _a, _b;
        try {
            const client = new ioredis_1.default({
                host: (_a = config_1.default.redis) === null || _a === void 0 ? void 0 : _a.host,
                port: (_b = config_1.default.redis) === null || _b === void 0 ? void 0 : _b.port
            });
            client.on('connect', () => {
                console.info('App connected to REDIS SERVER');
            });
            client.on('error', (error) => {
                console.error('Redis connection error', error);
            });
            return client;
        }
        catch (error) {
            console.error('Redis connection setup error', error);
            throw error;
        }
    }
    static getInstance() {
        if (!(RedisConnector.instance instanceof RedisConnector)) {
            RedisConnector.instance = new RedisConnector();
        }
        return RedisConnector.connectionInstance;
    }
    static closeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (RedisConnector.instance instanceof RedisConnector) {
                (yield RedisConnector.connectionInstance).quit();
                console.info('Redis connection closed');
            }
        });
    }
}
exports.default = RedisConnector;
