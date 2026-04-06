import mongoose, { Schema } from 'mongoose';

interface IUrl{
    shortUrl:string;
    longUrl:string;
}
const UrlSchema=new Schema<IUrl>({
    shortUrl:{type:"string", required:true, unique:true},
    longUrl:{type:"string",required:true}
})

export default mongoose.model<IUrl>('Url', UrlSchema);
