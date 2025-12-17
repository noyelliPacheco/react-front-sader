import  type { CatalogoResponse } from "./../response/catalogos.response";

export const DocumentoExpedienteDummy:CatalogoResponse = {
    message: 'Consulta exitosa.',
    success: true,
    data:    [{
        id: 1,
        nombre : 'Credencial de elector vigente',
        clave : 'INE/IFE actualizada',
        }, {
            id: 2,
            nombre : 'Comprobante de domicilio',
            clave : 'No mayor a 3 meses',
        }, {
            id: 3,
            nombre : 'Documento legal',
            clave : 'Acta constitutiva',
        }, {
            id: 4,
            nombre : 'Documento de arrendatario',
            clave : 'Contrato vigente',
        }, {
            id: 5,
            nombre : 'Inscripción al padrón ganadero',
            clave : 'Formato oficial',
        }, {
            id: 6,
            nombre : 'Permiso de pescA',
            clave : 'Licencia vigente',
        },
    ],
    code:    200,
}