import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import * as https from 'https';

@Injectable()
export class IdentidadService {
  private readonly logger = new Logger(IdentidadService.name);
  private readonly apiBaseUrlIdentidad: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {

    this.apiBaseUrlIdentidad = this.configService.get<string>('API_BASE_URL_IDENTIDAD') || 'http://localhost:5168/api' || 'http://localhost:7004/api';

    this.logger.log(`Conectando a API en: ${this.apiBaseUrlIdentidad}`);
  }

    private readonly httpsAgent = new https.Agent({
      rejectUnauthorized: false, // Acepta certificados autofirmados SOLO en desarrollo
    });

    private getApiUrlIdentidad(endpoint: string): string {
    return `${this.apiBaseUrlIdentidad}${endpoint}`;
  }

  // Obtener todas las usuarios
 async findAll(): Promise<any> {
  try {
    const response = await this.httpService.axiosRef.get(
      this.getApiUrlIdentidad('/usuarios'),
      { httpsAgent: this.httpsAgent }
    );

    return response.data;

  } catch (error) {
    this.logger.error(`Error al obtener usuarios: ${error.message}`);
    throw new HttpException(
      error.response?.data || 'Error del servidor',
      error.response?.status || 500,
    );
  }
}

  // Obtener una usuarios por ID
  async findOne(id: string): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.get(
      this.getApiUrlIdentidad(`/usuarios/${id}`),
      { httpsAgent: this.httpsAgent }
    );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en findOne: ${error.message}`);
      throw error;
    }
  }

  // Crear una nueva usuarios
  async create(usuarioData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.getApiUrlIdentidad('/usuarios'), usuarioData).pipe(
          catchError((error) => {
            this.logger.error(`Error al crear usuarios: ${error.message}`);
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

  // Actualizar una usuarios
  async update(id: string, usuarioData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.put(this.getApiUrlIdentidad(`/usuarios/${id}`), usuarioData).pipe(
          catchError((error) => {
            this.logger.error(`Error al actualizar usuarios ${id}: ${error.message}`);
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

  // Eliminar una usuarios
  async remove(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(this.getApiUrlIdentidad(`/usuarios/${id}`)).pipe(
          catchError((error) => {
            this.logger.error(`Error al eliminar usuarios ${id}: ${error.message}`);
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
    return 'BFF para RiavetIdentidadMS está funcionando correctamente!';
  }
}