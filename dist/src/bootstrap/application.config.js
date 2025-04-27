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
const dotenv_1 = __importDefault(require("dotenv"));
const env_creds = dotenv_1.default.config();
global.env = env_creds.parsed;
const http_config_1 = require("../common/config/http-config");
const middlewares_1 = __importDefault(require("../common/middlewares"));
const routes_1 = __importDefault(require("../router/routes"));
const index_1 = __importDefault(require("../common/config/index"));
const constant_1 = __importDefault(require("../common/config/constant"));
class AppConfig {
    constructor() {
        this.appMiddlewares = new middlewares_1.default();
        this.autoload();
    }
    autoload() {
        return __awaiter(this, void 0, void 0, function* () {
            global.CONFIG = index_1.default;
            global.HTTP_CODE = http_config_1.STATUS;
            global.HTTP_MESG = http_config_1.MESSAGES;
            global.HTTP_HEADER = http_config_1.HEADERS;
            global.ERROR_CLASS = http_config_1.ERROR_CLASS;
            global.CONSTANTS = constant_1.default;
            this.middlewares = this.appMiddlewares.loadMiddlewares();
            this.router = routes_1.default;
        });
    }
}
exports.default = AppConfig;
