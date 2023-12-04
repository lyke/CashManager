import express, { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

export class ProductsRoute {
  private router: Router = express.Router();
  private readonly productController: ProductsController;

  constructor(db: any) {
    this.productController = new ProductsController(db);
    this.routes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private routes(): void {
    this.router.get(
      "/",
      this.productController.getAllProducts.bind(this.productController)
    );

    this.router.get(
      '/:id',
      this.productController.getProductById.bind(this.productController));

    this.router.post(
      '/',
      this.productController.createProduct.bind(this.productController));

    this.router.put(
      '/:id',
      this.productController.updateProduct.bind(this.productController));

    this.router.delete(
      '/:id',
      this.productController.deleteProduct.bind(this.productController));
  }
}
