import { FormGroup, FormControl } from '@angular/forms';
import { EstadoPedido } from './../../model/EstadoPedido.enum';
import { Pedido } from './../../model/Pedido';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'tr[app-pedido-particular]',
  templateUrl: './pedido-particular.component.html',
  styleUrls: ['./pedido-particular.component.css']
})
export class PedidoParticularComponent implements OnInit {
  @Input() pedidoParticular: Pedido = <Pedido>{};
  @Output() estadoEditado = new EventEmitter<{idPedido: number, pedidoEditado: Pedido}>();
  estados = [EstadoPedido.CANCELADO, EstadoPedido.PENDIENTE, EstadoPedido.CONFIRMADO];
  campoEstado: FormGroup = {} as FormGroup;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.campoEstado = new FormGroup({
      estado: new FormControl(this.pedidoParticular.estado)
    });
  }

  cambioEstado(pedido:Pedido){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Pedido.getCamposFormulario(pedido);

    dialogConfig.data = {
      titulo: 'Estado del pedido',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(estadoEditado => {
      if(estadoEditado){
        this.estadoEditado.emit({idPedido: pedido.id, pedidoEditado: estadoEditado});
      }
    });
  }

}
