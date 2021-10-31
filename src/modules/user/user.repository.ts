import simpleServer from "simple-server-uitls"
import userModel from "./user.model"

const userRepository = simpleServer.generateRepository(userModel)


export default userRepository