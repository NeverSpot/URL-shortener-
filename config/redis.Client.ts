import {createClient} from 'redis';
import {singleton} from "tsyringe";
import dotenv from "dotenv";
dotenv.config();


@singleton()
export class RedisClient{
    private readonly client;
    constructor() {
        this.client = createClient({
            username: (process.env.REDIS_USERNAME as string),
            password: (process.env.REDIS_PASSWORD as string),
            socket: {
                host: (process.env.REDIS_HOST as string),
                port: Number(process.env.REDIS_PORT)
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


