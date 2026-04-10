import type {IUrlService} from "../Interfaces/IUrlService.js";
import type {IUrlEncoder} from "../Interfaces/IUrlEncoder.js";
import {injectable, inject} from "tsyringe";
import type {IRedisCache} from "../Interfaces/IRedisCache.js";
import type {IUrlRepository} from "../Interfaces/IUrlRepository.js";


@injectable()
export class UrlService implements IUrlService{
    constructor(
        @inject("IUrlEncoder") private encoder:IUrlEncoder,
        @inject("IRedisCache") private redis:IRedisCache,
        @inject("IUrlRepository") private repo:IUrlRepository) {
        console.log("UrlService created");
    }

    async addUrl(longUrl: string): Promise<string|null> {
        let key=await this.redis.getLatestNumber();
        const shortUrl=await this.encoder.getShortUrl(key);

        // add to dataBase
        try{
            await this.repo.push(longUrl,shortUrl);
            await this.redis.push(longUrl,shortUrl);
        }catch (e){
            console.log(e);
            return null;
        }

        return shortUrl;
    }

     async getLongUrl(shortUrl: string): Promise<string|null> {

        try{
            // try to find in Redis
            const cached =await this.redis.get(shortUrl);

            // redis cache HIT, direct yahi se send krdo
            if(cached !==null)return cached ;
        }catch (error){
            console.log("Error while find Url in Redis \n",error);
        }


        try{
            // Cache Miss lets find in DataBase
            const longUrl=await this.repo.get(shortUrl);

            // Repo cache HIT
            if(longUrl!==null){
                // add to Redis
                await this.redis.push(longUrl,shortUrl);
            }
            return longUrl;

        }catch (error){
            console.log("Error while find Url in Repo \n",error);
            return null;
        }
     }



}
