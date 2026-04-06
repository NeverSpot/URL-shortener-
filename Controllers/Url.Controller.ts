import type {Request, Response} from 'express';
import type {IUrlService} from "../Interfaces/IUrlService.js";
import {injectable,inject} from "tsyringe";



@injectable()
export class UrlController{

    constructor(
        @inject("IUrlService") private urlService: IUrlService
    ) {
        console.log("Controller created");
    }

    async write(req:Request,res:Response){
        const { longUrl } = req.body;
        if(typeof longUrl!=="string"){
            res.status(422).send("Invalid Url");
            return;
        }
        const shortUrl=await this.urlService.addUrl(longUrl);
        res.status(201).json({ shortUrl });
    }

    async read(req:Request,res:Response){
        const shortUrl  = req.params["shortUrl"];
        if(typeof shortUrl!=="string"){
            res.status(422).send("Invalid Url");
            return;
        }
        const longUrl=await this.urlService.getLongUrl(shortUrl);
        res.status(200).redirect(longUrl);
    }

}
