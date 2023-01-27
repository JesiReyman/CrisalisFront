import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductoComponent } from './producto/producto.component';
import { ProductoItemComponent } from './producto/producto-item/producto-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from './Dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './Dialogs/add-dialog/add-dialog.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ServicioItemComponent } from './servicio/servicio-item/servicio-item.component';
import { InterceptorService } from './services/interceptor.service';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientePersonaComponent } from './cliente/cliente-persona/cliente-persona.component';
import { EmpresaClienteComponent } from './empresa-cliente/empresa-cliente.component';
import { EmpresaItemComponent } from './empresa-cliente/empresa-item/empresa-item.component';
import { ArmarPedidoComponent } from './armar-pedido/armar-pedido.component';
import { ItemPedidoComponent } from './armar-pedido/item-pedido/item-pedido.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { ImpuestoItemComponent } from './impuestos/impuesto-item/impuesto-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProductoComponent,
    ProductoItemComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    ServicioComponent,
    ServicioItemComponent,
    ClienteComponent,
    ClientePersonaComponent,
    EmpresaClienteComponent,
    EmpresaItemComponent,
    ArmarPedidoComponent,
    ItemPedidoComponent,
    ImpuestosComponent,
    ImpuestoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
