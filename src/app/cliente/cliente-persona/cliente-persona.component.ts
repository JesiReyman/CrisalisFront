import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AgregarItemPedidoService } from './../../services/agregar-item-pedido.service';
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
  @Input() index = 0;
  @Output() aceptoBorrar = new EventEmitter<number>();
  @Output() clienteEditado = new EventEmitter<{dniCliente: number, clienteEditado: ClientePersona}>();
  selectedRow: any;
  @Input() dniPersona: number = 0;


  constructor(private dialog: MatDialog, private gestionarPedido: AgregarItemPedidoService, public router: Router) { }

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
        this.clienteEditado.emit({dniCliente: persona.dniOCuit, clienteEditado: clienteEditado});
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
          this.aceptoBorrar.emit(cliente.dniOCuit);
        }
      });
  }

  /*onPedido(dni: number){
    //this.gestionarPedido.idCliente.next(dni);
    this.gestionarPedido.setDniOCuit(dni);
    this.router.navigate(['/realizarPedido']);
  }*/

  onChange(e: any){

    let cliente = e.value as ClientePersona;
    this.gestionarPedido.setDniOCuit(cliente.dniOCuit);
    this.gestionarPedido.cliente.next(cliente);
  }

}
