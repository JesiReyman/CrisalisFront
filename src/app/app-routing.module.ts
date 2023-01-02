import { ProductoComponent } from './producto/producto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ServicioComponent } from './servicio/servicio.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'productos', component: ProductoComponent },
  { path: 'servicios', component: ServicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
