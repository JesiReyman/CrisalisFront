import { Servicio } from 'src/app/model/Servicio';
import { Producto } from "./Producto";

export class ProductoPedido {
  nombre: string;
  precioBase: number;
  cantidad: number;
  aniosDeGarantia?: number;
  impuestoIVA: number;
  precioFinalUnitario: number;
  precioTotal: number;


  constructor(item: Producto | Servicio, cantidad: number, aniosDeGarantia: number, impuestoIVA: number, precioFinalUnitario: number) {
    this.nombre = item.nombre;
    this.precioBase = item.precioBase;
    this.cantidad = cantidad;
    this.aniosDeGarantia = aniosDeGarantia;
    this.impuestoIVA = impuestoIVA;
    this.precioFinalUnitario = precioFinalUnitario;
    this.precioTotal = cantidad * precioFinalUnitario;
  }
}
