import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tr[app-item-pedido]',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.css']
})
export class ItemPedidoComponent implements OnInit {
  @Input() itemPedido: ProductoPedido = <ProductoPedido>{};
  constructor() { }

  ngOnInit(): void {
  }

}
