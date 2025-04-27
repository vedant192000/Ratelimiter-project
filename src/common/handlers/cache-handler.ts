import Redis from "ioredis";
import RedisConnector from "../connection-manager/redis-connector";

interface SetOptions {
    EX?: number; // Expiration in seconds
    PX?: number; // Expiration in milliseconds
    NX?: boolean; // Only set if key does not exist
    XX?: boolean; // Only set if key already exists
}

class CacheHandler {

    private readonly redisConnector: Redis;

    constructor() {
        this.redisConnector = RedisConnector.getInstance();
    }

    async GET(key: string) {
        try {
            const redis = await this.redisConnector;
            const response = await redis.get(key);
            return response; // No need for Promise.resolve inside async
        } catch (error: any) {
            console.error("GET Error:", error);
            throw error;
        }
    }

    async SET(key: string, value: any, options?: SetOptions) {
        try {
            const redis = await this.redisConnector;

            const args: (string | number)[] = [key, value];

            if (options?.EX) {
                args.push("EX", options.EX);
            } else if (options?.PX) {
                args.push("PX", options.PX);
            }

            if (options?.NX) {
                args.push("NX");
            } else if (options?.XX) {
                args.push("XX");
            }

            const response = await redis.set(...(args as [string, string, ...any[]]));
            return response;
        } catch (error: any) {
            console.error("SET Error:", error);
            throw error;
        }
    }

    async INCR(key: string) {
        try {
            const redis = await this.redisConnector;
            const response = await redis.incr(key);
            return response;
        } catch (error: any) {
            console.error("INCR Error:", error);
            throw error;
        }
    }

}

export default CacheHandler;
