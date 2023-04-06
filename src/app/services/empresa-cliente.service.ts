import { ClientePersona } from 'src/app/model/ClientePersona';
import { EmpresaCliente } from './../model/EmpresaCliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaClienteService {
  private empresaURL = environment.apiUrl + '/empresa';
  empresa: Subject<EmpresaCliente> = new Subject<EmpresaCliente>();
  empresa$ = this.empresa.asObservable();
  empresaSeleccionada: EmpresaCliente = <EmpresaCliente>{};

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
    return this.http.put<EmpresaCliente>(this.empresaURL + `/editar/${cuitEmpresa}`, empresa);
  }

  public encontrarEmpresa(cuitEmpresa: number): Observable<EmpresaCliente>{
    return this.http.get<EmpresaCliente>(this.empresaURL + `/${cuitEmpresa}`);
  }

  public asociarPersonaAEmpresa(cuitEmpresa: number, persona: ClientePersona): Observable<EmpresaCliente> {
    return this.http.put<EmpresaCliente>(this.empresaURL + `/${cuitEmpresa}/asociar`, persona);
  }

  public setEmpresa(empresa: EmpresaCliente){
    this.empresaSeleccionada = empresa;
  }

  public obtenerEmpresa()  {
    return this.empresaSeleccionada;
  }
}
