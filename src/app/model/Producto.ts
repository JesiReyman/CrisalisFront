import { CamposFormulario } from './CamposFormulario';
export class Producto {
  nombre: string;
  descripcion: string;
  precioBase: number;
  stock: number;

  constructor(nombre: string, descripcion: string, precioBase: number, stock: number){
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.stock = stock;
  }

  static getCamposFormulario(): CamposFormulario[]{
    let campos = [];
    campos = [
      {
        key: 'nombre',
        value: '',
        label: 'Nombre de producto',
        type: 'text',
        required: true,
      },
      {
        key: 'descripcion',
        value: '',
        label: 'Descripción',
        type: 'text',
        required: false,
      },
      {
        key: 'precioBase',
        value: '',
        label: 'Precio Base',
        type: 'number',
        required: true,
      },
      {
        key: 'stock',
        value: '',
        label: 'Stock',
        type: 'number',
        required: true,
        pattern: '^[0-9]*$'
      },

    ];
    return campos;
  }
}
