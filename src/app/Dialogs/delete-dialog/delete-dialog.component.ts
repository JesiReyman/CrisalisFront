import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  nombre: string;
  tipo: string;

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.nombre = data.nombre;
      this.tipo = data.tipo;
     }

  ngOnInit(): void {
    //console.log(this.nombre);
  }

  confirmar(){
    this.dialogRef.close(true);
  }

}
