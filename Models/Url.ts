import {ObjectId} from "mongodb";

export interface IUrl {
    _id?: ObjectId;
    longUrl: string;
    shortUrl: string;
    createdAt: Date;
}

export class UrlDocument implements IUrl {
    _id?: ObjectId;
    createdAt:Date;
    constructor(public longUrl: string,public shortUrl: string) {
        this.createdAt=new Date();
    }
}

