import { Impuesto } from './../model/Impuesto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {
  private impuestoURL = environment.apiUrl + '/impuesto';

  constructor(private http: HttpClient) { }

  public crearImpuesto(impuesto: Impuesto): Observable<Impuesto> {
    return this.http.post<Impuesto>(this.impuestoURL + '/nuevo', impuesto);
  }

  public obtenerListaImpuestos(): Observable<Impuesto[]>{
    return this.http.get<Impuesto[]>(this.impuestoURL + '/lista');
  }

  public editarImpuesto(nombreImpuesto: string, impuesto: Impuesto): Observable<Impuesto> {
    return this.http.put<Impuesto>(this.impuestoURL + `/editar/${nombreImpuesto}`, impuesto);
  }

  public eliminarImpuesto(nombreImpuesto: string): Observable<void> {
    return this.http.delete<void>(this.impuestoURL + `/eliminar/${nombreImpuesto}`);
  }
}
