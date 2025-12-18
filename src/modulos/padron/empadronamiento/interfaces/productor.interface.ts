import type { Caracterizacion } from "./caracterizacion.interface";
import type {  CentroProduccion } from "./centroProducccion.interface";
import type { Domicilio } from "./domicilio.interface";
import type { Expediente } from "./expediente.interface";
import type { Personal } from "./personal.interface";
import type { RegistroDeProduccion } from "./registroDeProduccion.interface";


export interface Productor {
    personal: Personal;
    idPersona: number|undefined;
    domicilio : Domicilio;
    registroDeProduccion : RegistroDeProduccion;
    caracterizacion : Caracterizacion;
    expediente : Expediente;
    unidadProduccion : CentroProduccion[];
    folio?: string;
}

