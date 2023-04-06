import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Router } from '@angular/router';
import { AddDialogComponent } from './../Dialogs/add-dialog/add-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../services/producto.service';
import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../model/Producto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  public listaProductos: Producto[] = [];
  @Input() productosPedidos: ProductoPedido[] = [];
  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerListaProductos();

  }

  obtenerListaProductos() {
    this.productoService.obtenerListaProducto().subscribe({
      next: (lista) => {
        this.listaProductos = lista;

      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  eliminar(nombre: string) {

    this.productoService.eliminarProducto(nombre).subscribe({
      next: () => {
        this.obtenerListaProductos();
      },
      error: (error: HttpErrorResponse) => Swal.fire({
        icon: 'error',
        title: 'Falló',
        text: 'No se puede eliminar el producto porque está en uso.',

      }),
    });
  }

  agregar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Producto.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Agregar producto',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((producto) => {
        if (producto) {
          this.productoService.agregarProducto(producto)
          .subscribe({
            next: () => {
              this.obtenerListaProductos();
            },
            error: (error: HttpErrorResponse) => console.log(error.message),
          });
        }
      });
  }

  editar(item: any) {
    this.productoService
      .editarProducto(item.nombreProducto, item.producto)
      .subscribe({
        next: () => {
          this.obtenerListaProductos();
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }


}
