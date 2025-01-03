import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductValidationDto } from './dto/product.dto';
import { Product } from './products.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { API_Response } from 'src/utils/Api_Reponse';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async creation(createProductDto: ProductValidationDto) {
    const existed = await this.productModel.findOne({
      name: createProductDto.name,
    });
    if (existed) {
      throw new BadRequestException(
        `this Name ${existed.name} is used before in product`,
      );
    }
    const product = await this.productModel.create(createProductDto);
    return new API_Response<Product>(
      'Product has been created successfully',
      product,
    );
  }

  async findingAll() {
    const products = await this.productModel.find().exec();
    if (!products.length) {
      throw new NotFoundException('There are no products yet');
    }
    return new API_Response<Product[]>(
      `This action returns all products`,
      products,
    );
  }

  async findingOne(id: string) {
    if (id.length != 24) {
      throw new BadRequestException(`product id must be 24 characters`);
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`There is no product with id: ${id}`);
    }
    return new API_Response<Product>(
      `This action returns a #${id} product`,
      product,
    );
  }
  async updating(id: string, updateProductDto: ProductValidationDto) {
    if (id.length != 24) {
      return new BadRequestException(`product id must be 24 characters`);
    }
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { ...updateProductDto },
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      throw new NotFoundException(`There is not product by this id: ${id}`);
    }
    return new API_Response<Product | unknown>(
      'yoy updated product details successfully',
      updatedProduct,
    );
  }

  async removing(id: string) {
    if (id.length != 24) {
      throw new BadRequestException(`product id must be 24 characters`);
    }
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(
        `There is no product with id: ${id} or maybe removed before`,
      );
    }

    return new API_Response('Product has been removed successfully');
  }
}
