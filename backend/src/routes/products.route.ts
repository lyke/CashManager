import express, { Router } from 'express'
import { ProductsController } from '../controllers/products.controller'

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
    /**
     * @swagger
     * /products/:
     *   get:
     *     summary: Get all products
     *     tags: ["Products"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success - array of products
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      "/",
      this.productsController.getAllProducts.bind(this.productsController)
    );

    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Get an product by id
     *     tags: ["Products"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: product id
     *     responses:
     *       200:
     *         description: Success - an product
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      '/:id',
      this.productsController.getProductById.bind(this.productsController));

    /**
     * @swagger
     * /products/:
     *   post:
     *     tags: ["Products"]
     *     summary: Create a new product
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *     - in: body
     *      name: product
     *     description: The product to create
     *     schema:
     *      type: object
     *      properties:
     *       name:
     *        type: string
     *        example: Lila
     *       price:
     *        type: decimal
     *        example: 10.99
     *       category:
     *        type: string
     *        example: Food
     *       description:
     *        type: Text
     *        example: This product is a chilli sin carne. Suitable for vegetarians and vegans.
     *     responses:
     *       200:
     *         description: Success - new product created
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.post(
      '/',
      this.productsController.createProduct.bind(this.productsController));

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Update an product by id
     *     tags: ["Products"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: product id
     *     responses:
     *       200:
     *         description: Success - product updated
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.put(
      '/:id',
      this.productsController.updateProduct.bind(this.productsController));

        /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Delete an product by id
     *     tags: ["Products"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: product id
     *     responses:
     *       200:
     *         description: Success - product deleted
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.delete(
      '/:id',
      this.productsController.deleteProduct.bind(this.productsController));
  }
}
