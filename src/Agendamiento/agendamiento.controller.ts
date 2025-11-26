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
import { AgendamientoService } from './agendamiento.service';

@Controller('citas')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Get()
  async findAll() {
    return await this.agendamientoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.agendamientoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() citaData: any) {
    return await this.agendamientoService.create(citaData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() citaData: any) {
    return await this.agendamientoService.update(id, citaData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.agendamientoService.remove(id);
  }

  @Get('health/check')
  async getHello() {
    return await this.agendamientoService.getHello();
  }
}