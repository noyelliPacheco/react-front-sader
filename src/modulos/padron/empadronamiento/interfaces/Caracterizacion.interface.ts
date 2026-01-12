export interface Caracterizacion {
  perteneceAsociacionCampesina: string | '';
  // idAsociacion?: number | '';
  asociacionCampesina?: string | '';
  idRegimenPropiedad: number | null;

  discapacidad: string | '';
  idTipoDiscapacidad: number | null;
  idNivelEstudios: number | null;
  hablaEspanol: string | '';
  lenguaIndigena:string ;

  declaratoriaIndigena: string | '';
  idTipoDeclaratoriaIndigena: number | null;
}