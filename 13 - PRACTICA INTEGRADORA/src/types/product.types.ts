import { Document } from "mongoose";

export interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
};

export type ProductType = {
    name: string;
    description: string;
    price: number;
    stock: number;
}

interface Product2 extends Product {
    color: string;
}

type ProductType2 = ProductType & {
    color: string;
}

type Product3 = Pick<Product, 'name' | 'description'>

/*
type Product3 = {
    name: string;
    description: string;
}
*/

type Product4 = Omit<Product, 'description'>

/*
type Product4 = {
    name: string;
    price: number;
    stock: number;
}
*/

export type ProductDB = ProductType & Document