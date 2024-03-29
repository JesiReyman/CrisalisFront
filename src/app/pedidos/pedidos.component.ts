import { EmpresaCliente } from './../model/EmpresaCliente';
import { ClientePersona } from './../model/ClientePersona';
import { EmpresaClienteService } from './../services/empresa-cliente.service';
import { ClientePersonaService } from './../services/cliente-persona.service';
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
import { Cliente } from '../model/Cliente';
import { PageEvent } from '@angular/material/paginator';

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
  cliente : Cliente = <Cliente> {};
  busqueda: string = '';
  totalPedidos: number = 0;


  nombresColumnas = this.columnas.map((col) => col.nombre);
  propiedadColumnas = this.columnas.map((col) => col.propiedad);

  nombresColumnasItems = this.columnasItems.map((col) => col.nombre);
  propiedadColumnasItems = this.columnasItems.map((col) => col.propiedad);

  expandedElement: Pedido | null = null;
  columnsToDisplayWithExpand = [...this.propiedadColumnas, 'editarEstado', 'editarPedido', 'expand'];
  displayedColumns = [...this.propiedadColumnasItems]

  campoEstado: FormGroup = {} as FormGroup;

  constructor(private pedidoService: PedidoService, private dialog: MatDialog, private itemsPedidosService: ItemPedidoService, private router: Router, private personaclienteService: ClientePersonaService, private empresaClienteService: EmpresaClienteService) {

  }

  ngOnInit(): void {

    this.obtenerListaPedidos({ page: "0", size: "10" });
    this.campoEstado = new FormGroup({
      estado: new FormControl(this.expandedElement?.estado)
    });
  }

  obtenerListaPedidos(request: any) {
    this.pedidoService
      .obtenerListaPedidos(request)
      .subscribe({
        next: (lista) => {
          this.listaPedidos = lista['content'];
          this.totalPedidos = lista['totalElements'];

        }
      });
  }

  nextPage(event: PageEvent) {
    let request : any = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.obtenerListaPedidos(request);
}

  guardarEstado(pedidoId: number, estado: Pedido) {

    this.pedidoService
      .cambiarEstado(pedidoId, estado)
      .subscribe({
        next: () => {
          this.obtenerListaPedidos({ page: "0", size: "10" });
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

  obtenerDetalle(pedido: Pedido) {
    this.obtenerItemsPedidos(pedido.id);
    this.obtenerCliente(pedido.dniOCuitCliente, pedido.tipoCliente)
  }

  obtenerItemsPedidos(idPedido: number){
    this.itemsPedidosService.listaItemsPedidos(idPedido).subscribe({
      next: (lista) => {
        this.itemsPedidos = lista;
        },
      error: (error: HttpErrorResponse) => console.log(error.message)
    })
  }

  obtenerCliente(dniOCuitCliente: number, tipoCliente: string){
    if(tipoCliente == 'persona'){
      this.personaclienteService.obtenerPersonaCliente(dniOCuitCliente).subscribe({
        next: (persona: ClientePersona) => {
          this.cliente = new Cliente( persona.nombre, persona.dniOCuit, persona.apellido)
        }
      })
    } else {
      this.empresaClienteService.encontrarEmpresa(dniOCuitCliente).subscribe({
        next: (empresa: EmpresaCliente) => {
          this.cliente = new Cliente(empresa.razonSocial, empresa.dniOCuit)
        }
      })
    }
  }

  editarPedido(event: MouseEvent, pedido: Pedido) {
    event.stopPropagation()

    this.pedidoService.setPedido(pedido)
    this.router.navigate(['/editarPedido'])
  }

  buscar(dniOCuit: string = ''){

    if (typeof dniOCuit === "string" && dniOCuit.trim().length == 0){

      this.obtenerListaPedidos({ page: "0", size: "10" });
      return
    }
    if (dniOCuit != null) {

      this.pedidoService.pedidosDeCliente(Number(dniOCuit), 0, 10 ).subscribe({
        next: (lista) => {
          this.listaPedidos = lista['content'];
          this.totalPedidos = lista['totalElements'];
        },
      });
    }

  }

  getColor(estadoPedido: string) {
    switch(estadoPedido) {
      case 'PENDIENTE': return '#3f51b5';
      case 'CONFIRMADO': return 'green';
      default: return 'red';
    }
  }


}
