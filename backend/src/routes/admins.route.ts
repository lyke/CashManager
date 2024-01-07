import express, { Router } from 'express'
import { AdminsController } from '../controllers/admins.controller'

export class AdminsRoute {
  private api: Router = express.Router();
  private readonly adminsController: AdminsController;

  constructor() {
    this.adminsController = new AdminsController();
    this.routes();
  }

  public getRouter(): Router {
    return this.api;
  }

  private routes(): void {
    /**
     * @swagger
     * /admins/:
     *   get:
     *     summary: Get all admins
     *     tags: ["Admins"]
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Success - array of admins
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      '/',
      this.adminsController.getAllAdmins.bind(this.adminsController)
    );

    /**
     * @swagger
     * /admins/{id}:
     *   get:
     *     summary: Get an admin by id
     *     tags: ["Admins"]
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
     *        description: Admin id
     *     responses:
     *       200:
     *         description: Success - an admin
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.get(
      '/:id',
      this.adminsController.getAdminById.bind(this.adminsController));

    /**
     * @swagger
     * /admins/:
     *   post:
     *     tags: ["Admins"]
     *     summary: Create a new admin
     *     security:
     *      - bearerAuth: []
     *     produces:
     *      - application/json
     *     parameters:
     *     - in: body
     *      name: admin
     *     description: The admin to create
     *     schema:
     *      type: object
     *      properties:
     *       username:
     *        type: string
     *        example: Lila
     *       password:
     *        type: string
     *     responses:
     *       200:
     *         description: Success - new admin created
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.post(
      '/',
      this.adminsController.createAdmin.bind(this.adminsController));

    /**
     * @swagger
     * /admins/{id}:
     *   put:
     *     summary: Update an admin by id
     *     tags: ["Admins"]
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
     *        description: Admin id
     *     responses:
     *       200:
     *         description: Success - admin updated
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.put(
      '/:id',
      this.adminsController.updateAdmin.bind(this.adminsController));

    /**
     * @swagger
     * /admins/{id}:
     *   delete:
     *     summary: Delete an admin by id
     *     tags: ["Admins"]
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
     *        description: Admin id
     *     responses:
     *       200:
     *         description: Success - admin deleted
     *       400:
     *         description: Malformed request syntax
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error during query execution
     */
    this.api.delete(
      '/:id',
      this.adminsController.deleteAdmin.bind(this.adminsController));
  }
}
