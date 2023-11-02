import express from 'express';
import authRoute from './auth.route.js';
import conversationRoute from './conversations.route.js';
import messageRoute from './message.route.js';
const router= express.Router();
router.use('/auth',authRoute);    ///sends requests to auth routes
router.use('/conversation',conversationRoute); 
router.use('/message',messageRoute);
export default router;