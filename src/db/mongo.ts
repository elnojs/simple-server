import mongoose from "mongoose";
import {MongoClientOptions } from "mongodb";
import mongoose_delete from "mongoose-delete"



type TInput = {
  dbUrl: string;
  options?: MongoClientOptions;
}

mongoose.plugin(mongoose_delete, { overrideMethods: "all" })

export const  connect = ({dbUrl, options}: TInput): void  => {
    const connect = async () => {
        if(!dbUrl){
            throw new Error("dont have mongo url");
        }
        mongoose
            .connect(
                dbUrl,
                {  keepAlive: true,
                    autoIndex: false,
                    promiseLibrary: global.Promise,
                      ...options
                }
            )
            .then(() => {
                return console.info(`Successfully connected to ${dbUrl}`);
            })
            .catch(error => {
                console.error("Error connecting to database: ", error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on("disconnected", connect);

};




