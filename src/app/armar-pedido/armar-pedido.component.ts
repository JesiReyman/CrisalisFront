import { Pedido } from './../model/Pedido';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemPedidoService } from '../services/ItemPedido.service';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { AgregarItemPedidoService } from './../services/agregar-item-pedido.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-armar-pedido',
  templateUrl: './armar-pedido.component.html',
  styleUrls: ['./armar-pedido.component.css'],
})
export class ArmarPedidoComponent implements OnInit, OnDestroy {
  listaItemsPedidos: ProductoPedido[] = [];
  idCliente: number = 0;
  private unsubscribe = new Subject<void>();
  pedido: Pedido = {} as Pedido;


  constructor(
    private agregarItemPedido: AgregarItemPedidoService,
    private itemPedidoService: ItemPedidoService
  ) {}

  ngOnInit(): void {

    this.agregarALista();

  }

  ngOnDestroy(): void {
      this.unsubscribe.next()
      this.unsubscribe.complete();
  }

  agregarALista() {
    this.agregarItemPedido.agregarItem$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        console.log('dentro del subscribe de armar pedido y llego: ' + JSON.stringify(data));

        this.estimarItem(data);
      });
  }

  estimarItem(item: ProductoPedido){
    this.itemPedidoService.estimarItemPedido(item).subscribe({
      next: (itemEstimado) => {
        itemEstimado['precioTotal'] = itemEstimado.cantidad * itemEstimado.precioFinalUnitario;
        console.log("el item estimado es: " + JSON.stringify(itemEstimado))
        if (this.listaItemsPedidos.length == 0) {

          this.listaItemsPedidos.push(itemEstimado);
        } else {
          let itemRepetido = this.listaItemsPedidos.find(
            (pedido) => pedido.nombre === itemEstimado.nombre
          );
          console.log(
            'este es el item repetido: ' + JSON.stringify(itemRepetido)
          );
          if (!itemRepetido) {

            this.listaItemsPedidos.push(itemEstimado);
          } else {
            this.listaItemsPedidos[this.listaItemsPedidos.indexOf(itemRepetido)] = itemEstimado;

          }
        }

        this.estimarPedido();

      },
      error: (error: HttpErrorResponse) => {console.log(error)}
    })
  }

  estimarPedido(){
    let precioBase = 0;
    let totalImpuestos = 0;
    let total = 0;
    this.listaItemsPedidos.forEach(itemPedido => {
      precioBase += itemPedido.precioBase;
      totalImpuestos += itemPedido.cantidad * itemPedido.impuestoIVA;
      total += itemPedido.cantidad * itemPedido.precioFinalUnitario;
    });

    this.pedido = new Pedido(0, precioBase, totalImpuestos, total);
  }

  confirmarPedido() {
    console.log('esta es la lista de items a pedir: ' + JSON.stringify(this.listaItemsPedidos) );
    this.agregarItemPedido.idCliente$
      .pipe(take(1))
      .subscribe((idCliente: number) => {

        this.idCliente = idCliente;
        console.log("estoy recibiendo el id del cliente en confirmar pedido: " + this.idCliente)
        this.itemPedidoService.realizarPedido(this.idCliente, this.listaItemsPedidos).subscribe({
          next: (pedido) => {console.log('guarde el pedido')},
          error: (error: HttpErrorResponse) => {console.log(error.message)},
        }

        )

      });

  }

  eliminar(item: ProductoPedido){
    console.log("quiero eliminar lo siguiente: " + JSON.stringify(item));
    const index = this.listaItemsPedidos.indexOf(item);
    this.listaItemsPedidos.splice(index, 1);
  }
}
