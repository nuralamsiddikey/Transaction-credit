import { Router } from 'express';

import userRoute from '../../modules/user/user.route.js';
import transactionRoute from '../../modules/transaction/transaction.route.js';
const rootRouter = Router();

rootRouter.use(userRoute);
rootRouter.use(transactionRoute);


export default rootRouter;
