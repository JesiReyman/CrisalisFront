import { ImpuestoService } from './../services/impuesto.service';
import { Impuesto } from './../model/Impuesto';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css']
})
export class ImpuestosComponent implements OnInit {
  public listaImpuestos: Impuesto[] = [];
  constructor(private impuestoService: ImpuestoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaImpuestos();
  }

  obtenerListaImpuestos() {
    this.impuestoService.obtenerListaImpuestos().subscribe({
      next: (lista) => {
        this.listaImpuestos = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  agregar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Impuesto.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Nuevo Impuesto',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((impuesto) => {
        if (impuesto) {
          this.impuestoService.crearImpuesto(impuesto)
          .subscribe({
            next: () => {
              this.obtenerListaImpuestos();
            },
            error: (error: HttpErrorResponse) => console.log(error),
          });
        }
      });
  }

  eliminar(impuesto: string){
    this.impuestoService.eliminarImpuesto(impuesto).subscribe({
      next: () => {
        this.obtenerListaImpuestos();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  editar(item: any){
    this.impuestoService
      .editarImpuesto(item.nombreImpuesto, item.impuestoEditado)
      .subscribe({
        next: () => {
          this.obtenerListaImpuestos();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }

}
