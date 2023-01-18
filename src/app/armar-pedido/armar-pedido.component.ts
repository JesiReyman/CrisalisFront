import { HttpErrorResponse } from '@angular/common/http';
import { PedidoService } from './../services/Pedido.service';
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


  constructor(
    private agregarItemPedido: AgregarItemPedidoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {

    //console.log("ngoninit " + this.listaItemsPedidos)
    //this.agregarALista();
    /*this.agregarItemPedido.agregarItem$

      .subscribe((data) => {
        //console.log('dentro del subscribe');
        //console.log(this.listaItemsPedidos);

        if (this.listaItemsPedidos.length == 0) {
          this.listaItemsPedidos.push(data);
        } else {
          let itemRepetido = this.listaItemsPedidos.find(
            (pedido) => pedido.nombre === data.nombre
          );
          console.log(
            'este es el item repetido: ' + JSON.stringify(itemRepetido)
          );
          if (!itemRepetido) {
            this.listaItemsPedidos.push(data);
          } else {
            itemRepetido['cantidad'] = data.cantidad;
            itemRepetido['aniosGarantia'] = data.aniosGarantia;
          }
        }
      });*/

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
        console.log('dentro del subscribe');
        //console.log(this.listaItemsPedidos);

        if (this.listaItemsPedidos.length == 0) {
          this.listaItemsPedidos.push(data);
        } else {
          let itemRepetido = this.listaItemsPedidos.find(
            (pedido) => pedido.nombre === data.nombre
          );
          console.log(
            'este es el item repetido: ' + JSON.stringify(itemRepetido)
          );
          if (!itemRepetido) {
            this.listaItemsPedidos.push(data);
          } else {
            itemRepetido['cantidad'] = data.cantidad;
            itemRepetido['aniosDeGarantia'] = data.aniosDeGarantia;
          }
        }
      });
  }

  confirmarPedido() {
    console.log('esta es la lista de items a pedir: ' + JSON.stringify(this.listaItemsPedidos) );
    this.agregarItemPedido.idCliente$
      .pipe(take(1))
      .subscribe((idCliente: number) => {

        this.idCliente = idCliente;
        console.log("estoy recibiendo el id del cliente en confirmar pedido: " + this.idCliente)
        this.pedidoService.realizarPedido(this.idCliente, this.listaItemsPedidos).subscribe({
          next: (pedido) => {console.log('guarde el pedido')},
          error: (error: HttpErrorResponse) => {console.log(error.message)},
        }


        )

      });
    //console.log('este es el dni del cliente: ' + this.idCliente);
  }
}
