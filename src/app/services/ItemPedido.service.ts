import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemPedidoService {
private itemPedidoURL = environment.apiUrl + '/itemsPedidos';
private productoPedidoURL = environment.apiUrl + '/productoPedido';
private servicioPedidoURL = environment.apiUrl + '/servicioPedido';

constructor(private http: HttpClient) { }

/*public realizarPedido(idCliente: number, listaItemsPedidos: ProductoPedido[]): Observable<void> {
  return this.http.post<void>(this.itemPedidoURL + `/${idCliente}/guardarLista`, listaItemsPedidos)
}*/

public estimarItemPedido(itemPedido: ProductoPedido, idCliente: number): Observable<ProductoPedido> {
  return this.http.post<ProductoPedido>(this.itemPedidoURL + `/estimarItem/${idCliente}`, itemPedido)
}

public listaItemsPedidos(idPedido: number): Observable<ProductoPedido[]> {
  return this.http.get<ProductoPedido[]>(this.itemPedidoURL + `/${idPedido}/lista`)
}

public listaProductosPedidos(idPedido: number): Observable<ProductoPedido[]> {
  return this.http.get<ProductoPedido[]>(this.productoPedidoURL + `/${idPedido}/lista`)
}

public listaServiciosPedidos(idPedido: number): Observable<ProductoPedido[]> {
  return this.http.get<ProductoPedido[]>(this.servicioPedidoURL + `/${idPedido}/lista`)
}

}
