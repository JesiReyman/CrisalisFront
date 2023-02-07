import { EstadoPedido } from './../model/EstadoPedido.enum';
import { Pedido } from './../model/Pedido';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoPedido } from '../model/ProductoPedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidoURL = environment.apiUrl + '/pedido';
  pedido: Pedido = <Pedido>{} ;

  constructor(private http: HttpClient) { }

  public realizarPedido(idCliente: number, listaItemsPedidos: ProductoPedido[]): Observable<Pedido> {
    return this.http.post<Pedido>(this.pedidoURL + `/${idCliente}/nuevo`, listaItemsPedidos)
  }

  public obtenerListaPedidos(request: HttpParams): Observable<any> {
    return this.http.get<Pedido[]>(this.pedidoURL + '/lista', {params: request});
  }

  public cambiarEstado(idPedido: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(this.pedidoURL + `/${idPedido}/cambiarEstado`, pedido);
  }

  public editarPedido(idPedido: number, listaItemsPedidos: ProductoPedido[]): Observable<Pedido> {
    return this.http.put<Pedido>(this.pedidoURL + `/editar/${idPedido}`, listaItemsPedidos);
  }

  public pedidosDeCliente(dniOCuit: number, page: number, size: number ): Observable<any> {
    let params = new HttpParams().set("page", page).set("size", size);
    return this.http.get<Pedido[]>(this.pedidoURL + `/${dniOCuit}/lista`, {params: params});
  }

  setPedido(pedido: Pedido){
    this.pedido = pedido;
  }

  getPedido(){
    return this.pedido;
  }

}
