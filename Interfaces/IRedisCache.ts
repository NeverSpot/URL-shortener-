export interface IRedisCache{
    get(shortUrl:string):Promise<string|null>;
    push(longUrl:string,shortUrl:string):Promise<void>;
    getLatestNumber(): Promise<number>;
}