import Joi from 'joi';

const userSchema = Joi.object({
  fullname: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Fullname must be a string.',
    'string.empty': 'Fullname cannot be empty.',
    'string.min': 'Fullname must be at least 3 characters long.',
    'string.max': 'Fullname must be at most 30 characters long.',
    'any.required': 'Fullname is required.',
  }),
  username: Joi.string().min(3).max(30).required(),

  balance: Joi.number().optional(),
  password: Joi.string().min(6).max(30).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password cannot be empty.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.max': 'Password must be at most 30 characters long.',
    'any.required': 'Password is required.',
  }),
  isAdmin: Joi.boolean().default(false).messages({
    'boolean.base': 'isAdmin must be a boolean.',
    'any.required': 'isAdmin is required.',
  }),
}); 

export const userValidate = (value) => {
  return userSchema.validate(value);
};



const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginValidate = (value) => {
  return loginSchema.validate(value);
};
