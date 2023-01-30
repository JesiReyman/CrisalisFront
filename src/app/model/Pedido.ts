import { CamposFormulario } from './CamposFormulario';
import { EstadoPedido } from './EstadoPedido.enum';
export class Pedido {
  id: number;
  dniOCuitCliente: number
  estado: EstadoPedido;
  fechaCreacion: Date;
  precioBase: number;
  totalImpuestos: number;
  total: number;

  constructor(id: number, dniOCuitCliente: number, estado: EstadoPedido, fechaCreacion: Date, precioBase: number, totalImpuestos: number, total: number) {
    this.id = id;
    this.dniOCuitCliente = dniOCuitCliente;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.precioBase = precioBase;
    this.totalImpuestos = totalImpuestos;
    this.total = total;
  }

  static getCamposFormulario(item?: Pedido): CamposFormulario[]{
    let campos = [];
    let valores : [string];
    if (item){
      valores = [item.estado];
    } else{
      valores = [''];
    }
    campos = [
      {
        key: 'estado',
        value: valores[0],
        label: 'Estado:',
        type: 'text',
        options: [
          EstadoPedido.CANCELADO,
          EstadoPedido.CONFIRMADO,
          EstadoPedido.PENDIENTE
        ],
        required: true,
      },

    ];
    return campos;
  }
}
