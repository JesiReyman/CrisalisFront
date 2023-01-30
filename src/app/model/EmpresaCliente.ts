import { ClientePersona } from './ClientePersona';
import { CamposFormulario } from "./CamposFormulario";

export class EmpresaCliente {
  razonSocial: string;
  fechaInicio: Date;
  dniOCuit: number;
  dniPersona: number;

  constructor(razonSocial: string, fechaInicio: Date, cuit: number, dniPersona: number) {
    this.razonSocial = razonSocial;
    this.fechaInicio = fechaInicio;
    this.dniOCuit = cuit;
    this.dniPersona = dniPersona;

  }

  static getCamposFormulario(item?: EmpresaCliente): CamposFormulario[]{
    let campos = [];
    let valores : [string, Date, number];
    if (item){
      valores = [item.razonSocial, item.fechaInicio, item.dniOCuit];
    } else{
      valores = ['', new Date(), 0];
    }
    campos = [
      {
        key: 'razonSocial',
        value: valores[0],
        label: 'Razón Social',
        type: 'text',
        required: true,
      },
      {
        key: 'fechaInicio',
        value: valores[1],
        label: 'Fecha de inicio de actividades',
        type: 'date',
        required: false,
      },
      {
        key: 'dniOCuit',
        value: valores[2],
        label: 'CUIT',
        type: 'number',
        required: true,
        pattern: '^[0-9]*$'
      },


    ];
    return campos;
  }
}
