import { NextFunction, Request, Response } from "express";
import ProductServices, { productServices } from "../services/product.service";

class ProductController {
  private service: ProductServices;

  constructor(service: ProductServices) {
    this.service = service;
  }

  getAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  getById = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.service.getById(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  create = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.create(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.service.update(id, req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController(productServices);