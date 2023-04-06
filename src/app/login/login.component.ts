import { RegistroComponent } from './registro/registro.component';
import { TokenService } from './../services/token.service';
import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NuevoUsuario } from '../model/nuevoUsuario';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  registracionForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    nombreUsuario: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let usuario = this.loginForm.value as Usuario;
    if (this.loginForm.valid) {

      this.authService.login(usuario).subscribe({
        next: (resultado) => {

          let token = resultado.token;
          this.tokenService.setToken(token);
          this.tokenService.isLogged();
          this.router.navigate(['/productos']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Falló',
            text: 'Verifique si ingresó correctamente el usuario y contraseña.',

          })
        },
      });
    }
  }


  registroDialog(){
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '300px',
    })

    dialogRef.afterClosed().subscribe(nuevoUsuario => {
      if(nuevoUsuario){
        this.authService.nuevoUsuario(nuevoUsuario).subscribe({
          next: (resultado) => {
            Swal.fire({
              icon: 'success',
              title: 'Nuevo usuario guardado',

            })
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              icon: 'error',
              title: 'Falló',

            })
            console.log(error.message);
          }
        })
      }


    });
  }



}
