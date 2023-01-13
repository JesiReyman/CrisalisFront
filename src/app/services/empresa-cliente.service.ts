import { EmpresaCliente } from './../model/EmpresaCliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaClienteService {
  private empresaURL = environment.apiUrl + '/empresa';
  constructor(private http: HttpClient) { }

  public obtenerListaEmpresas(): Observable<EmpresaCliente[]> {
    return this.http.get<EmpresaCliente[]>(this.empresaURL + '/lista');
  }

  public eliminarEmpresa(cuitEmpresa: number): Observable<void>{
    return this.http.delete<void>(this.empresaURL +  `/eliminar/${cuitEmpresa}`);
  }

  public agregarEmpresa(empresa: EmpresaCliente): Observable<EmpresaCliente> {
    return this.http.post<EmpresaCliente>(this.empresaURL + '/nueva', empresa);
  }

  public editarEmpresa(cuitEmpresa: number, empresa: EmpresaCliente): Observable<EmpresaCliente>{
    return this.http.put<EmpresaCliente>(this.empresaURL + `/editar/${cuitEmpresa}`, empresa)
  }
}
