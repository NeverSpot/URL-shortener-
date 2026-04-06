import type {IUrlRepository} from "../Interfaces/IUrlRepository.js";
import {inject, injectable} from "tsyringe";
import MongoDbClient from "../config/mongoDb.Client.js";


@injectable()
export class NoSqlRepository implements IUrlRepository{

    constructor(
        @inject(MongoDbClient) private mongo: MongoDbClient
    ){

    }

    async get(shortUrl: string): Promise<string | null> {
        try {
            return "";
            // return await this.mongo.get(shortUrl);
        }catch (error){
            console.log("Redis get failed",error);
            throw error;
        }
    }

    async push(longUrl:string,shortUrl:string):Promise<void>{
        try {
            // await this.mongo.set(url.getShortUrl(),url.getOriginalUrl());
        }catch (error){
            console.log("Redis set failed",error);
            throw error;
        }
    }

}