import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const ProductSchemaPost = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(50).required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});

export const validatePostProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = ProductSchemaPost.validate(req.body, { abortEarly: false });
  error ? res.status(400).send(error) : next();
};
