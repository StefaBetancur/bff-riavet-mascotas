import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import * as https from 'https';

@Injectable()
export class MascotasService {
  private readonly logger = new Logger(MascotasService.name);
  private readonly apiBaseUrlMascotas: string;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiBaseUrlMascotas = this.configService.get<string>('API_BASE_URL_MASCOTAS') || 'http://localhost:5169/api';
    this.logger.log(`Conectando a API en: ${this.apiBaseUrlMascotas}`);
  }

  private readonly httpsAgent = new https.Agent({
    rejectUnauthorized: false, // Acepta certificados autofirmados SOLO en desarrollo
  });
  private getApiUrlMascota(endpoint: string): string {
    return `${this.apiBaseUrlMascotas}${endpoint}`;
  }

  // Obtener todas las mascotas
  async findAll(): Promise<any> {
  try {
    const response = await this.httpService.axiosRef.get(
      this.getApiUrlMascota('/mascotas'),
      { httpsAgent: this.httpsAgent }
    );

    return response.data;

  } catch (error) {
    this.logger.error(`Error al obtener mascotas: ${error.message}`);
    throw new HttpException(
      error.response?.data || 'Error del servidor',
      error.response?.status || 500,
    );
  }
}

  // Obtener una mascota por ID
  async findOne(id: string): Promise<any> {
    try {
       const response = await this.httpService.axiosRef.get(
      this.getApiUrlMascota(`/mascotas/${id}`),
      { httpsAgent: this.httpsAgent }
    );
      
      return response.data;
    } catch (error) {
      this.logger.error(`Error en findOne: ${error.message}`);
      throw error;
    }
  }

  // Crear una nueva mascota
  async create(mascotaData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.getApiUrlMascota('/mascotas'), mascotaData).pipe(
          catchError((error) => {
            this.logger.error(`Error al crear mascota: ${error.message}`);
            throw new HttpException(
              error.response?.data || 'Error del servidor',
              error.response?.status || 500,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en create: ${error.message}`);
      throw error;
    }
  }

  // Actualizar una mascota
  async update(id: string, mascotaData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.put(this.getApiUrlMascota(`/mascotas/${id}`), mascotaData).pipe(
          catchError((error) => {
            this.logger.error(`Error al actualizar mascota ${id}: ${error.message}`);
            throw new HttpException(
              error.response?.data || 'Error del servidor',
              error.response?.status || 500,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en update: ${error.message}`);
      throw error;
    }
  }

  // Eliminar una mascota
  async remove(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(this.getApiUrlMascota(`/mascotas/${id}`)).pipe(
          catchError((error) => {
            this.logger.error(`Error al eliminar mascota ${id}: ${error.message}`);
            throw new HttpException(
              error.response?.data || 'Error del servidor',
              error.response?.status || 500,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en remove: ${error.message}`);
      throw error;
    }
  }

  // Método para saludar (prueba)
  async getHello(): Promise<string> {
    return 'BFF para RiavetMascotasMs está funcionando correctamente!';
  }
}