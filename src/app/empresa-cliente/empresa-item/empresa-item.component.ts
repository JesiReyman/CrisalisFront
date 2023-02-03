import { ClientePersonaService } from './../../services/cliente-persona.service';
import { Router } from '@angular/router';
import { EmpresaClienteService } from './../../services/empresa-cliente.service';
import { EmpresaCliente } from './../../model/EmpresaCliente';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/Dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from 'src/app/Dialogs/add-dialog/add-dialog.component';
import { ClientePersona } from 'src/app/model/ClientePersona';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tr[app-empresa-item]',
  templateUrl: './empresa-item.component.html',
  styleUrls: ['./empresa-item.component.css'],
})
export class EmpresaItemComponent implements OnInit {
  @Input() empresaCliente: EmpresaCliente = <EmpresaCliente>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() empresaEditada = new EventEmitter<{
    cuitEmpresa: number;
    empresaEditada: EmpresaCliente;
  }>();

  constructor(
    private dialog: MatDialog,
    private empresaClienteService: EmpresaClienteService,
    private router: Router,
    private clientePersonaService: ClientePersonaService
  ) {}

  ngOnInit(): void {}

  onEdit(empresaCliente: EmpresaCliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = EmpresaCliente.getCamposFormulario(empresaCliente);

    dialogConfig.data = {
      titulo: 'Editar empresa',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((empresaEditada) => {
        if (empresaEditada) {
          this.empresaEditada.emit({
            cuitEmpresa: empresaCliente.dniOCuit,
            empresaEditada: empresaEditada,
          });
        }
      });
  }

  onDelete(empresaCliente: EmpresaCliente) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      tipo: 'cliente empresa',
      nombre: empresaCliente.razonSocial,
    };
    this.dialog
      .open(DeleteDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this.aceptoBorrar.emit(empresaCliente.dniOCuit);
        }
      });
  }

  realizarPedido(empresaCliente: EmpresaCliente) {

    if (!empresaCliente.dniPersona) {
      alert('Esta empresa no tiene ninguna persona registrada, por favor registre una');
      this.registrarPersona();
    }
  }

  registrarPersona() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let campos = ClientePersona.getCamposFormulario();

    dialogConfig.data = {
      titulo: 'Persona Responsable',
      camposFormulario: campos,
    };

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((cliente) => {
        if (cliente) {
          this.clientePersonaService.agregarCliente(cliente).subscribe({
            next: () => {
              alert("Se registró exitosamente");
              this.router.navigate(['/realizarPedido']);
            },
            error: (error: HttpErrorResponse) => console.log(error),
          });
        }
      });
  }
}
