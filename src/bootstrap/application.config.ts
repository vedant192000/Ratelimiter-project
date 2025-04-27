/** Setting the secure .env process before loading the configurations */
import dotenv from 'dotenv';
const env_creds = dotenv.config();
global.env = env_creds.parsed;
import { Router } from "express";
import { HEADERS, MESSAGES, STATUS, ERROR_CLASS } from '../common/config/http-config'
import AppMiddleware from "../common/middlewares";
import appRouter from "../router/routes";
import CONFIGURATION from '../common/config/index';
import constants from '../common/config/constant';

/**
* =======================================
*  Application Config
* ---------------------------------------
* @author : Vedant Maral
* @desc : Load the application configuration
* @param {DataType} :
* @created_at : 07/09/2023
* @updated_at : 07/09/2023
* @version : 1.0.0
*/

class AppConfig {

    private appMiddlewares : AppMiddleware;
    protected middlewares!: Array<Function>;
    protected router!: Router;

    constructor() {
        this.appMiddlewares = new AppMiddleware();
        this.autoload()
    }
    
    /**
    * @author : Vedant Maral
    * @desc : Define APP properties to the application global object
    * @protected
    * @return {void} :
    */
    protected async autoload() {

        /** Setting up the global app parameters */
        global.CONFIG = CONFIGURATION;

        /** Setting up the global HTTP Status codes */
        global.HTTP_CODE = STATUS;

        /** Setting up the global HTTP Status code messages */
        global.HTTP_MESG = MESSAGES;

        /** Setting up the global HTTP Headers */
        global.HTTP_HEADER = HEADERS;

        /** Setting up the global HTTP Error Class */
        global.ERROR_CLASS = ERROR_CLASS;

        global.CONSTANTS = constants

        this.middlewares = this.appMiddlewares.loadMiddlewares();
        this.router = appRouter;
        
    }
}

export default AppConfig;