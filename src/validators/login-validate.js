import Joi from 'joi';

const loginSchema = Joi.object({
  emailOrPhone: Joi.string().required()
    .messages({
      'string.empty': 'Email address or phone number is required.',
      'alternatives.match': 'Invalid email address or phone number.'
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.'
  })
});

const loginValidate = input => {
  const { error } = loginSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      // return error.details;
      return acc;
    }, {});

    return result;
  }
};

export default loginValidate;