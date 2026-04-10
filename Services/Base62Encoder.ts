import type {IUrlEncoder} from "../Interfaces/IUrlEncoder.js";
import {injectable} from "tsyringe";


@injectable()
export class Base62Encoder implements IUrlEncoder{

    private readonly mapping="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";

    async getShortUrl(key:number): Promise<string> {
        let shortUrl="";
        while(key>0){
            shortUrl+=this.mapping[key%62];
            key=Math.floor(key/62);
        }
        return shortUrl;
    }
}
