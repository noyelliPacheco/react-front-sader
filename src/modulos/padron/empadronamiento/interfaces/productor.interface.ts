import type { Caracterizacion } from "./Caracterizacion.interface";
import type { CentroProduccion } from "./centrosProducccion.interface";
import type { Domicilio } from "./Domicilio.interface";
import type { Expediente } from "./Expediente.interface";
import type { Personal } from "./Personal.interface";
import type { RegistroDeProduccion } from "./RegistroDeProduccion.interface";


export interface Productor {
    personal: Personal;
    domicilio : Domicilio;
    registroDeProduccion : RegistroDeProduccion;
    caracterizacion : Caracterizacion;
    expediente : Expediente;
    centroProduccion : CentroProduccion[];
}

