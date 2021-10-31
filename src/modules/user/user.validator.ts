import joi from "joi";


export const userSchema = joi.object({
  name: joi.object().required(),
  phone_number: joi.string().required(),
  email: joi.string().required(),
  password: joi.date().required(),
  roles: joi.string(),
  profile_picture: joi.date(),
});



export const registerSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 })
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  name: joi.string().min(1)
    .required()
})


export const changePasswordSchema = joi.object().keys({
  password: joi.string().required(),
  newPassword: joi.string().required()

})

export const loginSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 })
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
})