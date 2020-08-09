import * as fs from 'fs';
import * as path from 'path';

export class GetDataService {
    async getData(payload:any){
        
        const {module_name, screen_name} = payload;
        const jsonPath = path.join(__dirname, '..', 'ui-config', 'specification', `${module_name}`, `${screen_name}.json`);

        let data = '';
        return new Promise((resolve, reject) => {
            const readerStream = fs.createReadStream(jsonPath);
            readerStream.setEncoding("utf-8");
            readerStream.on('data', chunk => {
                data += chunk;
            });
    
            readerStream.on('end',() => {
                resolve(data);
            });
    
            readerStream.on('error', err => {
                if(err.stack.includes('no such file')){
                    reject({message: "Invalid module_name or screen_name or no such module present"});
                } else {
                    reject(err.message);
                }
            });
        });    
    }
}