import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import * as https from 'https';

@Injectable()
export class AgendamientoService {
  private readonly logger = new Logger(AgendamientoService.name);
  private readonly apiBaseUrlAgendamiento: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiBaseUrlAgendamiento = this.configService.get<string>('API_BASE_URL_AGENDAMIENTO') || 'http://localhost:5167/api' || 'http://localhost:7000/api';
    this.logger.log(`Conectando a API en: ${this.apiBaseUrlAgendamiento}`);

  }

   private readonly httpsAgent = new https.Agent({
        rejectUnauthorized: false, // Acepta certificados autofirmados SOLO en desarrollo
      });
  

  
  private getApiUrlAgendamiento(endpoint: string): string {
    return `${this.apiBaseUrlAgendamiento}${endpoint}`;
  }


  // Obtener todas las citas
  async findAll(): Promise<any> {
  try {
    const response = await this.httpService.axiosRef.get(
      this.getApiUrlAgendamiento('/citas'),
      { httpsAgent: this.httpsAgent }
    );

    return response.data;

  } catch (error) {
    this.logger.error(`Error al obtener citas: ${error.message}`);
    throw new HttpException(
      error.response?.data || 'Error del servidor',
      error.response?.status || 500,
    );
  }
}


  // Obtener una citas por ID
  async findOne(id: string): Promise<any> {
    try {
      const response = await this.httpService.axiosRef.get(
      this.getApiUrlAgendamiento(`/citas/${id}`),
      { httpsAgent: this.httpsAgent }
    );
      return response.data;
    } catch (error) {
      this.logger.error(`Error en findOne: ${error.message}`);
      throw error;
    }
  }

  // Crear una nueva citas
  async create(citaData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.getApiUrlAgendamiento('/citas'), citaData).pipe(
          catchError((error) => {
            this.logger.error(`Error al crear citas: ${error.message}`);
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

  // Actualizar una citas
  async update(id: string, citaData: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.put(this.getApiUrlAgendamiento(`/citas/${id}`), citaData).pipe(
          catchError((error) => {
            this.logger.error(`Error al actualizar citas ${id}: ${error.message}`);
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

  // Eliminar una citas
  async remove(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(this.getApiUrlAgendamiento(`/citas/${id}`)).pipe(
          catchError((error) => {
            this.logger.error(`Error al eliminar citas ${id}: ${error.message}`);
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
    return 'BFF para RiavetAgendamientoMs está funcionando correctamente!';
  }
}