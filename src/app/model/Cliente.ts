export class Cliente {
  nombre: string;
  apellido?: string;
  dniOCuit: number;

  constructor(nombre: string, dniOCuit: number, apellido?: string){
    this.nombre = nombre;
    this.dniOCuit = dniOCuit;
    this.apellido = apellido;
  }
}
