import { NotFoundError, UnauthorizedError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

class UserService extends BaseService {
  #userRepository;
  #serviceName;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#userRepository = repository;
    this.#serviceName = serviceName;
  }

  createUser = async (userEntries) => {
    const { password } = userEntries;
    const hashedPassword = await bcrypt.hash(password, 10);
    userEntries.password = hashedPassword;
    return await this.#userRepository.createUser(userEntries);
  };

  getSelfInfo = async (userId) => {
    const user = await this.#userRepository.getSelfInfo(userId);
    if (!user) throw new NotFoundError('User not found');
    const { password, ...userInfo } = user._doc;
    return userInfo;
  }



  async signIn({username, password}) {
   
   let user = await this.#userRepository.findUser(username);
    if (!user) throw new UnauthorizedError('unauthorized');

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) throw new UnauthorizedError('unauthorized');

    const accessToken = generateAccessToken({
      user: {userId:user._id,isAdmin: user.isAdmin},
    });
        
    const refreshToken = generateRefreshToken({
      user: {userId:user._id,isAdmin: user.isAdmin},
    });

    const userRes = { 
      username: user.username,
      fullname: user.fullname,
      balance: user.balance,
      isAdmin: user.isAdmin,
    };
    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      user: userRes,
    };


    
  }


}

export default new UserService(UserRepository, 'user');
