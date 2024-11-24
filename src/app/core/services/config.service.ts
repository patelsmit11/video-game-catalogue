import { Injectable } from '@angular/core';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root',
})

export class ConfigService {
  constructor() {}

  getApiUrl(): string {
    return AppConfig.apiUrl;
  }
}
