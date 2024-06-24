import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'First name is required.' }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ 'string.empty': 'Last name is required.' }),
  // emailOrPhone: Joi.alternatives([
  //   Joi.string().email({ tlds: false }),
  //   Joi.string().pattern(/^[0-9]{10}$/)
  // ]).messages({
  //   'alternatives.match': 'Invalid email address or phone number.'
  // }),
  email: Joi.string().required().email({ tlds: false })
  .messages({ 
    'string.empty': 'Email is required.',
    'string.email': 'Email is invalid.'
  }),
  phone: Joi.string().required().pattern(/^[0-9]{10}$/)
  .messages({
    'string.empty': 'Phone number is required.',
    'string.pattern.base': 'Phone number requires 10 numbers.'
  }),
  password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base':
        'Password must be at least 6 characters and contain only alphabet and number.'
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.empty': 'Confirm password is required.',
    'any.only': 'Password and confirm password did not match.'
  })
});

const registerValidate = input => {
  const { error } = registerSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      // return error.details;
      return acc;
    }, {});

    return result;
  }
};

export default registerValidate;