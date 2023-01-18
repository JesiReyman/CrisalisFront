import { Producto } from "./Producto";

export class ProductoPedido {
  nombre: string;
  precioBase: number;
  cantidad: number;
  aniosDeGarantia?: number;

  constructor(item: Producto, cantidad: number, aniosDeGarantia: number) {
    this.nombre = item.nombre;
    this.precioBase = item.precioBase;
    this.cantidad = cantidad;
    this.aniosDeGarantia = aniosDeGarantia;
  }
}
