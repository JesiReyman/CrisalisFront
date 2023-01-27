import { Impuesto } from './../../model/Impuesto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'tr[app-impuesto-item]',
  templateUrl: './impuesto-item.component.html',
  styleUrls: ['./impuesto-item.component.css']
})
export class ImpuestoItemComponent implements OnInit {
  @Input() impuesto: Impuesto = <Impuesto>{};
  @Output() aceptoBorrar = new EventEmitter<string>();
  @Output() impuestoEditado = new EventEmitter<{nombreImpuesto: string, impuestoEditado: Impuesto}>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(impuesto: Impuesto){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Impuesto.getCamposFormulario(impuesto);

    dialogConfig.data = {
      titulo: 'Editar impuesto',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(impuestoEditado => {
      if(impuestoEditado){
        this.impuestoEditado.emit({nombreImpuesto: impuesto.nombre, impuestoEditado: impuestoEditado});
      }
    });
  }

  onDelete(impuesto: Impuesto){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'impuesto',
      nombre: impuesto.nombre,
    };
    this.dialog
      .open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.aceptoBorrar.emit(impuesto.nombre);
        }
      });
  }

}
