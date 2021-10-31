import { Request, Response } from "express";


const routerGenerator  = (express: any) => 
    new express.Router()
        .get("/", (_: Request, res: Response) => {
            res.send("hello");
        })
        .post("/", (_: Request, res: Response) => {
            res.send("hello");
        });


export default routerGenerator;