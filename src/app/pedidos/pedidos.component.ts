import { EstadoPedido } from './../model/EstadoPedido.enum';
import { Pedido } from './../model/Pedido';
import { PedidoService } from './../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  columnsToDisplay = ['id', 'fechaCreacion', 'estado', 'precioBase', 'totalImpuestos', 'total', 'adasd'];

  columnas: any[] = [
    {
      propiedad: 'id',
      nombre: 'ID'
    },
    {
      propiedad: 'fechaCreacion',
      nombre: 'Fecha de creación'
    },
    {
      propiedad: 'estado',
      nombre: 'Estado'
    },
    {
      propiedad: 'precioBase',
      nombre: 'Subtotal'
    },
    {
      propiedad: 'totalImpuestos',
      nombre: 'Total de impuestos'
    },
    {
      propiedad: 'total',
      nombre: 'Total'
    }
  ]

  nombresColumnas = this.columnas.map((col) => col.nombre);
  propiedadColumnas = this.columnas.map((col) => col.propiedad);

  expandedElement: Pedido | null = null;
  columnsToDisplayWithExpand = [...this.propiedadColumnas, 'editarEstado', 'expand'];

  constructor(private pedidoService: PedidoService) {

  }

  ngOnInit(): void {
    this.obtenerListaPedidos();
  }

  obtenerListaPedidos() {
    this.pedidoService
      .obtenerListaPedidos()
      .subscribe((data) => (this.listaPedidos = data));
  }

  cambiarEstado(item: any) {
    console.log(JSON.stringify(item.estadoEditado) )
    this.pedidoService
      .cambiarEstado(item.idPedido, item.pedidoEditado)
      .subscribe({
        next: () => {
          this.obtenerListaPedidos();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }

  editarEstado(event: MouseEvent, item: any) {
    event.stopPropagation()
    console.log(item)
  }
}
