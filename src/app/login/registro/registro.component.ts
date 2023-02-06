import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(public dialogRef: MatDialogRef<RegistroComponent>) { }

  ngOnInit() {
  }

  get nombre() { return this.registroForm.get('nombre'); }
  get apellido() { return this.registroForm.get('apellido'); }
  get email() { return this.registroForm.get('email'); }
  get nombreUsuario() { return this.registroForm.get('nombreUsuario'); }
  get password() { return this.registroForm.get('password'); }

  registrar(){
    this.dialogRef.close(this.registroForm.value);
  }

}
