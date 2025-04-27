"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("./src/bootstrap/application"));
try {
    const app = new application_1.default();
    app.run();
}
catch (APPException) {
    console.error(`Error occured while booting..!   \n# ErrorCode: ${APPException.code} \n# ErrorMessage: ${APPException.message} \n# ErrorLine: ${(_c = ((_b = (_a = APPException === null || APPException === void 0 ? void 0 : APPException.stack) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.split('\n    at')[1])) === null || _c === void 0 ? void 0 : _c.trim()}`);
    process.exit(1);
}
process.on('uncaughtException', (err) => {
    var _a, _b, _c, _d, _e, _f;
    const msg = (_c = ((_b = (_a = err === null || err === void 0 ? void 0 : err.stack) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.split('\n    at')[0])) === null || _c === void 0 ? void 0 : _c.trim();
    const stack = (_f = ((_e = (_d = err === null || err === void 0 ? void 0 : err.stack) === null || _d === void 0 ? void 0 : _d.toString()) === null || _e === void 0 ? void 0 : _e.split('\n    at')[1])) === null || _f === void 0 ? void 0 : _f.trim();
    console.error(`UnCaught Exception Error:\nMessage: ${msg}\nStack: ${stack}`);
});
process.on('unhandledRejection', (err) => {
    var _a, _b, _c, _d, _e, _f;
    const msg = (_c = ((_b = (_a = err === null || err === void 0 ? void 0 : err.stack) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.split('\n    at')[0])) === null || _c === void 0 ? void 0 : _c.trim();
    const stack = (_f = ((_e = (_d = err === null || err === void 0 ? void 0 : err.stack) === null || _d === void 0 ? void 0 : _d.toString()) === null || _e === void 0 ? void 0 : _e.split('\n    at')[1])) === null || _f === void 0 ? void 0 : _f.trim();
    console.error(`UnHandled Rejection Error:\nMessage: ${msg}\nStack: ${stack}`);
});
