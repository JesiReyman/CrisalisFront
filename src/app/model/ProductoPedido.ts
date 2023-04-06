import { Servicio } from 'src/app/model/Servicio';
import { Producto } from "./Producto";

export class ProductoPedido {
  nombre: string;
  precioBase: number;
  cantidad: number;
  activo?: boolean;
  tipo: string;
  aniosDeGarantia?: number;
  totalImpuestos: number;
  totalAdicionales: number;
  precioFinalUnitario: number;
  precioTotal: number;
  descuento: number;


  constructor(item: Producto | Servicio, cantidad: number, aniosDeGarantia: number, totalImpuestos: number, totalAdicionales: number, precioFinalUnitario: number, descuento: number) {
    this.nombre = item.nombre;
    this.precioBase = item.precioBase;
    this.cantidad = cantidad;
    this.aniosDeGarantia = aniosDeGarantia;
    this.totalImpuestos = totalImpuestos;
    this.totalAdicionales = totalAdicionales;
    this.precioFinalUnitario = precioFinalUnitario;
    this.precioTotal = cantidad * precioFinalUnitario;
    this.descuento = descuento;
    this.tipo = item.tipo;
  }


  static getColumnasTabla(){
    let columnas: any[]
    return columnas  = [
      {
        propiedad: 'nombre',
        nombre: 'Nombre'
      },
      {
        propiedad: 'cantidad',
        nombre: 'Cantidad'
      },
      {
        propiedad: 'precioFinalUnitario',
        nombre: 'Precio Final Unitario ($)'
      },
      {
        propiedad: 'activo',
        nombre: 'Estado'
      }

    ]
  }

}
