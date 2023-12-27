import express, { Router } from 'express'
import { OrdersController } from '../controllers/orders.controller'

export class OrdersRoute {
  private api: Router = express.Router();
  private readonly ordersController: OrdersController;

  constructor() {
    this.ordersController = new OrdersController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    /**
     * @swagger
     * /orders/:
     *   get:
     *     summary: Get all orders
     *     tags: ["Orders"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success - array of orders
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      "/",
      this.ordersController.getAllOrders.bind(this.ordersController)
    );

    /**
     * @swagger
     * /orders/{id}:
     *   get:
     *     summary: Get an order by id
     *     tags: ["Orders"]
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
     *        description: order id
     *     responses:
     *       200:
     *         description: Success - an order
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      '/:id',
      this.ordersController.getOrderById.bind(this.ordersController));


    /**
     * @swagger
     * /orders/:
     *   post:
     *     tags: ["Orders"]
     *     summary: Create a new order
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *     - in: body
     *      name: order
     *     description: The order to create
     *     schema:
     *      type: object
     *      properties:
     *       desc:
     *        type: string
     *        example: This order contain a ramen
     *     responses:
     *       200:
     *         description: Success - new order created
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.post(
      '/',
      this.ordersController.createOrder.bind(this.ordersController));

        /**
     * @swagger
     * /orders/{id}:
     *   put:
     *     summary: Update an order by id
     *     tags: ["Orders"]
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
     *        description: order id
     *     responses:
     *       200:
     *         description: Success - order updated
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.put(
      '/:id',
      this.ordersController.updateOrder.bind(this.ordersController));

        /**
     * @swagger
     * /orders/{id}:
     *   delete:
     *     summary: Delete an order by id
     *     tags: ["Orders"]
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
     *        description: order id
     *     responses:
     *       200:
     *         description: Success - order deleted
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.delete(
      '/:id',
      this.ordersController.deleteOrder.bind(this.ordersController));
  }
}
