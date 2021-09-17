import joi from 'joi';

export const organizationSchema = joi.object({
  parentId: joi.string(),
  name: joi.string().alter({
    create: schema => schema.required(),
    update: schema => schema
  })
});
