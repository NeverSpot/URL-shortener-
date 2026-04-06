export interface IUrlRepository{
    get(shortUrl:string):Promise<string|null>;
    push(longUrl:string,shortUrl:string):Promise<void>;
}
