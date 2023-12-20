import express, { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

export class ProductsRoute {
  private api: Router = express.Router();
  private readonly productsController: ProductsController;

  constructor() {
    this.productsController = new ProductsController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    this.api.get(
      "/",
      this.productsController.getAllProducts.bind(this.productsController)
    );

    this.api.get(
      '/:id',
      this.productsController.getProductById.bind(this.productsController));

    this.api.post(
      '/',
      this.productsController.createProduct.bind(this.productsController));

    this.api.put(
      '/:id',
      this.productsController.updateProduct.bind(this.productsController));

    this.api.delete(
      '/:id',
      this.productsController.deleteProduct.bind(this.productsController));
  }
}
