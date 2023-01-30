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

constructor(private http: HttpClient) { }

/*public realizarPedido(idCliente: number, listaItemsPedidos: ProductoPedido[]): Observable<void> {
  return this.http.post<void>(this.itemPedidoURL + `/${idCliente}/guardarLista`, listaItemsPedidos)
}*/

public estimarItemPedido(itemPedido: ProductoPedido): Observable<ProductoPedido> {
  return this.http.post<ProductoPedido>(this.itemPedidoURL + '/estimarItem', itemPedido)
}

}
