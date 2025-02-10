import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Put = 'PUT',
  Delete = 'DELETE',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  root: string = 'http://localhost:3000/';

  constructor() { }

  async request<T = any>(method: HttpMethod, path: string, data: object, includeBase = true): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem('token');

    const req = await axios.request({
      baseURL: includeBase ? this.root : undefined,
      method,
      data,
      url: path,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    return req;
  }

  get = (path: string, data: object, includeBase = true) => this.request(HttpMethod.Get, path, data, includeBase);
  post = (path: string, data: object, includeBase = true) => this.request(HttpMethod.Post, path, data, includeBase);
  patch = (path: string, data: object, includeBase = true) => this.request(HttpMethod.Patch, path, data, includeBase);
  put = (path: string, data: object, includeBase = true) => this.request(HttpMethod.Put, path, data, includeBase);
  delete = (path: string, data: object, includeBase = true) => this.request(HttpMethod.Delete, path, data, includeBase);
}
