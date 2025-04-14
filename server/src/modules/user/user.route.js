import { Router } from 'express';
import UserController from './user.controller.js';
const userRouter = Router();
import { jwtAuthUser ,jwtAuth} from '../../middleware/auth/jwtAuth.js';

userRouter.post('/users', UserController.createUser);
userRouter.post('/users/signin', UserController.signIn);
userRouter.get('/users/self', jwtAuth, UserController.getSelfInfo);

export default userRouter;
