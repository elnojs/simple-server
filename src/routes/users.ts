import userController from "../modules/user/user.controller";
import { authorizationUser} from "../middlewares/auth"
import configJson from "../config.json"


const routerGenerator  = (express: any) => 
    new express.Router()
        .post("/login",userController.login )
        .post("/register",userController.register )
        .use(authorizationUser())
        .put("/forget-password",userController.changePassword)
        .get("/:id", userController.getOne)
        .use(authorizationUser({roles:[configJson.roles.ADMIN]}))
        .get("/", userController.get)



export default routerGenerator;