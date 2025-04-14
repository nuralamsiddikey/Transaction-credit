
import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required.'],
    },
    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;
