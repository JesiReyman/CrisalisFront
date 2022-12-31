import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CamposFormulario } from './../../model/CamposFormulario';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  titulo: string;
  camposFormulario: CamposFormulario[];
  formulario: FormGroup = {} as FormGroup;
  group: any = {};

  constructor(private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.titulo = data.titulo;
      this.camposFormulario = data.camposFormulario;
     }

  ngOnInit(): void {
    this.camposFormulario.forEach(
      (question: {
        key: string;
        value: string;
        required: boolean;
        pattern?: string;
        type: string;
      }) => {
        this.validacionCondicional(question.type);
        this.group[question.key] = question.required
          ? new FormControl(
              question.value,

              Validators.required
            )
          : new FormControl(question.value);
      }
    );

    this.formulario = new FormGroup(this.group);
  }




  confirmar(){}

  validacionCondicional(tipo: string){
    console.log('este campo es del tipo: ' + tipo);
  }

}
