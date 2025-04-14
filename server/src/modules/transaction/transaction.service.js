import { NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import transactionRepository from './transaction.repository.js';

class TransactionService extends BaseService {
  #transactionRepository;
  #serviceName;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#transactionRepository = repository;
    this.#serviceName = serviceName;
  }

  createTransaction = async (transactionEntries) =>
    await this.#transactionRepository.createTransaction(transactionEntries);

  getAllTransactionByAdmin = async () => {  
    const data = await this.#transactionRepository.getAllTransactionByAdmin();
    return data;
  };

  getTransactionByUserId = async (userId) => {
    const data = await this.#transactionRepository.getTransactionByUserId(userId);
    //if (!data) throw new NotFoundError('Transaction not found');
    return data;
  };

  updateTransactionStatus = async (transactionEntries) => {
    const data = await this.#transactionRepository.updateTransactionStatus(transactionEntries);
   
    return data;
  };
  
}

export default new TransactionService(transactionRepository, 'transaction');
