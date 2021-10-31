import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import routeGenerator from "./routes";
import {urlencoded, json } from "body-parser";
import {connect} from "./db/mongo";
import userRepository  from "./modules/user/user.repository";
import {extractUser} from "./middlewares/auth"
import {errorMidleware, 
    jsonData
} from "./middlewares/response";
import {parsedQueryAndSort} from "./middlewares/queries";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 4000;
const mongourl = process.env.MONGO_URL ||"mongodb://localhost:27017/simple-server?authSource=admin";

const jsonParser = json({  limit: "50mb" });
const urlencodedParser = urlencoded({ extended: false, limit: "50mb"});

app.use(cors());
app.use(urlencodedParser);
app.use(extractUser(userRepository))
app.use(jsonParser);
app.use(jsonData);
app.use(parsedQueryAndSort);

app.use("/", routeGenerator(express));


app.get("/", (_: Request, res: Response) => {
    res.status(200).send("Alive!!!!");
});

connect({dbUrl: mongourl});

app.use(errorMidleware);

const server = app.listen(PORT,()=>{
    console.log("Server Started at Port, " + PORT);
});

const shutdown = (): void => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
        console.log("Http server closed.");
    });
};


process.on("SIGINT", () => {
    shutdown();
});
process.on("SIGTERM", () => {
    shutdown();
});