import express from 'express';
import authRoute from './auth.route.js';

const router= express.Router();
router.use('/auth',authRoute);    ///sends requests to auth routes

export default router;