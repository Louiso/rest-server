import userRoute from "./user";
import loginRoute from "./login";
import { Router } from 'express';

const indexRoute = Router();

indexRoute.use(userRoute);
indexRoute.use(loginRoute);

export default indexRoute;