import { EstadoPedido } from './EstadoPedido.enum';
export class Pedido {
  id: number;
  precioBase: number;
  totalImpuestos: number;
  total: number;
  estado?: EstadoPedido;
  fechaCreacion?: Date;

  constructor(id: number, precioBase: number, totalImpuestos: number, total: number, estado?: EstadoPedido, fechaCreacion?: Date) {
    this.id = id;
    this.precioBase = precioBase;
    this.totalImpuestos = totalImpuestos;
    this.total = total;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
  }
}
