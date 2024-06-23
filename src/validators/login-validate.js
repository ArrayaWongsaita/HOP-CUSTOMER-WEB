import Joi from 'joi';

const loginSchema = Joi.object({
  emailOrPhone: Joi.string().required()
    .messages({
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
      return acc;
    }, {});

    return result;
  }
};

export default loginValidate;