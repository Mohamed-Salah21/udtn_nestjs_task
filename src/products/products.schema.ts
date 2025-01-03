import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type productDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    min: [1, 'Price must be greater than 0'],
  })
  price: number;

  @Prop({
    required: true,
    min: [1, 'Stock must be greater than 0'],
  })
  stock: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
