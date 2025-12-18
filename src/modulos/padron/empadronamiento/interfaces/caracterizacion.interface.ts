export interface Caracterizacion {
  perteneceAsociacionCampesina: string | '';
  // idAsociacion?: number | '';
  asociacionCampesina?: string | '';
  idRegimenPropiedad: number | '';

  discapacidad: string | '';
  idTipoDiscapacidad: number | '';
  idNivelEstudios: number | '';
  hablaEspanol: string | '';
  lenguaIndigena:number | undefined;

  declaratoriaIndigena: string | '';
  idTipoDeclaratoriaIndigena: number | '';
}