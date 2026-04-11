import type {Request, Response} from 'express';
import type {IUrlService} from "../Interfaces/IUrlService.js";
import {injectable,inject} from "tsyringe";
import { z } from "zod";


const UrlSchema=z.object({longUrl:z.url()})

@injectable()
export class UrlController{

    constructor(
        @inject("IUrlService") private urlService: IUrlService
    ) {
        console.log("Controller created");
    }

    async write(req:Request,res:Response){
        const result = UrlSchema.safeParse(req.body);

        if (!result.success) {
            res.status(422).send("Invalid URL");
            return;
        }
        const longUrl  =result.data.longUrl;
        try {
            const shortUrl = await this.urlService.addUrl(longUrl);
            if(shortUrl===null)res.status(500).json({ error: "Short Url is null" });
            else res.status(201).json({ shortUrl });
        } catch (e) {
            res.status(500).json({ error: "Error creating URL" });
        }
    }

    async read(req:Request,res:Response){
        const shortUrl  = req.params["shortUrl"];
        if(typeof shortUrl!=="string"){
            res.status(422).send("Invalid Url");
            return;
        }
        const longUrl=await this.urlService.getLongUrl(shortUrl);
        if (longUrl !== null) {
            res.status(200).redirect(longUrl);
        }else{
            res.status(404).send("URL NOT FOUND")
        }
    }

}
