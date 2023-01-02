import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productoURL = environment.apiUrl + '/producto';
  constructor(private http: HttpClient) { }

  public obtenerListaProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productoURL + '/lista');
  }

  public eliminarProducto(nombreProducto: string): Observable<void>{
    return this.http.delete<void>(this.productoURL +  `/eliminar/${nombreProducto}`);
  }

  public agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productoURL + '/nuevo', producto);
  }

  public editarProducto(nombreProducto: string, producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(this.productoURL + `/editar/${nombreProducto}`, producto)
  }

}
