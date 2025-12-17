export interface RegistroDeProduccion {
  idSectorAgroalimentario: number;
  idCultivosEspecies : number |"";  
  idTipoCultivo : number;  
  superficie: string |"";
  claveUppPsg: string |"";
  cantidadVientresColmenas: string |"";
  cantidadCabezas: number |"";
  volumenProduccion: string |"";
  valorProduccion: string |"";
  precioCultivo:number;
  precioCultivoEspecie: number;
  regimenHidrico: number;
}





