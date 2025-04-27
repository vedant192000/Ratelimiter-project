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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = __importDefault(require("../handlers/error-handler"));
const api_exception_1 = __importDefault(require("../exceptions/api.exception"));
const session_exception_1 = __importDefault(require("../exceptions/session.exception"));
const unauthorized_exception_1 = __importDefault(require("../exceptions/unauthorized.exception"));
const config_1 = __importDefault(require("../config"));
class TokenMiddleware {
    constructor() {
        this.init();
    }
    init() {
        this.verifyAppTokenFunction = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof req.headers.authorization == 'undefined')
                    throw new unauthorized_exception_1.default();
                const token = req.headers.authorization.split(' ')[1];
                const publicAbsolutePath = path_1.default.join(config_1.default.APP_PUBLIC_KEY_PATH);
                const publicKey = fs_1.default.readFileSync(publicAbsolutePath, 'utf-8');
                const verifiedToken = jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ['RS256'] });
                req.userInfo = verifiedToken;
                next();
            }
            catch (error) {
                if (error.message == 'jwt expired') {
                    error = new session_exception_1.default(error.message);
                }
                else if (typeof error.isHandled == 'undefined' || error.isHandled == false) {
                    error = new api_exception_1.default('', error.stack);
                }
                error_handler_1.default.handle(res, error);
            }
        });
        this.createTokenFunction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const absolutePath = path_1.default.resolve(config_1.default.APP_PRIVATE_KEY_PATH);
                const privateKey = fs_1.default.readFileSync(absolutePath, 'utf-8');
                const token = jsonwebtoken_1.default.sign(payload, {
                    key: privateKey,
                    passphrase: config_1.default.PASSPHRASE
                }, {
                    expiresIn: parseInt(config_1.default.TOKEN_EXPIRY),
                    algorithm: 'RS256'
                });
                res.status(HTTP_CODE.OK).send({ token: `Bearer ${token}` });
            }
            catch (error) {
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled == false) ? new api_exception_1.default(error.message, error.stack) : error;
                return Promise.reject(apiException);
            }
        });
    }
    get verifyAppTokenMiddleware() {
        return this.verifyAppTokenFunction;
    }
    get createToken() {
        return this.createTokenFunction;
    }
}
exports.default = TokenMiddleware;
