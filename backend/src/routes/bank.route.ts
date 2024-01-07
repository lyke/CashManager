import express, { Router } from 'express'
import { BankController } from '../controllers/bank.controller'

/**
 * @swagger
 * tags:
 *   name: Bank
 *   description: Bank management
 */
export class BankRoute {
  private api: Router = express.Router();
  private readonly bankController: BankController;

  constructor() {
    this.bankController = new BankController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    /**
     * @swagger
     * /:
     *   post:
     *     summary: Get paid
     *     tags: ["Bank"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *      - in: body
     *        name: client
     *        schema:
     *          type: string
     *        required: true
     *        description: Client email
     *      - in: body
     *        name: bill
     *        schema:
     *          type: number
     *        required: true
     *        description: Bill amount
     *     responses:
     *       200:
     *         description: Payment validated by the bank
     *       400:
     *         description: The request must contain a 'client' field and a 'bill' field
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Nonexistent client
     *       409:
     *         description: Insufficient funds
     *       500:
     *         description: Error during query execution
     */
    this.api.post(
      '/',
      this.bankController.getPaid.bind(this.bankController)
    );
  }
}
