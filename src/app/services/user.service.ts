import { Injectable } from '@angular/core';
import baseURL from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  public registrarUsuario(user:any){
    return this.httpClient.post(`${baseURL}/usuarios/`,user)

  }
}
