import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
private pedidoURL = environment.apiUrl + '/itemsPedidos';

constructor(private http: HttpClient) { }

public realizarPedido(idCliente: number, listaItemsPedidos: ProductoPedido[]): Observable<void> {
  return this.http.post<void>(this.pedidoURL + `/${idCliente}/guardarLista`, listaItemsPedidos)
}

}
