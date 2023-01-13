import { EmpresaClienteService } from './../services/empresa-cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpresaCliente } from '../model/EmpresaCliente';
import { HttpErrorResponse } from '@angular/common/http';
import { AddDialogComponent } from '../Dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-empresa-cliente',
  templateUrl: './empresa-cliente.component.html',
  styleUrls: ['./empresa-cliente.component.css']
})
export class EmpresaClienteComponent implements OnInit {
  listaEmpresas: EmpresaCliente[] = [];
  constructor(private empresaClienteService: EmpresaClienteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getListaEmpresas();
  }

  getListaEmpresas() {
    this.empresaClienteService.obtenerListaEmpresas().subscribe({
      next: (lista) => {
        this.listaEmpresas = lista;
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  agregar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = EmpresaCliente.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Nueva Empresa Cliente',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((empresa) => {
        if (empresa) {
          this.empresaClienteService.agregarEmpresa(empresa)
          .subscribe({
            next: () => {
              this.getListaEmpresas();
            },
            error: (error: HttpErrorResponse) => console.log(error),
          });
        }
      });
  }

  eliminar(cuit: number){
    //console.log(cuit);
    this.empresaClienteService.eliminarEmpresa(cuit).subscribe({
      next: () => {
        this.getListaEmpresas();
      },
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  editar(item: any){
    this.empresaClienteService
      .editarEmpresa(item.cuitEmpresa, item.empresaEditada)
      .subscribe({
        next: () => {
          this.getListaEmpresas();
        },
        error: (error: HttpErrorResponse) => console.log(error),
      });
  }

}
