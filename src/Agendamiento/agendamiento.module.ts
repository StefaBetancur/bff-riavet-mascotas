import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgendamientoController } from './agendamiento.controller';
import { AgendamientoService } from './agendamiento.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AgendamientoController],
  providers: [AgendamientoService],
  exports: [AgendamientoService],
})
export class AgendamientoModule {}