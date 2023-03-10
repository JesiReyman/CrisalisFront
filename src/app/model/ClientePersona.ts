import { CamposFormulario } from "./CamposFormulario";

export class ClientePersona {
  nombre: string;
  apellido: string;
  dniOCuit: number;

  constructor(nombre: string, apellido: string, dni: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dniOCuit = dni;
  }

  static getCamposFormulario(item?: ClientePersona): CamposFormulario[]{
    let campos = [];
    let valores : [string, string, number];
    if (item){
      valores = [item.nombre, item.apellido, item.dniOCuit];
    } else{
      valores = ['', '', 0];
    }
    campos = [
      {
        key: 'nombre',
        value: valores[0],
        label: 'Nombre',
        type: 'text',
        required: true,
      },
      {
        key: 'apellido',
        value: valores[1],
        label: 'Apellido',
        type: 'text',
        required: false,
      },
      {
        key: 'dniOCuit',
        value: valores[2],
        label: 'DNI',
        type: 'number',
        required: true,
        pattern: '^[0-9]*$'
      },

    ];
    return campos;
  }
}
