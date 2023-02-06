import { CamposFormulario } from './CamposFormulario';
import { EstadoPedido } from './EstadoPedido.enum';
export class Pedido {
  id: number;
  dniOCuitCliente: number;
  estado: EstadoPedido;
  fechaCreacion: Date;
  precioBase: number;
  totalImpuestos: number;
  totalAdicionales: number;
  total: number;
  descuento: number;
  tipoCliente: string;

  constructor(
    id: number,
    dniOCuitCliente: number,
    estado: EstadoPedido,
    fechaCreacion: Date,
    precioBase: number,
    totalImpuestos: number,
    totalAdicionales: number,
    total: number,
    descuento: number,
    tipoCliente: string
  ) {
    this.id = id;
    this.dniOCuitCliente = dniOCuitCliente;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.precioBase = precioBase;
    this.totalImpuestos = totalImpuestos;
    this.totalAdicionales = totalAdicionales;
    this.total = total;
    this.descuento = descuento;
    this.tipoCliente = tipoCliente;
  }

  static getCamposFormulario(item?: Pedido): CamposFormulario[] {
    let campos = [];
    let valores: [string];
    if (item) {
      valores = [item.estado];
    } else {
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
          EstadoPedido.PENDIENTE,
        ],
        required: true,
      },
    ];
    return campos;
  }



  static getColumnasTabla(){
    let columnas: any[]
    return columnas  = [
      {
        propiedad: 'id',
        nombre: 'ID'
      },
      {
        propiedad: 'fechaCreacion',
        nombre: 'Fecha de creación'
      },
      {
        propiedad: 'estado',
        nombre: 'Estado'
      },
      {
        propiedad: 'precioBase',
        nombre: 'Subtotal'
      },
      {
        propiedad: 'totalImpuestos',
        nombre: 'Total impuestos'
      },
      {
        propiedad: 'totalAdicionales',
        nombre: 'Total adicionales'
      },
      {
        propiedad: 'descuento',
        nombre: 'Total descuento'
      },
      {
        propiedad: 'total',
        nombre: 'Total'
      }
    ]
  }
}
