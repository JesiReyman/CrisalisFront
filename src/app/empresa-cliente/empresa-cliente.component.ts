import { EmpresaClienteService } from './../services/empresa-cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaCliente } from '../model/EmpresaCliente';
import { HttpErrorResponse } from '@angular/common/http';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';
import { Subscription } from 'rxjs';
import { AgregarItemPedidoService } from '../services/agregar-item-pedido.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientePersona } from '../model/ClientePersona';

@Component({
  selector: 'app-empresa-cliente',
  templateUrl: './empresa-cliente.component.html',
  styleUrls: ['./empresa-cliente.component.css']
})
export class EmpresaClienteComponent implements OnInit {
  listaEmpresas: EmpresaCliente[] = [];
  subscription?: Subscription;
  empresaSeleccionada: EmpresaCliente = <EmpresaCliente>{};

  constructor(private empresaClienteService: EmpresaClienteService, private dialog: MatDialog, private gestionarPedido: AgregarItemPedidoService, public router: Router,) { }

  ngOnInit(): void {
    this.getListaEmpresas();

    this.subscription = this.gestionarPedido.empresaCliente.subscribe((cliente) => {
      this.empresaSeleccionada = cliente;
    })
  }

  getListaEmpresas() {
    this.empresaClienteService.obtenerListaEmpresas().subscribe({
      next: (lista) => {
        this.listaEmpresas = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  agregar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = EmpresaCliente.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Nueva Empresa Cliente',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((empresa) => {
        if (empresa) {
          this.empresaClienteService.agregarEmpresa(empresa)
          .subscribe({
            next: () => {
              this.getListaEmpresas();
            },
            error: (error: HttpErrorResponse) => console.log(error.message),
          });
        }
      });
  }

  eliminar(cuit: number){

    this.empresaClienteService.eliminarEmpresa(cuit).subscribe({
      next: () => {
        this.getListaEmpresas();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  editar(item: any){
    this.empresaClienteService
      .editarEmpresa(item.cuitEmpresa, item.empresaEditada)
      .subscribe({
        next: () => {
          this.getListaEmpresas();
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

  onPedido(){
    if (!this.empresaSeleccionada.dniPersona) {
      Swal.fire({
        icon: 'warning',
        title: 'Esta empresa no tiene ninguna persona registrada, por favor registre una.',

      }).then(() => {
        this.registrarPersona(this.empresaSeleccionada.dniOCuit);
      });


    } else {
      this.gestionarPedido.setDniOCuit(this.empresaSeleccionada.dniOCuit);
      this.router.navigate(['/realizarPedido']);
    }

  }

  registrarPersona(cuit: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = ClientePersona.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Persona Responsable',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((clientePersona) => {
        if (clientePersona) {
          this.empresaClienteService.asociarPersonaAEmpresa(cuit, clientePersona).subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso!',

              }).then(() => {
                this.gestionarPedido.setDniOCuit(cuit);
                this.router.navigate(['/realizarPedido']);
              })


            },
            error: (error: HttpErrorResponse) => {
              console.log(error.message)
              Swal.fire({
                icon: 'error',
                title: 'Ocurrió un error',

              })
            },
          });
        }
      });
  }


}
