import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IdentidadController } from './Identidad.controller';
import { IdentidadService } from './Identidad.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [IdentidadController],
  providers: [IdentidadService],
  exports: [IdentidadService],
})
export class IdentidadModule {}