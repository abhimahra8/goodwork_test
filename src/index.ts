import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import router from './routes/getMetadata';

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});


export { app };  