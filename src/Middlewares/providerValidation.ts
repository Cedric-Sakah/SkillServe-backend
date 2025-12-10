import Joi from "joi";

export const createProviderSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
  serviceType: Joi.string().min(2).required(),
  status: Joi.string().valid("active", "inactive").default("active"),
});

export const updateProviderSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(8),
  serviceType: Joi.string().min(2),
  status: Joi.string().valid("active", "inactive"),
});
