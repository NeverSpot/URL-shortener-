import { Router } from 'express';
import {UrlController} from '../Controllers/Url.Controller.js'
import {container} from "tsyringe";


export const urlRoute = Router();
const urlController = container.resolve(UrlController);
console.log("Route created");


urlRoute.post('/', urlController.write.bind(urlController));
urlRoute.get('/:shortUrl', urlController.read.bind(urlController));
