import { CamposFormulario } from "./CamposFormulario";

export class Servicio {
  nombre: string;
  descripcion: string;
  precioBase: number;
  precioSoporte: number;

  constructor(nombre: string, descripcion: string, precioBase:number, precioSoporte: number) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.precioSoporte = precioSoporte;
  }

  static getCamposFormulario(item?: Servicio): CamposFormulario[]{
    let campos = [];
    let valores : [string, string, number, number];
    if (item){
      valores = [item.nombre, item.descripcion, item.precioBase, item.precioSoporte];
    } else{
      valores = ['', '', 0, 0];
    }
    campos = [
      {
        key: 'nombre',
        value: valores[0],
        label: 'Nombre del servicio',
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
        key: 'precioSoporte',
        value: valores[3],
        label: 'Precio de soporte',
        type: 'number',
        required: true,
        pattern: '[0-9]+(\.[0-9][0-9]?)?'
      },

    ];
    return campos;
  }
}
