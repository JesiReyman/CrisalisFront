import { async, waitForAsync } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { take, BehaviorSubject, Subscription, Subject, lastValueFrom, Observable } from 'rxjs';
import { ClientePersonaService } from './../services/cliente-persona.service';
import { ClientePersona } from './../model/ClientePersona';
import { EmpresaClienteService } from './../services/empresa-cliente.service';
import { EmpresaCliente } from './../model/EmpresaCliente';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verificacion-empresa',
  templateUrl: './verificacion-empresa.component.html',
  styleUrls: ['./verificacion-empresa.component.css'],
})
export class VerificacionEmpresaComponent implements OnInit {
  dniPersona: number = 0;
  empresa: EmpresaCliente = <EmpresaCliente>{};

  constructor(
    private empresaClienteService: EmpresaClienteService,
    private personaCLienteService: ClientePersonaService
  ) {}



  ngOnInit(): void {
    this.obtenerEmpresa()

  }

  obtenerEmpresa(){
    this.empresa = this.empresaClienteService.obtenerEmpresa()
      console.log("en obtener empresa tengo: " + JSON.stringify(this.empresa))
      if(this.empresa.dniPersona){
        this.dniPersona = this.empresa.dniPersona;
      }
    }

}



