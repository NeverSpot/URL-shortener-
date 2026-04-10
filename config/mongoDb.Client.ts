import dotenv from "dotenv";
import {MongoClient, Db, Collection} from "mongodb";
import {singleton} from "tsyringe";
import {type IUrl, UrlDocument} from "../Models/Url.js";

dotenv.config()

@singleton()
export class MongoDb{
    private readonly client:MongoClient;
    private readonly db: Db;
    private readonly collection:Collection<UrlDocument>;

    constructor() {
        this.client = new MongoClient(process.env.MONGO_URI as string);
        this.db=this.client.db(process.env.DB_NAME);
        this.collection=this.db.collection<IUrl>("urls")

        this.client.connect()
            .then(async ()=> {
                console.log("MongoDb Connected")
                await this.collection.createIndex(
                    { shortUrl: 1 },
                    { unique: true, name: "idx_shortUrl" }
                );
            })
            .catch(console.error);

    }

    getCollection() {
        return this.collection;
    }
}
