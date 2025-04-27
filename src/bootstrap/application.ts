import AppConfig from "./application.config";
import RedisConnector from "../common/connection-manager/redis-connector";
import express, { Application } from 'express';
import path from "path";
import RabbitMQConnector from "../common/connection-manager/rabbitqueue-connector";




/**
* =======================================
*  Application Class
* ---------------------------------------
* @author : Vedant Maral
* @desc : Boot the application
* @param {array} middleware: Array of the all the required middlewares on load
* @param {object} routes: Application router
* @version : 1.0.0
*/


class App extends AppConfig  {

    private app: Application;

    constructor() {
        super()
        this.app = express();
    }

    public async run(): Promise<void> {
        this.app.use(express.static(path.join(__dirname,'../common/public')));
        this.middleware();
        this.routes();
        await RedisConnector.getInstance();

        (async () => {
            await RabbitMQConnector.consume();
        })();

        const appServer = this.app.listen(CONFIG.APP_PORT, () => {
            console.info(`Application is running at ${CONFIG.APP_PORT}`);
        });

        process.on('SIGINT', () => this.closeApp('SIGINT', appServer));
        process.on('SIGTERM', () => this.closeApp('SIGTERM', appServer));

    }

    private middleware(): void {
        this.middlewares.forEach((m: any): void => {
            this.app.use(m);
        })
    }

    private routes(): void {
        this.app.use(CONFIG.ROUTE_PATH, this.router)
    }

    private closeApp(signal: string, appServer: any) {
        console.info(`${signal.toUpperCase()} received closing app!`);
        appServer.close(() => {
            console.info('Node server closed!');
            RedisConnector.closeInstance();
            process.exit(0)
        });
    }

}

export default App