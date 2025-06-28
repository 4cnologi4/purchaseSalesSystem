import express from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authenticateJWT); // Aplica el middleware a todas las rutas de productos

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ...ProductController.createProduct); // Usa el spread operator para los middlewares
router.put('/:id', ...ProductController.updateProduct); // Usa el spread operator para los middlewares
router.delete('/:id', ProductController.deleteProduct);

export default router; 