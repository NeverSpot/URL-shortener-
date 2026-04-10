export interface IUrlService{
    addUrl(longUrl:string):Promise<string|null>;
    getLongUrl(shortUrl:string):Promise<string|null>; // redirect
}
