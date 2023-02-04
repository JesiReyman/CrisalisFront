import { Router } from '@angular/router';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'tr[app-item-pedido]',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.css']
})
export class ItemPedidoComponent implements OnInit {
  @Input() itemPedido: ProductoPedido = <ProductoPedido>{};
  @Output() eliminarItem = new EventEmitter<ProductoPedido>();
  rutaActual: string = '';


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.rutaActual = this.router.url;

  }

  eliminar(item: ProductoPedido){
    this.eliminarItem.next(item);
  }





}
