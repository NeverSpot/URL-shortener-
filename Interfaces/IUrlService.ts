export interface IUrlService{
    addUrl(longUrl:string):Promise<string>;
    getLongUrl(shortUrl:string):Promise<string>; // redirect
}
