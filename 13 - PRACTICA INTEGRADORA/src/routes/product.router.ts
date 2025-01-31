import { Router } from "express";
import { productController } from "../controllers/product.controller";
import { validatePostProduct } from "../middlewares/validators/product.validator";
const router = Router();

router.get('/', productController.getAll);
router.post('/', [validatePostProduct], productController.create);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;