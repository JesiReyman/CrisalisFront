import { CamposFormulario } from './CamposFormulario';
export class Producto {
  nombre: string;
  descripcion: string;
  precioBase: number;
  stock: number;
  tipo: string;

  constructor(nombre: string, descripcion: string, precioBase: number, stock: number, tipo: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.stock = stock;
    this.tipo = tipo;
  }

  static getCamposFormulario(item?: Producto): CamposFormulario[]{
    let campos = [];
    let valores : [string, string, number, number];
    if (item){
      valores = [item.nombre, item.descripcion, item.precioBase, item.stock];
    } else{
      valores = ['', '', 0, 0];
    }
    campos = [
      {
        key: 'nombre',
        value: valores[0],
        label: 'Nombre de producto',
        type: 'text',
        required: true,
      },
      {
        key: 'descripcion',
        value: valores[1],
        label: 'Descripción',
        type: 'text',
        required: false,
      },
      {
        key: 'precioBase',
        value: valores[2],
        label: 'Precio de Lista',
        type: 'number',
        required: true,
        pattern: '[0-9]+(\.[0-9][0-9]?)?'
      },
      {
        key: 'stock',
        value: valores[3],
        label: 'Stock',
        type: 'number',
        required: true,
        pattern: '^[0-9]*$'
      },

    ];
    return campos;
  }
}
