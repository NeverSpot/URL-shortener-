import type {IRedisCache} from "../Interfaces/IRedisCache.js";
import {inject, injectable} from "tsyringe";
import {RedisClient} from "../config/redis.Client.js";

@injectable()
export class RedisCache implements IRedisCache{
    private readonly redis;
    constructor(
        @inject(RedisClient) redisClient: RedisClient
    ) {
        this.redis=redisClient.getClient();
    }

    async get(shortUrl: string): Promise<string | null> {
        try {
            return await this.redis.get(shortUrl);
        }catch (error){
            console.log("Redis get failed",error);
            throw error;
        }
    }

    async push(longUrl:string,shortUrl:string):Promise<void>{
        try {
            await this.redis.set(shortUrl,longUrl, {
                EX:3600 // 1 hour
            });
        }catch (error){
            console.log("Redis set failed",error);
            throw error;
        }
    }

    async getLatestNumber():Promise<number>{
        return await this.redis.INCR("key");
    }

}