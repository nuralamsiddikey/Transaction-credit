import { Router } from 'express';
import transactionController from './transaction.controller.js';
import { jwtAuth,jwtAuthAdmin,jwtAuthUser } from '../../middleware/auth/jwtAuth.js';

const transactionRouter = Router();

transactionRouter
  .post('/transactions',jwtAuth,transactionController.createTransaction)
  .get('/transactions',jwtAuthAdmin,transactionController.getAllTransactionByAdmin)
  .get('/transactions/self',jwtAuthUser,transactionController.getTransactionByUserId)
  .put('/transactions/:id',jwtAuthAdmin,transactionController.updateTransactionStatus)

export default transactionRouter
