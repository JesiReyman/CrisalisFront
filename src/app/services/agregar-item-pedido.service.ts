import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { ProductoPedido } from '../model/ProductoPedido';

@Injectable({
  providedIn: 'root'
})
export class AgregarItemPedidoService {
  item: Subject<ProductoPedido> = new Subject<ProductoPedido>();
  agregarItem$ = this.item.asObservable();
  dniOCuitCLiente = 0;
  listaProductosPedidos: ProductoPedido[] = [];

  idCliente: Subject<number> = new BehaviorSubject<number>(0);
  idCliente$ = this.idCliente.asObservable();
  constructor() { }

  recibirItemPedido(){
    this.agregarItem$.subscribe(pedido => {

      this.item.next(pedido);
    })
  }

  recibirCliente(){
    this.idCliente$.subscribe(cliente => {
      this.idCliente.next(cliente);
    })
  }

  setDniOCuit(dniOCuit: number){
    this.dniOCuitCLiente = dniOCuit;
  }

  getDniOCuit(){
    return this.dniOCuitCLiente;
  }

  setListaProductosPedidos(listaProductos: ProductoPedido[]){
    this.listaProductosPedidos = listaProductos;
  }

  getListaProductosPedidos(){
    return this.listaProductosPedidos;
  }


}
