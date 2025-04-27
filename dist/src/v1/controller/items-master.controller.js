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
const base_controller_1 = __importDefault(require("../../base/base.controller"));
const api_exception_1 = __importDefault(require("../../common/exceptions/api.exception"));
class ItemsManagementController extends base_controller_1.default {
    constructor() {
        super();
    }
    fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = {
                    itemsList: ["Iphone 16", "I-Watch", "Apple adapter"]
                };
                this.httpOk(res, json);
            }
            catch (error) {
                console.log(error);
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled === false) ? new api_exception_1.default(error.message, error.stack) : error;
                this.httpError(res, apiException);
            }
        });
    }
}
exports.default = ItemsManagementController;
