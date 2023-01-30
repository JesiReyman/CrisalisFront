import { PedidosComponent } from './pedidos/pedidos.component';
import { VerificacionEmpresaComponent } from './verificacion-empresa/verificacion-empresa.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { ArmarPedidoComponent } from './armar-pedido/armar-pedido.component';
import { EmpresaClienteComponent } from './empresa-cliente/empresa-cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'productos', component: ProductoComponent },
  { path: 'servicios', component: ServicioComponent },
  { path: 'cliente-persona', component: ClienteComponent },
  { path: 'cliente-empresa', component: EmpresaClienteComponent },
  { path: 'realizarPedido', component: ArmarPedidoComponent },
  { path: 'impuestos', component: ImpuestosComponent },
  { path: 'verificacion', component: VerificacionEmpresaComponent },
  { path: 'pedidos', component: PedidosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
