export interface RegistroDeProduccion {
  idSectorAgroalimentario: number;  
  idCicloAgricola:number;
  claveUpp: string |"";

  principalesCultivos:[{
    idCultivoEspecie : number |"";  
    idTipoCultivo : number;  
    superficie: string |"";
    numeroVientresColmenas: string |"";
    totalCabezasHato: number |"";
    volumenProduccion: string |"";
    valorProduccion: string |"";
    precioCultivoEspecie: number;
    regimenHidrico: number;
  }]
}





