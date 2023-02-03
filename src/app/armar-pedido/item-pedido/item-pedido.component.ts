import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tr[app-item-pedido]',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.css']
})
export class ItemPedidoComponent implements OnInit {
  @Input() itemPedido: ProductoPedido = <ProductoPedido>{};
  @Output() eliminarItem = new EventEmitter<ProductoPedido>();
  constructor() { }

  ngOnInit(): void {
  }

  eliminar(item: ProductoPedido){
    this.eliminarItem.next(item);
  }



}
