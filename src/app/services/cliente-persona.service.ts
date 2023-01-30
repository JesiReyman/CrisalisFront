import { ClientePersona } from './../model/ClientePersona';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientePersonaService {
  private clienteURL = environment.apiUrl + '/cliente';
  constructor(private http: HttpClient) { }

  public obtenerListaClientes(): Observable<ClientePersona[]> {
    return this.http.get<ClientePersona[]>(this.clienteURL + '/lista');
  }

  public eliminarCliente(dniCliente: number): Observable<void>{
    return this.http.delete<void>(this.clienteURL +  `/eliminar/${dniCliente}`);
  }

  public agregarCliente(cliente: ClientePersona): Observable<ClientePersona> {
    return this.http.post<ClientePersona>(this.clienteURL + '/nuevo', cliente);
  }

  public editarCliente(dniCliente: number, cliente: ClientePersona): Observable<ClientePersona>{
    return this.http.put<ClientePersona>(this.clienteURL + `/editar/${dniCliente}`, cliente)
  }

  public obtenerPersonaCliente(dniCliente: number): Observable<ClientePersona>{
    return this.http.get<ClientePersona>(this.clienteURL + `/${dniCliente}`);
  }
}
