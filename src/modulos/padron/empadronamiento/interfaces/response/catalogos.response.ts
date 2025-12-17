import type { Catalogo } from "./../catalogo.interface";

export interface CatalogoResponse{
    message: string;
    success: boolean;
    data:    Catalogo[] | [];
    code:    number;
}

