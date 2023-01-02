import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './producto/producto.component';
import { ProductoItemComponent } from './producto/producto-item/producto-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DeleteDialogComponent } from './Dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './Dialogs/add-dialog/add-dialog.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ServicioItemComponent } from './servicio/servicio-item/servicio-item.component';

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
    ServicioItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
