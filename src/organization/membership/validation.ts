import joi from 'joi';
import roles from './roles';
import userSchema from '../../user/validation';

const membershipSchema = joi.array().items(joi.object({
  role: joi.string().allow(...Object.values(roles)),
  user: userSchema.required()
})).min(2);

export default membershipSchema;
