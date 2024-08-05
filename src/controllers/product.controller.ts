import { Request, Response } from 'express';
import Product from '../models/product.model.js';

// Obține toate produsele
export const getProducts = async ( req: Request, res: Response) => {
    try {
        const products = await Product.getProducts();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Obține un produs după ID
export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Crează un produs
export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body; // Obține datele produsului din corpul cererii
        const product = await Product.createProduct(productData);
        res.status(201).json(product); // Cod de stare 201 pentru creație
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizează un produs
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.updateProduct(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.getProductById(id);
        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Șterge un produs
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.deleteProduct(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
