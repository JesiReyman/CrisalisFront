import { TipoAdicional } from './TipoAdicional.enum';
import { AplicaAdicional } from './aplicaAdicional.enum';
import { CamposFormulario } from "./CamposFormulario";

export class Adicional {
  nombre: string;
  porcentaje: number;
  aplica: string;
  tipo: string;

  constructor(nombre: string, porcentaje: number, aplica: string, tipo: string) {
    this.nombre = nombre;
    this.porcentaje = porcentaje;
    this.aplica = aplica;
    this.tipo = tipo;
  }

  static getCamposFormulario(item?: Adicional): CamposFormulario[]{
    let campos = [];
    let valores : [string, number, string, string];
    if (item){
      valores = [item.nombre, item.porcentaje, item.aplica, item.tipo];
    } else{
      valores = ['', 0, '', ''];
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
          AplicaAdicional.TODO,
          AplicaAdicional.PRODUCTO,
          AplicaAdicional.SERVICIO
        ],
        required: true,
      },
      {
        key: 'tipo',
        value: valores[3],
        label: 'Tipo:',
        type: 'text',
        options: [
          TipoAdicional.ADICIONAL,
          TipoAdicional.IMPUESTO,
          TipoAdicional.DESCUENTO
        ],
        required: true,
      },

    ];
    return campos;
  }
}
