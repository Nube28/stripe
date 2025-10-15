import express from 'express';
import * as paymentController from '../controllers/paymentController.js';

const router = express.Router();
router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.getPayment);
router.put('/:id', paymentController.processPayment);

export { router };
