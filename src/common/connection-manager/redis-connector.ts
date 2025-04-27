import Redis from "ioredis";
import CONFIGURATION from "../config";

class RedisConnector {

    private static instance: RedisConnector;
    private static connectionInstance: Redis;

    constructor() {
        RedisConnector.connectionInstance = this.connect()
    }

    private connect(): Redis {
        try {

            const client = new Redis({
                host: CONFIGURATION.redis?.host,
                port: CONFIGURATION.redis?.port
            });

            client.on('connect', () => {
                console.info('App connected to REDIS SERVER');
            });

            client.on('error', (error) => {
                console.error('Redis connection error', error);
            });

            return client;
        } catch (error) {
            console.error('Redis connection setup error', error);
            throw error;
        }
    }

    public static getInstance(): Redis {
        if (!(RedisConnector.instance instanceof RedisConnector)) {
            RedisConnector.instance = new RedisConnector();
        }
        return RedisConnector.connectionInstance;
    }

    public static async closeInstance() {
        if (RedisConnector.instance instanceof RedisConnector) {
            (await RedisConnector.connectionInstance).quit();
            console.info('Redis connection closed');
        }
    }
}

export default RedisConnector