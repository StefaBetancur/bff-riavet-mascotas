import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Get()
  async findAll() {
    return await this.mascotasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mascotasService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() mascotaData: any) {
    return await this.mascotasService.create(mascotaData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() mascotaData: any) {
    return await this.mascotasService.update(id, mascotaData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.mascotasService.remove(id);
  }

  @Get('health/check')
  async getHello() {
    return await this.mascotasService.getHello();
  }
}