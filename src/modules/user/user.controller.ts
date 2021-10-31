import simpleServer from "simple-server-uitls"
import bcrypt from "bcrypt"
import userRepository from "./user.repository"
import {userSchema, registerSchema, loginSchema, changePasswordSchema} from "./user.validator"
import {IUserControllerType} from  "./user.type"
import { Request, Response , NextFunction} from "express"
import { signJwt } from "../../lib/auth"


const userController = simpleServer.generateController(userRepository, userSchema) as IUserControllerType


userController.login = async (req: Request,res: Response, next : NextFunction) =>  {
  try {
    const loginData = await loginSchema.validateAsync(req.body)
    const user = await userRepository.findOne({email : loginData.email})
    let err: ExtendedError
    if(!user){
      err =  new Error("email or password un match") as ExtendedError
      err.statusCode = 401
      throw err
    }

  const isPasswordMatch = bcrypt.compareSync(loginData.password, user.password)
  if(!isPasswordMatch){
    err =  new Error("email or password un match") as ExtendedError
    err.statusCode = 401
    throw err
  }
  const token = signJwt({email: user.email, name: user.name, _id: user._id})

  return res.json({ token })

  } catch (error) {
    return next(error);
  }
}


userController.register = async (req: Request,res: Response, next : NextFunction) =>  {
  try {
    const registerData =  await registerSchema.validateAsync(req.body,{stripUnknown: true}).catch(err => {
      err.statusCode =  401
      throw err
    })
    const createdData = await userRepository.create(registerData)
    const user = await userRepository.findById(createdData._id)
    const token = signJwt({email: user.email, name: user.name, _id: user._id})

    return res.json({token})

  } catch (error) {
    return next(error);
  }
}

userController.changePassword= async (req: Request, res: Response, next : NextFunction) =>  {
  try {
    const chagePasswordData =  await changePasswordSchema.validateAsync(req.body,{stripUnknown: true}).catch(err => {
      err.statusCode =  401
      throw err
    })
    const user = await userRepository.findOne({email : chagePasswordData.email})
    let err: ExtendedError
    if(!user){
      err =  new Error("email or password un match") as ExtendedError
      err.statusCode = 401
      throw err
    }

  const isPasswordMatch = bcrypt.compareSync(chagePasswordData.password, user.password)
  if(!isPasswordMatch){
    err =  new Error("email or password un match") as ExtendedError
    err.statusCode = 401
    throw err
  }
  const newUser = { ...user, password: chagePasswordData.newPassword }

  await userRepository.updateOne({ _id: user._id }, newUser)

  return res.json({ message: "update password success" })

  } catch (error) {
    return next(error);
  }
}

export default userController