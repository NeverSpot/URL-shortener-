import { container } from "tsyringe";
import { Base62Encoder } from "./Services/Base62Encoder.js";
import { UrlService} from "./Services/Url.Service.js";
import {RedisCache} from "./Repositories/RedisCache.js";
import {NoSqlRepository} from "./Repositories/NoSql.Repository.js";
import {RedisClient} from "./config/redis.Client.ts";
import {MongoDb} from "./config/mongoDb.Client.ts";

container.registerSingleton(RedisClient);
container.registerSingleton(MongoDb);

container.register("IUrlService",{useClass:UrlService});
container.register("IUrlRepository",{useClass:NoSqlRepository});
container.register("IUrlEncoder",{useClass:Base62Encoder});
container.register("IRedisCache",{useClass:RedisCache});

console.log("Container loaded");
