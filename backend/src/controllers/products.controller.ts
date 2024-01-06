import { NextFunction, Request, Response } from 'express'

import { ProductsService } from '../services/products.service'

export class ProductsController {
  private productsService: ProductsService;

  constructor() {
    this.productsService = new ProductsService();
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productsService.getAllProducts();

      res.status(200).json(products);
    } catch (error) {
      console.error('ProductsController.getAllProducts - Erreur lors de la récupération des produits : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
      next(error);
    }
  }

  public async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productsService.getProductById(Number(req.params.id));

      res.status(200).json(product);
    }
    catch (error) {
      console.error('ProductsController.getProductById - Erreur lors de la récupération du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
      next(error);
    }
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productsService.createProduct(req.body);

      res.status(200).json(product);
    }
    catch (error) {
      console.error('ProductsController.createProduct - Erreur lors de la création du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la création du produit' });
      next(error);
    }
  }

  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productsService.updateProduct(Number(req.params.id), req.body);

      res.status(200).json(product);
    }
    catch (error) {
      console.error('ProductsController.updateProduct - Erreur lors de la mise à jour du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du produit' });
      next(error);
    }
  }

  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.productsService.deleteProduct(Number(req.params.id));

      res.status(200).json(product);
    }
    catch (error) {
      console.error('ProductsController.deleteProduct - Erreur lors de la suppression du produit : ', error);
      res.status(500).json({ error: 'Erreur lors de la suppression du produit' });
      next(error);
    }
  }
}
