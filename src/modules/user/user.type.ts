import {  Document } from "mongoose";
import { Request, Response , NextFunction} from "express";


import {BaseControllerType} from "simple-server-uitls/dist/bases/controller"


export enum UserRoles {
  NONE= "user",
  ADMIN= "admin",
}


export interface IUser {
  name: Date
  phone_number: Record<string, unknown>
  email: Array<{address: string, verified: boolean}>
  password: string 
  roles: [string]
  profile_picture: string
}


export interface IUserControllerType extends  BaseControllerType {
login(req: Request, res: Response, next: NextFunction): void;
register(req: Request, res: Response, next: NextFunction): void;
changePassword(req: Request, res: Response, next: NextFunction): void;
}


export interface IUserBaseDocument extends IUser , Document {
  getUpdate(): Record<string, unknown>
  createdAt?: Date
  UpdatedAt?: Date
}