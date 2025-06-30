import express from 'express';
import { SaleController } from '../controllers/sale.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateJWT); // Aplica el middleware a todas las rutas de sales

router.get('/', SaleController.getAllSales);
router.post('/', ...SaleController.createSale);
router.get('/:id', SaleController.getSaleById);
router.put('/:id', ...SaleController.updateSale);
router.delete('/:id', SaleController.deleteSale);

export default router;