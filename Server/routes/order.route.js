import express from 'express'
import {getOrders,payment,confirm } from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router= express.Router()


router.get("/",verifyToken,getOrders);
router.post("/create-payment/:id",verifyToken,payment)
router.put("/",verifyToken,confirm)

export default router;