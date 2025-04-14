import BaseRepository from '../base/baseRepository.js';
import UserModel from './user.model.js';

class UserRepository extends BaseRepository {
  #model;

  constructor(model) {
    super(model);
    this.#model = model;
  }

  createUser = async (userEntries) => {
    const user = new this.#model(userEntries);
    return await user.save();
  };

  getSelfInfo = async (userId) => {
    return await this.#model.findById(userId);
  };

  findUser = async (username) => {
    return await this.#model.findOne({ username })
  };
}

export default new UserRepository(UserModel);
