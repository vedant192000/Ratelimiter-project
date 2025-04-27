const CONFIGURATION = {
    APP_PUBLIC_KEY_PATH: global.env?.PUBLIC_KEY_PATH || 'src/common/config/application-keys/publicKey.pem' as string,
    APP_PRIVATE_KEY_PATH: global.env?.PRIVATE_KEY_PATH || 'src/common/config/application-keys/privateKey.pem' as string,
    APP_PORT:global.env.NODE_PORT || 3009,
    ROUTE_PATH:'/E-commerce',
    TOKEN_EXPIRY: global.env?.TOKEN_EXPIRY || 86400,
    PASSPHRASE: '',
    redis: {
        host: (process.env.USE_KUBE =='YES') ? 'redis' :global.env.REDIS_HOST || 'localhost',
        port: global.env.REDIS_PORT || 6379,
    },
    rateLimit: {
        windowMs: global.env?.TROTTLE_WINDOW || 15 * 60 * 1000, // 15 minutes
        maxRequests: global.env?.TROTTLE_REQUEST || 5,
    },
    rabbitmq: {
        url: (process.env.USE_KUBE =='YES') ? 'amqp://rabbitmq:5672' : global.env.RABBITMQ_URL || 'amqp://localhost',
        queue: 'excessive_requests',
    },
}

export default CONFIGURATION;