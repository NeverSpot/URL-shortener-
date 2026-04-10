import type {IUrlRepository} from "../Interfaces/IUrlRepository.js";
import {inject, injectable} from "tsyringe";
import {MongoDb} from "../config/mongoDb.Client.js";
import {UrlDocument} from "../Models/Url.js";

@injectable()
export class NoSqlRepository implements IUrlRepository{
    private readonly mongo;  // ← sirf class ke andar
    constructor(
        @inject(MongoDb) mongoClient: MongoDb
    ){
        this.mongo = mongoClient.getCollection();
    }

    async get(shortUrl: string): Promise<string | null> {

        try {
            const longUrl=await this.mongo.findOne({shortUrl});
            if(longUrl===null)return null;
            return longUrl.longUrl;
        }catch (error){
            console.log(`Database get failed ${error}`);
            throw error;
        }

    }

    async push(longUrl:string,shortUrl:string):Promise<void>{
        try {
            const newUrl=new UrlDocument(longUrl,shortUrl);
            await this.mongo.insertOne(newUrl);
        }catch (error){
            console.log(`Database push failed ${error}`);
            throw error;
        }
    }

}