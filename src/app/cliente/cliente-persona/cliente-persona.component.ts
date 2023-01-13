import { ClientePersona } from './../../model/ClientePersona';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'tr[app-cliente-persona]',
  templateUrl: './cliente-persona.component.html',
  styleUrls: ['./cliente-persona.component.css']
})
export class ClientePersonaComponent implements OnInit {
  @Input() personaCliente: ClientePersona = <ClientePersona>{};
  @Output() aceptoBorrar = new EventEmitter<number>();
  @Output() clienteEditado = new EventEmitter<{dniCliente: number, clienteEditado: ClientePersona}>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(persona: ClientePersona){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = ClientePersona.getCamposFormulario(persona);

    dialogConfig.data = {
      titulo: 'Editar cliente',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(clienteEditado => {
      if(clienteEditado){
        this.clienteEditado.emit({dniCliente: persona.dni, clienteEditado: clienteEditado});
      }
    });
  }

  onDelete(cliente: ClientePersona){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'cliente',
      nombre: cliente.nombre + ' ' + cliente.apellido,
    };
    this.dialog
      .open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.aceptoBorrar.emit(cliente.dni);
        }
      });
  }

}
