import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IdentidadController } from './Identidad.controller';
import { IdentidadService } from './Identidad.service';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
     // timeout: 5000,
           //maxRedirects: 5,
           httpsAgent: new https.Agent({
             rejectUnauthorized: false,
           }),
    }),
  ],
  controllers: [IdentidadController],
  providers: [IdentidadService],
  exports: [IdentidadService],
})
export class IdentidadModule {}