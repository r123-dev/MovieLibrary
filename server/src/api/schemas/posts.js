const Joi = require('joi');

const validationSchema = {};

validationSchema.createPost = Joi.object({
  // eslint-disable-next-line newline-per-chained-call
  username: Joi.string().alphanum().min(3).max(30).required(),
  title: Joi.string().max(120),
  comment: Joi.string(),
});

validationSchema.postBy = Joi.object({
  title: Joi.string().max(120).required().allow(''),
});

validationSchema.update = Joi.object({
  post: Joi.string(),
});

module.exports = validationSchema;
