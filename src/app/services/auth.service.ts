import { Usuario } from './../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Jwt } from '../model/jwt';
import { NuevoUsuario } from '../model/nuevoUsuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  public login(usuario: Usuario):Observable<Jwt>{
    return this.http.post<Jwt>(this.authURL + '/login', usuario)
  }

  public nuevoUsuario(nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.http.post<any>(this.authURL + '/nuevo', nuevoUsuario)
  }
}
