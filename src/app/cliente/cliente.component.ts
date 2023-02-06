import { Router } from '@angular/router';
import { ClientePersonaService } from './../services/cliente-persona.service';
import { ClientePersona } from './../model/ClientePersona';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { AgregarItemPedidoService } from '../services/agregar-item-pedido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  public listaPersonasClientes: ClientePersona[] = [];
  @Input() dniPersona: number = 0;
  personaAsociadaEmpresa: any;
  subscription?: Subscription;
  personaSeleccionada: ClientePersona = <ClientePersona>{};

  constructor(
    private clientePersonaService: ClientePersonaService,
    private dialog: MatDialog,
    public router: Router,
    private gestionarPedido: AgregarItemPedidoService
  ) {}

  ngOnInit(): void {
    this.getListaPersonasClientes();

    //this.personaSeleccionada(this.dniPersona)
    this.subscription = this.gestionarPedido.cliente.subscribe((cliente) => {
      this.personaSeleccionada = cliente;
    })

  }

  getListaPersonasClientes() {
    this.clientePersonaService.obtenerListaClientes().subscribe({
      next: (lista) => {
        this.listaPersonasClientes = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  agregar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = ClientePersona.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Nuevo Cliente',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((cliente) => {
        if (cliente) {
          this.clientePersonaService.agregarCliente(cliente).subscribe({
            next: () => {
              this.getListaPersonasClientes();
            },
            error: (error: HttpErrorResponse) => console.log(error.message),
          });
        }
      });
  }

  eliminar(dniCliente: number) {

    this.clientePersonaService.eliminarCliente(dniCliente).subscribe({
      next: () => {
        this.getListaPersonasClientes();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  editar(item: any) {
    this.clientePersonaService
      .editarCliente(item.dniCliente, item.clienteEditado)
      .subscribe({
        next: () => {
          this.getListaPersonasClientes();
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

  filtrarCliente(dniCliente: number) {
    const dni = dniCliente;
  }

  /*personaSeleccionada(dniPersona: number) {
    if (dniPersona) {

      if (this.listaPersonasClientes.some((p) => p.dniOCuit === dniPersona)) {
        this.personaAsociadaEmpresa = this.listaPersonasClientes.find(
          (p) => p.dniOCuit === dniPersona
        );
      }
    }
  }*/

  onPedido(){
    this.router.navigate(['/realizarPedido']);
  }
}
