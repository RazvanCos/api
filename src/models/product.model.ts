import mongoose, { Schema, Document, Model } from 'mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';

// Definirea tipului pentru ProductDocument care combină schema cu Documentul Mongoose
interface IProduct extends Document {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

// Definirea Schema-ului Mongoose
const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }
}, { timestamps: true });

// Definirea modelului Mongoose
const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default class Product {
  @IsString()
  name!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;

  @IsString()
  @IsOptional()
  image?: string;

  public static async createProduct(productData: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>) {
    // Încrementează doar datele necesare pentru crearea unui produs
    return ProductModel.create(productData);
  }

  static async getProducts(): Promise<IProduct[]> {
    return await ProductModel.find({});
  }

  static async getProductById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  }

  static async updateProduct(id: string, productData: Partial<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  static async deleteProduct(id: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(id);
  }
}
