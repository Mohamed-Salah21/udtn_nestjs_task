import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductValidationDto } from './dto/product.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/utils/Rooles.decorator';
import { UserRoles } from 'src/utils/UserRoles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findingAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findingOne(id);
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  create(@Body() createProductDto: ProductValidationDto) {
    return this.productsService.creation(createProductDto);
  }

  @Put(':id')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductValidationDto,
  ) {
    return this.productsService.updating(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  remove(@Param('id') id: string) {
    return this.productsService.removing(id);
  }
}
