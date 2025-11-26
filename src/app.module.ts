import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MascotasModule } from './mascotas/mascotas.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { IdentidadModule } from './Identidad/identidad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MascotasModule,
    AgendamientoModule,
    IdentidadModule,
  ],
})
export class AppModule {}