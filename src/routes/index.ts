import fs from "fs";

const createRouter = (express: any ) => {
    const router = new express.Router();

    fs.readdirSync(`${__dirname}/`)
        .filter(file => (file.indexOf(".js") >= 0 && file !== "index.js")||(file.indexOf(".ts") >= 0 && file !== "index.ts"))
        .forEach(async route => {
            const routeName = route.replace(/(\.ts|\.js)/, "");
            const rounteFileRead = await import(`${__dirname}/${route}`);
            const routeFunction = rounteFileRead.default(express);
            router.use(`/${routeName}`, routeFunction);
        });

    return router;

};


export default createRouter;
