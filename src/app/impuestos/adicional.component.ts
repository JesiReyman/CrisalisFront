import { AdicionalService } from '../services/adicional.service';
import { Adicional } from '../model/Adicional';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-adicional',
  templateUrl: './adicional.component.html',
  styleUrls: ['./adicional.component.css']
})
export class AdicionalComponent implements OnInit {
  public listaAdicionales: Adicional[] = [];
  constructor(private adicionalService: AdicionalService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaAdicionales();
  }

  obtenerListaAdicionales() {
    this.adicionalService.obtenerListaAdicionales().subscribe({
      next: (lista) => {
        this.listaAdicionales = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  agregar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Adicional.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Nuevo Adicional',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((adicional) => {
        if (adicional) {
          this.adicionalService.crearAdicional(adicional)
          .subscribe({
            next: () => {
              this.obtenerListaAdicionales();
            },
            error: (error: HttpErrorResponse) => console.log(error.message),
          });
        }
      });
  }

  eliminar(adicional: string){
    this.adicionalService.eliminarAdicional(adicional).subscribe({
      next: () => {
        this.obtenerListaAdicionales();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
    });
  }

  editar(item: any){

    this.adicionalService
      .editarAdicional(item.nombreAdicional, item.adicionalEditado)
      .subscribe({
        next: () => {
          this.obtenerListaAdicionales();
        },
        error: (error: HttpErrorResponse) => console.log(error.message),
      });
  }

}
