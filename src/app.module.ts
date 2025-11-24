import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MascotasModule } from './mascotas/mascotas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MascotasModule,
  ],
})
export class AppModule {}