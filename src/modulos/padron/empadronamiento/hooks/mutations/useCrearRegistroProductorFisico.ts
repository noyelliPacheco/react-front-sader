import { useMutation } from "@tanstack/react-query";
import { crearRegistroProductorFisico } from "./../../actions/obtener-productor.actions"; // ajusta la ruta
import type { ProductorCreateResponse,  } from "../../interfaces/response/productorFisico.response";
import type { Productor } from "../../interfaces/productor.interface";

export const useCrearRegistroProductorFisico = () => {
  return useMutation<ProductorCreateResponse, unknown, Productor>({
    mutationFn: (formProductor) => crearRegistroProductorFisico(formProductor),
  });
};
