import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number(),
  NODE_ENV: Joi.string().valid('development', 'production'),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.number().optional(),
  JWT_SECRET: Joi.string().required(),
});
