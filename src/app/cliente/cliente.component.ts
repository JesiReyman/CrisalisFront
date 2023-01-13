import { ClientePersonaService } from './../services/cliente-persona.service';
import { ClientePersona } from './../model/ClientePersona';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public listaPersonasClientes: ClientePersona[] = [];
  dniCliente: number = 0;
  constructor(private clientePersonaService: ClientePersonaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListaPersonasClientes();
  }

  getListaPersonasClientes() {
    this.clientePersonaService.obtenerListaClientes().subscribe({
      next: (lista) => {
        this.listaPersonasClientes = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  agregar(){
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
          this.clientePersonaService.agregarCliente(cliente)
          .subscribe({
            next: () => {
              this.getListaPersonasClientes();
            },
            error: (error: HttpErrorResponse) => console.log(error),
          });
        }
      });
  }

  eliminar(dniCliente: number){
    console.log(dniCliente);
    this.clientePersonaService.eliminarCliente(dniCliente).subscribe({
      next: () => {
        this.getListaPersonasClientes();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  editar(item: any) {
    this.clientePersonaService
      .editarCliente(item.dniCliente, item.clienteEditado)
      .subscribe({
        next: () => {
          this.getListaPersonasClientes();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }

  filtrarCliente(dniCliente: number){
    const dni = dniCliente;
  }
}
