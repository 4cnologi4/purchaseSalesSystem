import express from 'express';
import { DiscountController } from '../controllers/discount.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateJWT); // Aplica el middleware a todas las rutas de descuentos

router.get('/', DiscountController.getAllDiscounts);
router.get('/:id', DiscountController.getDiscountById);
router.post('/', ...DiscountController.createDiscount); // Usa el spread operator para los middlewares
router.put('/:id', ...DiscountController.updateDiscount); // Usa el spread operator para los middlewares
router.delete('/:id', DiscountController.deleteDiscount);

export default router; 