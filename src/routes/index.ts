import { Router } from 'express';
import {ssr} from './ssr';

// Export the base-router
const baseRouter = Router();
baseRouter.get('*', ssr);
export default baseRouter;
