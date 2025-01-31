import { Model } from "mongoose";
import { ProductType } from "../types/product.types";
import { ProductModel } from "../models/product.model";
import { NotFoundError } from "../utils/error.custom";

export default class ProductServices {
  private dao: Model<ProductType>;

  constructor(dao: Model<ProductType>) {
    this.dao = dao;
  }
  async getAll() {
    try {
      const response = await this.dao.find();
      if (!response) throw new NotFoundError("Error get all");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async create(obj: ProductType) {
    try {
      const response = await this.dao.create(obj);
      if (!response) throw new NotFoundError("Error create");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, obj: ProductType) {
    try {
      const response = await this.dao.findByIdAndUpdate(id, obj, { new: true });
      if (!response) throw new NotFoundError("Error update");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string) {
    try {
      const response = await this.dao.findByIdAndDelete(id);
      if (!response) throw new NotFoundError("Error delete");
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getById(id: string) {
    try {
      const response = await this.dao.findById(id);
      if (!response) throw new NotFoundError("Error getById");
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const productServices = new ProductServices(ProductModel);
