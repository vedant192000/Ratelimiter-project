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
const application_config_1 = __importDefault(require("./application.config"));
const redis_connector_1 = __importDefault(require("../common/connection-manager/redis-connector"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class App extends application_config_1.default {
    constructor() {
        super();
        this.app = (0, express_1.default)();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.static(path_1.default.join(__dirname, '../common/public')));
            this.middleware();
            this.routes();
            yield redis_connector_1.default.getInstance();
            const appServer = this.app.listen(CONFIG.APP_PORT, () => {
                console.info(`Application is running at ${CONFIG.APP_PORT}`);
            });
            process.on('SIGINT', () => this.closeApp('SIGINT', appServer));
            process.on('SIGTERM', () => this.closeApp('SIGTERM', appServer));
        });
    }
    middleware() {
        this.middlewares.forEach((m) => {
            this.app.use(m);
        });
    }
    routes() {
        this.app.use(CONFIG.ROUTE_PATH, this.router);
    }
    closeApp(signal, appServer) {
        console.info(`${signal.toUpperCase()} received closing app!`);
        appServer.close(() => {
            console.info('Node server closed!');
            redis_connector_1.default.closeInstance();
            process.exit(0);
        });
    }
}
exports.default = App;
