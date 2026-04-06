export interface IUrlEncoder{
    getShortUrl(key:number):Promise<string>;
}
