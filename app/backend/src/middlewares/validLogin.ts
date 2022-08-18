import * as Joi from 'joi';

const errorEmailPassword = '401-Incorrect email or password';

const errorEmpty = '400-All fields must be filled';

const loginSchemas = Joi.object({
  email: Joi.string().email().empty().required()
    .messages({
      'string.base': errorEmailPassword,
      'string.empty': errorEmpty,
      'string.email': errorEmailPassword,
      'any.required': errorEmpty,
    }),

  password: Joi.string().min(6).empty().required()
    .messages({
      'string.base': errorEmailPassword,
      'string.empty': errorEmpty,
      'string.min': errorEmailPassword,
      'any.required': errorEmpty,
    }),
});

export default loginSchemas;
