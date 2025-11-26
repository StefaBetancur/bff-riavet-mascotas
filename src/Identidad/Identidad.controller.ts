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
import { IdentidadService } from './Identidad.service';

@Controller('usuarios')
export class IdentidadController {
  constructor(private readonly identidadService: IdentidadService) {}

  @Get()
  async findAll() {
    return await this.identidadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.identidadService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuarioData: any) {
    return await this.identidadService.create(usuarioData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() usuarioData: any) {
    return await this.identidadService.update(id, usuarioData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.identidadService.remove(id);
  }

  @Get('health/check')
  async getHello() {
    return await this.identidadService.getHello();
  }
}