import joi from 'joi';

export const anyTldEmailSchema = joi.string().email({ tlds: { allow: false } });
