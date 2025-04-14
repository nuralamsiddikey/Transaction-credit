import Joi from 'joi';

const transactionSchema = Joi.object({
  amount: Joi.number().required(),
});

export const transactionValidate = (value) => {
  return transactionSchema.validate(value);
};

const updateTransactionSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .default('pending')
    .messages({
      'any.only': 'Status must be either pending, approved, or rejected.',
    }),
});

export const updateTransactionValidate = (value) => {
  return updateTransactionSchema.validate(value);
};
