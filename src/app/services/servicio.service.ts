import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../model/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicioURL = environment.apiUrl + '/servicio';

  constructor(private http: HttpClient) { }

  public obtenerListaServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.servicioURL + '/lista');
  }

  public eliminarServicio(nombreServicio: string): Observable<void>{
    return this.http.delete<void>(this.servicioURL +  `/eliminar/${nombreServicio}`);
  }

  public agregarServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.servicioURL + '/nuevo', servicio);
  }

  public editarServicio(nombreServicio: string, servicio: Servicio): Observable<Servicio>{
    return this.http.put<Servicio>(this.servicioURL + `/editar/${nombreServicio}`, servicio)
  }
}
