import {Request,  Response, NextFunction} from "express";
import {verifyJwt } from "../lib/auth"
import {  Document } from "mongoose";
import  {BaseRepositoryType}  from "simple-server-uitls/dist/bases/repository.type"




export const extractUser = <T extends Document>  (usersRepository: BaseRepositoryType<T> ) =>  async(req: Request, _: Response, next: NextFunction) : Promise<void> => {
    try {
      let token : string |string[] = req.headers.authorization || req.headers.Authorization || ''
      if(!token){
        return next()
      }
      if (Array.isArray(token)){
        token = token[0]
      }
      let user : any = verifyJwt(token)

      if(!user || !user._id){
        return next();      
      }

      user =  await usersRepository.findById(user._id)
      

      req.user = user;
      return next();
    } catch (error) {
        return next(error);
    }
};

interface AuthorizationUserInputType{
  roles?: Array<string>
}
export const authorizationUser = ({roles} : AuthorizationUserInputType = {}) =>  (req: Request, _: Response, next: NextFunction): void => {
    try {
        if(!req.user){
            const error = new Error("unauthorized") as ExtendedError;
            error.statusCode = 401;
            return next(error);
        }


        if(! roles?.length){
          return next();
        }

        const userRoles : Array<string> =  req.user.roles || [];
        const isAuthorized = userRoles.find(role =>{ 
          return (roles||[]).includes(role)});

        if(!isAuthorized){
            const error = new Error("unauthorized") as ExtendedError;
            error.statusCode = 401;
            return next(error);
        }
        

        return  next();
    } catch (error) {
        return next(error);
    }
};