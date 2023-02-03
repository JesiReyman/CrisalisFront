import { HttpErrorResponse } from '@angular/common/http';
import { ItemPedidoService } from './../../services/ItemPedido.service';

import { PedidoService } from './../../services/pedido.service';
import { AgregarItemPedidoService } from './../../services/agregar-item-pedido.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../../Dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../../Dialogs/delete-dialog/delete-dialog.component';
import { Producto } from '../../model/Producto';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Pedido } from 'src/app/model/Pedido';

@Component({
  selector: 'tr[app-producto-item]',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() productoItem: Producto = <Producto>{};
  @Output() aceptoBorrar = new EventEmitter<string>();
  @Output() productoEditado = new EventEmitter<{nombreProducto: string, producto: Producto}>();
  campoCantidad: FormGroup = {} as FormGroup;
  listaProductosPedidos : ProductoPedido[] = [];
  rutaActual='';
  pedidoAEditar: Pedido = <Pedido>{};



  constructor(private dialog: MatDialog, public router: Router, private agregarItemPedido: AgregarItemPedidoService, private pedidoService: PedidoService, private itemPedidoService: ItemPedidoService) { }

  ngOnInit(): void {
    this.rutaActual = this.router.url;
    this.getListaProductosPedidos();



    this.campoCantidad = new FormGroup({
      cantidad: new FormControl(),
      aniosGarantia: new FormControl(),
  });
  }

  onDelete(nombre: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'producto',
      nombre: nombre
  };
    this.dialog.open(DeleteDialogComponent, dialogConfig)
    .afterClosed().subscribe(confirmado => {
      if(confirmado){
        this.aceptoBorrar.emit(nombre);
      }
    }) ;

  }

  onEdit(producto: Producto): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Producto.getCamposFormulario(producto);

    dialogConfig.data = {
      titulo: 'Editar producto',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(productoEditado => {
      if(productoEditado){
        this.productoEditado.emit({nombreProducto: producto.nombre, producto: productoEditado});
      }
    });
  }

  submit(item: Producto){

    const cantidadGarantia = this.campoCantidad.value ;

    const productoPedido = new ProductoPedido(item, cantidadGarantia.cantidad, cantidadGarantia.aniosGarantia, 0 , 0, 0, 0);

    this.agregarItemPedido.item.next(productoPedido);
  }

  getListaProductosPedidos(){
    if(this.rutaActual.includes('editarPedido')){
      this.pedidoAEditar = this.pedidoService.getPedido()
      this.itemPedidoService.listaProductosPedidos(this.pedidoAEditar.id).subscribe({
        next: (listaProductos) => {
          this.listaProductosPedidos = listaProductos;
          console.log("en item producto llego: " + JSON.stringify(this.listaProductosPedidos))
          this.rellenarCampos()
        },
        error: (error: HttpErrorResponse) => { console.log(error.message);}
      })
    }

  }

  rellenarCampos(){
    this.campoCantidad.patchValue({
      cantidad: this.listaProductosPedidos.find(producto => producto.nombre === this.productoItem.nombre)?.cantidad,
      aniosGarantia: this.listaProductosPedidos.find(producto => producto.nombre === this.productoItem.nombre)?.aniosDeGarantia,
    })


  }



}
