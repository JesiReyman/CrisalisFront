import { EstadoPedido } from './../model/EstadoPedido.enum';
import { Pedido } from './../model/Pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoPedido } from '../model/ProductoPedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidoURL = environment.apiUrl + '/pedido';
  constructor(private http: HttpClient) { }

  public realizarPedido(idCliente: number, listaItemsPedidos: ProductoPedido[]): Observable<Pedido> {
    return this.http.post<Pedido>(this.pedidoURL + `/${idCliente}/nuevo`, listaItemsPedidos)
  }

  public obtenerListaPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.pedidoURL + '/lista')
  }

  public cambiarEstado(idPedido: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(this.pedidoURL + `/${idPedido}/cambiarEstado`, pedido);
  }
}
