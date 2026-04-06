import type {IUrlEncoder} from "../Interfaces/IUrlEncoder.js";
import {inject, injectable} from "tsyringe";
import {RedisClient} from "../config/redis.Client.js";


@injectable()
export class Base62Encoder implements IUrlEncoder{

    redis;
    constructor(
        @inject(RedisClient) private redisClient: RedisClient
    ) {
        this.redis=this.redisClient.getClient();
    }
    mapping="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    async getShortUrl(key:number): Promise<string> {
        let shortUrl="";
        while(key>0){
            shortUrl+=this.mapping[key%62];
            key=Math.floor(key/62);
        }
        return shortUrl;
    }
}
