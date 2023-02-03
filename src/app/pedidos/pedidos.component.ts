import { Router } from '@angular/router';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { EstadoPedido } from './../model/EstadoPedido.enum';
import { Pedido } from './../model/Pedido';
import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';
import { ItemPedidoService } from '../services/ItemPedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PedidosComponent implements OnInit {
  listaPedidos: Pedido[] = [];
  itemsPedidos: ProductoPedido[] = [];
  columnas = Pedido.getColumnasTabla();
  columnasItems = ProductoPedido.getColumnasTabla();
  //columnsToDisplay = ['id', 'fechaCreacion', 'estado', 'precioBase', 'totalImpuestos', 'total', 'adasd'];


  nombresColumnas = this.columnas.map((col) => col.nombre);
  propiedadColumnas = this.columnas.map((col) => col.propiedad);

  nombresColumnasItems = this.columnasItems.map((col) => col.nombre);
  propiedadColumnasItems = this.columnasItems.map((col) => col.propiedad);

  expandedElement: Pedido | null = null;
  columnsToDisplayWithExpand = [...this.propiedadColumnas, 'editarEstado', 'editarPedido', 'expand'];
  displayedColumns = [...this.propiedadColumnasItems]

  campoEstado: FormGroup = {} as FormGroup;

  constructor(private pedidoService: PedidoService, private dialog: MatDialog, private itemsPedidosService: ItemPedidoService, private router: Router) {

  }

  ngOnInit(): void {

    this.obtenerListaPedidos();
    this.campoEstado = new FormGroup({
      estado: new FormControl(this.expandedElement?.estado)
    });
  }

  obtenerListaPedidos() {
    this.pedidoService
      .obtenerListaPedidos()
      .subscribe((data) => (this.listaPedidos = data));
  }

  guardarEstado(pedidoId: number, estado: Pedido) {

    this.pedidoService
      .cambiarEstado(pedidoId, estado)
      .subscribe({
        next: () => {
          this.obtenerListaPedidos();
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

  editarEstado(event: MouseEvent, pedido: Pedido) {
    event.stopPropagation()

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

        this.guardarEstado(pedido.id, estadoEditado);

      }
    });
  }

  obtenerItemsPedidos(idPedido: number){
    this.itemsPedidosService.listaItemsPedidos(idPedido).subscribe({
      next: (lista) => {
        this.itemsPedidos = lista;
        },
      error: (error: HttpErrorResponse) => console.log(error.message)
    })
  }

  editarPedido(event: MouseEvent, pedido: Pedido) {
    event.stopPropagation()

    this.pedidoService.setPedido(pedido)
    this.router.navigate(['/editarPedido'])


  }
}
