import express from "express";
import config from "./config/config";
import { dbConnection } from "./config/db.connection";
import errorHandler from "./middlewares/validators/error.handler";
import apiRouter from './routes/index';

const app = express();

app.use(express.json());

const PORT = config.PORT;

app.use('/api', apiRouter);

//@ts-ignore
app.use(errorHandler);

dbConnection()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
