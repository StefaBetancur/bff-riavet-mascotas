import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';

@Injectable()
export class IdentidadService {
  private readonly logger = new Logger(IdentidadService.name);
  private readonly apiBaseUrlMascotas: string;
  private readonly apiBaseUrlAgendamiento: string;
  private readonly apiBaseUrlIdentidad: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiBaseUrlMascotas = this.configService.get<string>('API_BASE_URL_MASCOTAS') || 'http://localhost:5169/api';
    this.apiBaseUrlAgendamiento = this.configService.get<string>('API_BASE_URL_AGENDAMIENTO') || 'http://localhost:5167/api' || 'http://localhost:7000/api';
    this.apiBaseUrlIdentidad = this.configService.get<string>('API_BASE_URL_IDENTIDAD') || 'http://localhost:5168/api' || 'http://localhost:7004/api';
    this.logger.log(`Conectando a API en: ${this.apiBaseUrlMascotas}`);
    this.logger.log(`Conectando a API en: ${this.apiBaseUrlAgendamiento}`);
    this.logger.log(`Conectando a API en: ${this.apiBaseUrlIdentidad}`);
  }

  private getApiUrlMascota(endpoint: string): string {
    return `${this.apiBaseUrlMascotas}${endpoint}`;
  }

  private getApiUrlAgendamiento(endpoint: string): string {
    return `${this.apiBaseUrlAgendamiento}${endpoint}`;
  }

    private getApiUrlIdentidad(endpoint: string): string {
    return `${this.apiBaseUrlIdentidad}${endpoint}`;
  }

  // Obtener todas las usuarios
  async findAll(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.getApiUrlIdentidad('/usuarios/buscar')).pipe(
          catchError((error) => {
            this.logger.error(`Error al obtener usuarios: ${error.message}`);
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

  // Obtener una usuarios por ID
  async findOne(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.getApiUrlIdentidad(`/usuarios/${id}`)).pipe(
          catchError((error) => {
            this.logger.error(`Error al obtener usuarios ${id}: ${error.message}`);
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