import amqp, { Channel, Connection } from 'amqplib';

class RabbitMQConnector {
    private static instance: RabbitMQConnector;
    private static connection: Connection;
    private static channel: Channel;
    static publicMessages: any[] = []

    private constructor() { }

    private async connect(): Promise<void> {
        const maxRetries = 5;
        let attempt = 0;
        try {

            const rabbitMQUrl = CONFIG?.rabbitmq?.url;
            RabbitMQConnector.connection = await amqp.connect(rabbitMQUrl, { heartbeat: 60 });
            RabbitMQConnector.channel = await RabbitMQConnector.connection.createChannel();
            await RabbitMQConnector.channel.assertQueue(CONFIG.rabbitmq?.queue, { durable: true });

            console.info(`App connected to RABBITMQ SERVER`);
        } catch (error) {
            attempt += 1;
            if (attempt <= maxRetries) {
                console.log(`Attempt ${attempt} failed. Retrying...`);
                setTimeout(() => { this.connect }, 5000); // retry after 5 seconds
            } else {
                console.error('Failed to connect to RabbitMQ:', error);
            }
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    public static async getChannel(): Promise<Channel> {
        if (!RabbitMQConnector.connection || !RabbitMQConnector.channel) {
            RabbitMQConnector.instance = new RabbitMQConnector();
            await RabbitMQConnector.instance.connect();
        }
        return RabbitMQConnector.channel;
    }

    public static async publish(queueName: string, data: any): Promise<void> {
        try {
            const channel = await RabbitMQConnector.getChannel();
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        } catch (error) {
            console.error('Error publishing to RabbitMQ:', error);
            throw error;
        }
    }


    public static async consume() {
        try {
            const channel = await RabbitMQConnector.getChannel();
            channel.consume(global.CONFIG.rabbitmq.queue, (msg) => {
                if (msg !== null) {
                    const data = JSON.parse(msg.content.toString());
                    console.log(`Received:`, data);

                    // Save received data
                    RabbitMQConnector.publicMessages.push(data);

                    // important -> manually acknowledge message
                    channel.ack(msg);
                }
            }, { noAck: false });


        } catch (error) {
            console.error('Error consuming from RabbitMQ:', error);
            throw error;
        }
    }


    public static async close(): Promise<void> {
        if (RabbitMQConnector.connection) {
            try {
                await RabbitMQConnector.channel.close();
                await RabbitMQConnector.connection.close();
                console.info('RabbitMQ connection closed');
            } catch (error) {
                console.error('Failed to close RabbitMQ connection:', error);
            }
        }
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Gracefully shutting down RabbitMQ connection...');
    await RabbitMQConnector.close();
    process.exit(0);  // Exit the process after closing the connection
});

export default RabbitMQConnector;
