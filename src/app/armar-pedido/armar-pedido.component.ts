import { AgregarItemPedidoService } from 'src/app/services/agregar-item-pedido.service';
import { Router } from '@angular/router';
import { EstadoPedido } from './../model/EstadoPedido.enum';
import { PedidoService } from './../services/pedido.service';
import { Pedido } from './../model/Pedido';
import { HttpErrorResponse } from '@angular/common/http';
import { ItemPedidoService } from '../services/ItemPedido.service';
import { ProductoPedido } from 'src/app/model/ProductoPedido';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { concat, Subject, take, takeUntil, tap } from 'rxjs';

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
  dniOCuitCLiente: number = 0;
  pedidoAEditar: Pedido = <Pedido>{};
  listaProductosPedidos: ProductoPedido[] = [];

  listaServiciosPedidos: ProductoPedido[] = [];
  rutaActual: String = '';





  constructor(
    private agregarItemPedido: AgregarItemPedidoService,
    private itemPedidoService: ItemPedidoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rutaActual = this.router.url;
    this.obtenerPedidoAEditar();

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

        this.estimarItem(data);
      });


  }

  estimarItem(item: ProductoPedido){
    if(this.rutaActual.includes('/realizarPedido')){
      this.dniOCuitCLiente = this.agregarItemPedido.getDniOCuit();
    }

    this.itemPedidoService.estimarItemPedido(item, this.dniOCuitCLiente).subscribe({
      next: (itemEstimado) => {

        let precioTotalPorCantidad = itemEstimado.cantidad * itemEstimado.precioFinalUnitario;

        itemEstimado['precioTotal'] = precioTotalPorCantidad;

        if (this.listaItemsPedidos.length == 0) {

          this.listaItemsPedidos.push(itemEstimado);
        } else {
          let itemRepetido = this.listaItemsPedidos.find(
            (pedido) => pedido.nombre === itemEstimado.nombre
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
    let totalAdicionales = 0;
    let totalDescuento = 0;
    this.listaItemsPedidos.forEach(itemPedido => {
      precioBase += itemPedido.precioBase * itemPedido.cantidad;
      totalImpuestos +=  itemPedido.totalImpuestos * itemPedido.cantidad;
      totalAdicionales += itemPedido.totalAdicionales * itemPedido.cantidad;
      totalDescuento += itemPedido.descuento * itemPedido.cantidad;

      total += itemPedido.precioTotal;

    });
    if(totalDescuento > 2500){
      totalDescuento = 2500;
    }
    total -= totalDescuento;

    this.pedido = new Pedido(0, 0, EstadoPedido.PENDIENTE , new Date , precioBase, totalImpuestos, totalAdicionales, total, totalDescuento);
  }

  confirmarPedido() {

      this.pedidoService.realizarPedido(this.dniOCuitCLiente, this.listaItemsPedidos).subscribe({
        next: (pedido) => {
          this.router.navigate(['/pedidos'])
        },
        error: (error: HttpErrorResponse) => {console.log(error.message)},
      }

      )

  }

  eliminar(item: ProductoPedido){
    const index = this.listaItemsPedidos.indexOf(item);
    this.listaItemsPedidos.splice(index, 1);
    this.estimarPedido();
  }

  obtenerPedidoAEditar(){
    let rutaActual = this.router.url;
    if (rutaActual.includes('/editarPedido')) {
      this.pedidoAEditar = this.pedidoService.getPedido();
      this.dniOCuitCLiente = this.pedidoAEditar.dniOCuitCliente;

      this.itemPedidoService.listaItemsPedidos(this.pedidoAEditar.id).subscribe({
        next: (pedido) => {

          this.listaItemsPedidos = pedido;
          this.listaItemsPedidos.forEach(element => {
            this.estimarItem(element)
          });



        },
        error: (error: HttpErrorResponse) => {console.log(error.message)}
      })

    }

  }
}
