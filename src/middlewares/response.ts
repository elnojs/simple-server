import {Request,  Response , NextFunction,} from "express";
const ENV = process.env.NODE_ENV || "development";


export const errorMidleware = (err: any, _: Request, res: Response, next: NextFunction): void => {

    if (!err) {
        return next();
    }
    err.stack =
    ENV.toLowerCase() === "production" ? () =>({ }): err.stack;
    res.status(err.statusCode || 500);
    res.json({
        time: new Intl.DateTimeFormat(["en"], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }).format(new Date()),
        message: err.message,
        stack: err.stack
    });  
    return;
};



export const jsonData = (_:Request, res: Response, next: NextFunction): void => {
    const resJsonOld = res.json;
    res.json = args => {
        args = {
            data: args,
            statusCode: res.statusCode
        };
        Reflect.apply(resJsonOld, res, [args]);
        return res;
    };

    return next();
};