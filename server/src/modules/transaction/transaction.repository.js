import BaseRepository from '../base/baseRepository.js';
import TransactionModel from './transaction.model.js';
import UserModel from '../user/user.model.js';

class TransactionRepository extends BaseRepository {
  #model;
  #userModel;
  constructor(model, userModel) {
    super(model);
    this.#model = model;
    this.#userModel = userModel;
  }
  createTransaction = async (transactionEntries) => {
    const category = new this.#model(transactionEntries);
    return await category.save();
  };
  getAllTransactionByAdmin = async () => {
    const data = await this.#model.find().populate('user','fullname balance');
    return data;
  };
  getTransactionByUserId = async (userId) => {
    const data = await this.#model.find({ user: userId }).sort({ createdAt: -1 })
    return data;
  };
  

  updateTransactionStatus = async (transactionEntries) => {
    const { transactionId, status } = transactionEntries;

    const transaction = await this.#model.findById(transactionId);
    
    if (!transaction) throw new NotFoundError('Transaction not found');
    const { user, amount } = transaction;

    await this.#model.findByIdAndUpdate(
      transactionId,
      { status },
      {
        new: true,
      }
    );

    if (status === 'completed') {
      await this.#userModel.updateOne(
        { _id: user },
        {
          $inc: {
            balance: amount,
          },
        }
      );
    }

    return;
  };
}

export default new TransactionRepository(TransactionModel,UserModel);
