import { Request, Response, NextFunction } from "express";
import APIException from "../exceptions/api.exception";
import ErrorHandler from "../handlers/error-handler";
import CacheHandler from "../handlers/cache-handler";
import RateLimiterException from "../exceptions/rateLimiter.exception";
import RabbitMQConnector from "../connection-manager/rabbitqueue-connector";

/**
* =======================================
*  Rate Limiter Middleware
* ---------------------------------------
* @author : Vedant Maral
* @desc : controls the number of requests a client can make within a specific time frame.
* @version : 1.0.0
*/
class RateLimiterMiddleware {

    private middleware: any;
    private cacheHandler: CacheHandler


    constructor() {
        this.init();
        this.cacheHandler = new CacheHandler()

    }

    private init() {

        this.middleware = async (req: Request, res: Response, next: NextFunction) => {
            try {

                const userKey = req.userInfo.user_id;
                const cacheKey = this.generateCacheKey(userKey)


                let cachedRequests = await this.cacheHandler.GET(cacheKey);
                console.log(cachedRequests)

                if (!cachedRequests) {
                    await this.cacheHandler.SET(cacheKey, 1, { "EX": CONFIG.rateLimit.windowMs });

                } else if (parseInt(cachedRequests) >= CONFIG.rateLimit.maxRequests) {
                    // Log message sent to Kafka
                    await RabbitMQConnector.publish(CONFIG.rabbitmq.queue, {
                        userKey,
                        message: HTTP_MESG.TO_MANY_REQUEST
                    });

                    throw new RateLimiterException()
                } else {
                    await this.cacheHandler.INCR(cacheKey);
                }
                next();

            } catch (error: any) {
                const apiException = (typeof error.isHandled == 'undefined' || error.isHandled == false) ? new APIException('', error.stack) : error;
                ErrorHandler.handle(res, apiException);
            }
        }

    }

    get getmiddleware(): any {
        return this.middleware
    }

    private generateCacheKey(userID: string): string {
        return `rate-limit:${userID}`
    }

}

export default RateLimiterMiddleware;
