import { AddDialogComponent } from './../Dialogs/add-dialog/add-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductoService } from './../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../model/Producto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  public listaProductos: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerListaProductos();
  }

  obtenerListaProductos() {
    this.productoService.obtenerListaProducto().subscribe({
      next: (lista) => {
        this.listaProductos = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  eliminar(nombre: string) {
    console.log(nombre);
    this.productoService.eliminarProducto(nombre).subscribe({
      next: () => {
        this.obtenerListaProductos();
      },
      error: (error: HttpErrorResponse) => console.log(error),
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

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(producto => {
      if(producto){
        console.log('a prodcuto llego: ' + JSON.stringify(producto) );
      this.productoService.agregarProducto(producto).subscribe({
        next: () => {
          this.obtenerListaProductos();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      })
      }
    });
  }

  editar(item: any){
    this.productoService.editarProducto(item.nombreProducto, item.producto).subscribe({
      next: () => {
        this.obtenerListaProductos();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    })
  }
}
