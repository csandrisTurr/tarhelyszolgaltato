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

  get = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Get, path, data, includeBase);
  post = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Post, path, data, includeBase);
  patch = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Patch, path, data, includeBase);
  put = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Put, path, data, includeBase);
  delete = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Delete, path, data, includeBase);
}
