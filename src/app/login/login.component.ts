import { TokenService } from './../services/token.service';
import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NuevoUsuario } from '../model/nuevoUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let usuario = this.loginForm.value as Usuario;
    if (this.loginForm.valid) {

      this.authService.login(usuario).subscribe({
        next: (resultado) => {

          let token = resultado.token;
          this.tokenService.setToken(token);
          this.router.navigate(['/productos']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
        },
      });
    }
  }

  onRegistrar(): void {
    let nuevoUsuario = this.registracionForm.value as NuevoUsuario;

    this.authService.nuevoUsuario(nuevoUsuario).subscribe({
      next: (resultado) => {

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    })
  }
}
