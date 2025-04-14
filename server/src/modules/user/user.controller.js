import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import { idValidate } from '../../utils/requestValidate.js';
import responseHandler from '../../utils/responseHandler.js';
import userService from './user.service.js';
import { loginValidate, userValidate} from './user.validate.js';


class UserController {
  #userService;
  constructor(userService) {
    this.#userService = userService;
  }

  createUser = catchError(async (req, res, next) => {
    const { error, value } = userValidate(req.body)
    if (error) {
      throw new BadRequestError(error.message)
    }
    const data = await this.#userService.createUser(value);
    const resDoc = responseHandler(201, 'User created successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getSelfInfo = catchError(async (req, res, next) => {
     console.log(req.user);
    const data = await this.#userService.getSelfInfo(req.user.userId);
    const resDoc = responseHandler(201, 'User fetched successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  })

  signIn = catchError(async (req, res, next) => {
   
    const { error, value } = loginValidate(req.body)
    if (error) {
      throw new BadRequestError(error.message)
    }


    const data = await this.#userService.signIn(value);
    const resDoc = responseHandler(200, 'Signedin successfully', data);
    res.status(resDoc.statusCode).json(resDoc);
  });



}

export default new UserController(
  userService
);
