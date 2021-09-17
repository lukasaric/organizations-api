import { anyTldEmailSchema } from '../utils/validation';
import joi from 'joi';
import roles from './roles';

const userSchema = joi.object({
  email: anyTldEmailSchema.required(),
  role: joi.string().allow(...Object.values(roles)).required(),
  firstName: joi.string().required(),
  lastName: joi.string().required()
}).unknown();

export default userSchema;
