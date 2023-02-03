import { Adicional } from '../model/Adicional';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private adicionalURL = environment.apiUrl + '/adicional';

  constructor(private http: HttpClient) { }

  public crearAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(this.adicionalURL + '/nuevo', adicional);
  }

  public obtenerListaAdicionales(): Observable<Adicional[]>{
    return this.http.get<Adicional[]>(this.adicionalURL + '/lista');
  }

  public editarAdicional(nombreAdicional: string, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(this.adicionalURL + `/editar/${nombreAdicional}`, adicional);
  }

  public eliminarAdicional(nombreAdicional: string): Observable<void> {
    return this.http.delete<void>(this.adicionalURL + `/eliminar/${nombreAdicional}`);
  }
}
