import {createClient} from 'redis';
import {injectable} from "tsyringe";


@injectable()
export class RedisClient{
    private readonly client;
    constructor() {
        this.client = createClient({
            username: 'default',
            password: '7luVk29fCwOzlY4yiQ8kSTwuXtzib554',
            socket: {
                host: 'redis-11230.c93.us-east-1-3.ec2.cloud.redislabs.com',
                port: 11230
            }
        });

        this.client.connect()
            .then(()=>console.log("Redis Connected"))
            .catch(console.error);

    }
    getClient() {
        return this.client;
    }
}


