import { ItemPedidoService } from './../../services/ItemPedido.service';
import { Pedido } from 'src/app/model/Pedido';
import { PedidoService } from './../../services/pedido.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';
import { Servicio } from 'src/app/model/Servicio';
import { FormControl, FormGroup } from '@angular/forms';
import { AgregarItemPedidoService } from 'src/app/services/agregar-item-pedido.service';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tr[app-servicio-item]',
  templateUrl: './servicio-item.component.html',
  styleUrls: ['./servicio-item.component.css']
})
export class ServicioItemComponent implements OnInit {
  @Input() servicioItem: Servicio = <Servicio>{};
  @Output() aceptoBorrar: EventEmitter<string> = new EventEmitter;
  @Output() servicioEditado: EventEmitter<{nombreServicio: string, servicioEditado: Servicio}> = new EventEmitter;
  campoCantidad: FormGroup = {} as FormGroup;
  rutaActual: string = '';
  pedidoAEditar: Pedido = <Pedido>{};
  listaServiciosPedidos: ProductoPedido[] = [];

  constructor(private dialog: MatDialog, public router: Router, private agregarItemPedido: AgregarItemPedidoService, private pedidoService: PedidoService,
    private itemPedidoService: ItemPedidoService) { }

  ngOnInit(): void {
    this.rutaActual = this.router.url;
    this.getListaProductosPedidos();

    this.campoCantidad = new FormGroup({
      cantidad: new FormControl(),

  });
  }

  onDelete(nombreServicio: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'servicio',
      nombre: nombreServicio
  };
    this.dialog.open(DeleteDialogComponent, dialogConfig)
    .afterClosed().subscribe(confirmado => {
      if(confirmado){
        this.aceptoBorrar.emit(nombreServicio);
      }
    }) ;
  }

  onEdit(servicio: Servicio){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Servicio.getCamposFormulario(servicio);

    dialogConfig.data = {
      titulo: 'Editar servicio',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(servicioEditado => {
      if(servicioEditado){
        this.servicioEditado.emit({nombreServicio: servicio.nombre, servicioEditado: servicioEditado});
      }
    });
  }

  submit(item: Servicio){

    const cantidad = this.campoCantidad.value ;

    const productoPedido = new ProductoPedido(item, cantidad.cantidad, 0, 0 , 0, 0, 0);

    this.agregarItemPedido.item.next(productoPedido);
  }

  getListaProductosPedidos(){
    if(this.rutaActual.includes('editarPedido')){
      this.pedidoAEditar = this.pedidoService.getPedido()
      this.itemPedidoService.listaServiciosPedidos(this.pedidoAEditar.id).subscribe({
        next: (listaProductos) => {
          this.listaServiciosPedidos = listaProductos;

          this.rellenarCampos()
        },
        error: (error: HttpErrorResponse) => { console.log(error.message);}
      })
    }

  }

  rellenarCampos(){
    this.campoCantidad.patchValue({
      cantidad: this.listaServiciosPedidos.find(servicio => servicio.nombre === this.servicioItem.nombre)?.cantidad,

    })
  }

}
