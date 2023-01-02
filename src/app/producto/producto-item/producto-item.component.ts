import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../../Dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../../Dialogs/delete-dialog/delete-dialog.component';
import { Producto } from '../../model/Producto';

@Component({
  selector: 'tr[app-producto-item]',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() productoItem: Producto = <Producto>{};
  @Output() aceptoBorrar = new EventEmitter<string>();
  @Output() productoEditado = new EventEmitter<{nombreProducto: string, producto: Producto}>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

}