import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import responseHandler from '../../utils/responseHandler.js';
import transactionService from './transaction.service.js';
import {
  transactionValidate,
  updateTransactionValidate,
} from './transaction.validate.js';

class TransactionController {
  #transactionService;
  constructor(transactionService) {
    this.#transactionService = transactionService;
  }

  createTransaction = catchError(async (req, res, next) => {
    const { error, value } = transactionValidate(req.body);

    if (error) {
      throw new BadRequestError(error.message);
    }

    const data = await this.#transactionService.createTransaction({
      ...value,
      user: req.user.userId,
    });
    const resDoc = responseHandler(
      201,
      'Transaction created successfully',
      data
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllTransactionByAdmin = catchError(async (req, res, next) => {
    const data = await this.#transactionService.getAllTransactionByAdmin();
    const resDoc = responseHandler(
      200,
      'Transaction fetched successfully',
      data
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getTransactionByUserId = catchError(async (req, res, next) => {
    const userId = req.user.userId;
    const data = await this.#transactionService.getTransactionByUserId(userId);
    const resDoc = responseHandler(
      200,
      'Transaction fetched successfully',
      data
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateTransactionStatus = catchError(async (req, res, next) => {
    const { error, value } = updateTransactionValidate(req.body);

    if (error) {
      throw new BadRequestError(error.message);
    }

    const data = await this.#transactionService.updateTransactionStatus({
      ...value,
      transactionId: req.params.id,
    });
    const resDoc = responseHandler(
      200,
      'Transaction updated successfully',
      data
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
}

export default new TransactionController(transactionService);
