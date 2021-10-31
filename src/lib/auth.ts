import jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
dotenv.config();


const secret  =  process.env.SECRET || ""

export const signJwt = (data: Record<string, unknown>) => {
  return jwt.sign({ ...data },secret)
}

export const verifyJwt = (token: string):Record<string, unknown> => jwt.verify(token,secret) as Record<string, unknown>

export const decodeJwt = (token: string) => jwt.decode(token)