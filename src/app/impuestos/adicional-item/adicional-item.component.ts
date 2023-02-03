import { Adicional } from '../../model/Adicional';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'tr[app-adicional-item]',
  templateUrl: './adicional-item.component.html',
  styleUrls: ['./adicional-item.component.css']
})
export class AdicionalItemComponent implements OnInit {
  @Input() adicional: Adicional = <Adicional>{};
  @Output() aceptoBorrar = new EventEmitter<string>();
  @Output() adicionalEditado = new EventEmitter<{nombreAdicional: string, adicionalEditado: Adicional}>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(adicional: Adicional){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Adicional.getCamposFormulario(adicional);

    dialogConfig.data = {
      titulo: 'Editar Adicional',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(adicionalEditado => {

      if(adicionalEditado){
        this.adicionalEditado.emit({nombreAdicional: adicional.nombre, adicionalEditado: adicionalEditado});
      }
    });
  }

  onDelete(adicional: Adicional){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'adicional',
      nombre: adicional.nombre,
    };
    this.dialog
      .open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.aceptoBorrar.emit(adicional.nombre);
        }
      });
  }

}
