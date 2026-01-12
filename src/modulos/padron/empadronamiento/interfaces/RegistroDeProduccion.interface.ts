export interface RegistroDeProduccion {
  idSectorAgroalimentario:        number | null;  
  idCicloAgricola:                number | null;  
  claveUpp:                       string | null;

  principalesCultivos:[{
    idDetalleRegistroProduccion:  number | null;
    idCultivoEspecie :            number | null;  
    idTipoCultivo :               number | null;  
    idRegimenHidrico:             number | null;
    superficie:                   string | null;
    numeroVientresColmenas:       number | null;
    totalCabezasHato:             number | null;
    volumenProduccion:            string | null;
    valorProduccion:              string | null;
    precioCultivoEspecie:         number | null;
  }]
}





