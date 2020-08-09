import * as express from 'express';
import { Request, Response } from "express";
import { GetDataService } from '../services/getDataService';

const router = express.Router();
const getJsonData = new GetDataService();

router.get('/get-meta-data/:module_name/:screen_name', function(req:Request , res:Response) {
    getJsonData.getData(req.params)
    .then(result => {
        if(result && typeof(result) === 'string'){
            res.status(200).send(JSON.parse(result));
        } else if(!result){
            res.status(200).send({message: "file has no content in it"});
        } else {
            res.status(200).send(result);
        }
    }).catch( err => {
        res.status(404).send(err);
    });
})  

export default router;