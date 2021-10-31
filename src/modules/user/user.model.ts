
   
/* eslint-disable func-style */
import { model, Schema, Model } from "mongoose"
import bcrypt from "bcrypt"
import { UserRoles, IUserBaseDocument } from "./user.type";
const saltRounds = Number(process.env.SALTROUND)

const userRolesObj : Array<string> = Object.keys(UserRoles as Record<string, string>).map((serviceKey: string) => (UserRoles as Record<string, string>)[serviceKey] );

const $ = {
  name:"Users",
  schema:  new Schema({
    name: {
      type: String,
      required: true,
    },
    phone_number: String,
    email: {
      type: String,
      required: true,
      index: true,
      trim: true,
      unique: true,
    },
    password: String,
    roles: {
      type: [String], 
      enum: userRolesObj 
    },
    profile_picture: String,
  },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    })
}





$.schema.pre<IUserBaseDocument>("validate", function(next) {
  const pswdHashed = bcrypt.hashSync(this.password, saltRounds)

  // eslint-disable-next-line no-invalid-this
  this.password = pswdHashed

  return next()

});

const $model = model<IUserBaseDocument, Model<IUserBaseDocument> >($.name, $.schema);

$model.createIndexes()

export default $model; 