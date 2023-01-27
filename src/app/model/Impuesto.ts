import { AplicaImpuestos } from './aplicaImpuestos.enum';
import { CamposFormulario } from "./CamposFormulario";

export class Impuesto {
  nombre: string;
  porcentaje: number;
  aplica: string;

  constructor(nombre: string, porcentaje: number, aplica: string) {
    this.nombre = nombre;
    this.porcentaje = porcentaje;
    this.aplica = aplica;
  }

  static getCamposFormulario(item?: Impuesto): CamposFormulario[]{
    let campos = [];
    let valores : [string, number, string];
    if (item){
      valores = [item.nombre, item.porcentaje, item.aplica];
    } else{
      valores = ['', 0, ''];
    }
    campos = [
      {
        key: 'nombre',
        value: valores[0],
        label: 'Nombre del impuesto',
        type: 'text',
        required: true,
      },
      {
        key: 'porcentaje',
        value: valores[1],
        label: 'Porcentaje a aplicar',
        type: 'number',
        required: true,
      },
      {
        key: 'aplica',
        value: valores[2],
        label: 'Aplica a:',
        type: 'text',
        options: [
          AplicaImpuestos.TODOS,
          AplicaImpuestos.PRODUCTOS,
          AplicaImpuestos.SERVICIOS
        ],
        required: true,
      },

    ];
    return campos;
  }
}
