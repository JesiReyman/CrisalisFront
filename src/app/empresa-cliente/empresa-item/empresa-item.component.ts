import { EmpresaCliente } from './../../model/EmpresaCliente';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'tr[app-empresa-item]',
  templateUrl: './empresa-item.component.html',
  styleUrls: ['./empresa-item.component.css']
})
export class EmpresaItemComponent implements OnInit {
  @Input() empresaCliente: EmpresaCliente = <EmpresaCliente>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter;
  @Output() empresaEditada = new EventEmitter<{cuitEmpresa: number, empresaEditada: EmpresaCliente}>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEdit(empresaCliente: EmpresaCliente){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = EmpresaCliente.getCamposFormulario(empresaCliente);

    dialogConfig.data = {
      titulo: 'Editar empresa',
      camposFormulario: campos,
    };

    this.dialog.open(AddDialogComponent, dialogConfig)
    .afterClosed().subscribe(empresaEditada => {
      if(empresaEditada){
        this.empresaEditada.emit({cuitEmpresa: empresaCliente.cuit, empresaEditada: empresaEditada});
      }
    });
  }

  onDelete(empresaCliente: EmpresaCliente){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'cliente empresa',
      nombre: empresaCliente.razonSocial
    };
    this.dialog
      .open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.aceptoBorrar.emit(empresaCliente.cuit);
        }
      });
  }

}
