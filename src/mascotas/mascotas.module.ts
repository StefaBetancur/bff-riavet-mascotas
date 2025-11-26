import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
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
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService],
})
export class MascotasModule {}