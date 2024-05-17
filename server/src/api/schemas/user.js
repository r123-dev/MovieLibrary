const Joi = require('joi');

const validationSchema = {};

validationSchema.register = Joi.object({
  // eslint-disable-next-line newline-per-chained-call
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  description: Joi.string().allow(''),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  watchList: Joi.array(),
});

validationSchema.login = Joi.object({
  // eslint-disable-next-line newline-per-chained-call
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

validationSchema.update = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  firstName: Joi.string().min(3).max(30),
  lastName: Joi.string().min(3).max(30),
  description: Joi.string().allow(''),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  title: Joi.string().disallow(''),
});

module.exports = validationSchema;
