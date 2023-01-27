import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicioService } from './../services/servicio.service';
import { Servicio } from './../model/Servicio';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  listaServicios: Servicio[] = [];

  constructor(private servicioService: ServicioService, private dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.listaDeServicios();
  }

  listaDeServicios(){
    this.servicioService.obtenerListaServicios().subscribe({
      next: lista => {this.listaServicios = lista},
      error: (error: HttpErrorResponse) => {console.log(error)}
    })
  }

  agregar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = Servicio.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Agregar servicio',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((servicio) => {
        if (servicio) {
          this.servicioService.agregarServicio(servicio)
          .subscribe({
            next: () => {
              this.listaDeServicios();
            },
            error: (error: HttpErrorResponse) => console.log(error),
          });
        }
      });
  }

  eliminar(nombreServicio: string){
    this.servicioService.eliminarServicio(nombreServicio).subscribe({
      next: () => {
        this.listaDeServicios();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  editar(item: any) {
    this.servicioService
      .editarServicio(item.nombreServicio, item.servicioEditado)
      .subscribe({
        next: () => {
          this.listaDeServicios();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      });
   }
}
