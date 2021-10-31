import {Request,  Response , NextFunction,} from "express";
import { parseSort, stringToQueryObj } from "../lib/helpers";

export const parsedQueryAndSort = async (req: Request, _: Response, next: NextFunction) : Promise<void> => {
    try {
        req.q = req.q ? {...stringToQueryObj(req.query), ...req.q }: stringToQueryObj(req.query);
        console.log(req.q)
        req.sort = parseSort(req.query.sort as string);
        req.skip = Number(req.query.skip || 0);
        req.limit = Number(req.query.limit || 10);

        next();
    } catch (error) {
        return next(error); 
    }
};