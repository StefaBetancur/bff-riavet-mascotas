import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class MascotasService {
  private readonly logger = new Logger(MascotasService.name);
  private readonly apiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.get<string>('API_BASE_URL') || 'http://localhost:5169';
    this.logger.log(`Conectando a API en: ${this.apiBaseUrl}`);
  }

  private getApiUrl(endpoint: string): string {
    return `${this.apiBaseUrl}${endpoint}`;
  }

  // Obtener todas las mascotas
  async findAll(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.getApiUrl('/mascotas')).pipe(
          catchError((error) => {
            this.logger.error(`Error al obtener mascotas: ${error.message}`);
            throw new HttpException(
              error.response?.data || 'Error del servidor',
              error.response?.status || 500,
            );
          }),
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en findAll: ${error.message}`);
      throw error;
    }
  }

  // Obtener una mascota por ID
  async findOne(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.getApiUrl(`/mascotas/${id}`)).pipe(
          catchError((error) => {
            this.logger.error(`Error al obtener mascota ${id}: ${error.message}`);
            throw new HttpException(
              error.response?.data || 'Error del servidor',
              error.response?.status || 500,
            );
          }),
        ),
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
        this.httpService.post(this.getApiUrl('/mascotas'), mascotaData).pipe(
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
        this.httpService.put(this.getApiUrl(`/mascotas/${id}`), mascotaData).pipe(
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
        this.httpService.delete(this.getApiUrl(`/mascotas/${id}`)).pipe(
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