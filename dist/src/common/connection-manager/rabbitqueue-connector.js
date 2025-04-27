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
const amqplib_1 = __importDefault(require("amqplib"));
class RabbitMQConnector {
    constructor() { }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const maxRetries = 5;
            let attempt = 0;
            try {
                const rabbitMQUrl = (_a = CONFIG === null || CONFIG === void 0 ? void 0 : CONFIG.rabbitmq) === null || _a === void 0 ? void 0 : _a.url;
                RabbitMQConnector.connection = yield amqplib_1.default.connect(rabbitMQUrl, { heartbeat: 60 });
                RabbitMQConnector.channel = yield RabbitMQConnector.connection.createChannel();
                yield RabbitMQConnector.channel.assertQueue((_b = CONFIG.rabbitmq) === null || _b === void 0 ? void 0 : _b.queue, { durable: true });
                console.info(`App connected to RABBITMQ SERVER`);
            }
            catch (error) {
                attempt += 1;
                if (attempt <= maxRetries) {
                    console.log(`Attempt ${attempt} failed. Retrying...`);
                    setTimeout(() => { this.connect; }, 5000);
                }
                else {
                    console.error('Failed to connect to RabbitMQ:', error);
                }
                console.error('Error connecting to RabbitMQ:', error);
                throw error;
            }
        });
    }
    static getChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!RabbitMQConnector.connection || !RabbitMQConnector.channel) {
                RabbitMQConnector.instance = new RabbitMQConnector();
                yield RabbitMQConnector.instance.connect();
            }
            return RabbitMQConnector.channel;
        });
    }
    static publish(queueName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield RabbitMQConnector.getChannel();
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
            }
            catch (error) {
                console.error('Error publishing to RabbitMQ:', error);
                throw error;
            }
        });
    }
    static consume() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield RabbitMQConnector.getChannel();
                channel.consume(global.CONFIG.rabbitmq.queue, (msg) => {
                    if (msg !== null) {
                        const data = JSON.parse(msg.content.toString());
                        console.log(`Received:`, data);
                        RabbitMQConnector.publicMessages.push(data);
                        channel.ack(msg);
                    }
                }, { noAck: false });
                return RabbitMQConnector.publicMessages;
            }
            catch (error) {
                console.error('Error consuming from RabbitMQ:', error);
                throw error;
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (RabbitMQConnector.connection) {
                try {
                    yield RabbitMQConnector.channel.close();
                    yield RabbitMQConnector.connection.close();
                    console.info('RabbitMQ connection closed');
                }
                catch (error) {
                    console.error('Failed to close RabbitMQ connection:', error);
                }
            }
        });
    }
}
RabbitMQConnector.publicMessages = [];
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Gracefully shutting down RabbitMQ connection...');
    yield RabbitMQConnector.close();
    process.exit(0);
}));
exports.default = RabbitMQConnector;
