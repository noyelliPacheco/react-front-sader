import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface ProductionCenter {
  id: string
  propertyRegime: string
  legalDocType: string
  state: string
  municipality: string
  locality: string
  latitude: string
  longitude: string
}

export const CentroProductivo = () => {

  const [productionCenters, setProductionCenters] = useState<ProductionCenter[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCenter, setEditingCenter] = useState<ProductionCenter | null>(null)

  const [centerFormData, setCenterFormData] = useState<Omit<ProductionCenter, "id">>({
    propertyRegime: "",
    legalDocType: "",
    state: "",
    municipality: "",
    locality: "",
    latitude: "",
    longitude: "",
  })

  const handleAddCenter = () => {
    const newCenter: ProductionCenter = {
      id: Date.now().toString(),
      ...centerFormData,
    }
    setProductionCenters([...productionCenters, newCenter])
    resetForm()
    setIsDialogOpen(false)
  }

  const handleEditCenter = (center: ProductionCenter) => {
    setEditingCenter(center)
    setCenterFormData({
      propertyRegime: center.propertyRegime,
      legalDocType: center.legalDocType,
      state: center.state,
      municipality: center.municipality,
      locality: center.locality,
      latitude: center.latitude,
      longitude: center.longitude,
    })
    setIsDialogOpen(true)
  }

  const handleUpdateCenter = () => {
    if (editingCenter) {
      setProductionCenters(
        productionCenters.map((center) =>
          center.id === editingCenter.id ? { ...centerFormData, id: editingCenter.id } : center,
        ),
      )
      resetForm()
      setIsDialogOpen(false)
      setEditingCenter(null)
    }
  }

  const handleDeleteCenter = (id: string) => {
    setProductionCenters(productionCenters.filter((center) => center.id !== id))
  }

  return (
    <>
    {/* Centros Productivos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-guinda-160">Centros Productivos</CardTitle>
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => {
                setIsDialogOpen(open)
                if (!open) resetForm()
              }}
            >
              <DialogTrigger asChild>
                <Button className="bg-guinda-160 hover:bg-guinda-150">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Centro
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-guinda-160">
                    {editingCenter ? "Editar" : "Agregar"} Centro Productivo
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="propertyRegime">Régimen de Propiedad *</Label>
                      <Select
                        value={centerFormData.propertyRegime}
                        onValueChange={(value) => setCenterFormData({ ...centerFormData, propertyRegime: value })}
                      >
                        <SelectTrigger id="propertyRegime">
                          <SelectValue placeholder="Seleccione régimen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="privada">Privada</SelectItem>
                          <SelectItem value="ejidal">Ejidal</SelectItem>
                          <SelectItem value="comunal">Comunal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="legalDocType">Tipo de Documento Legal *</Label>
                      <Select
                        value={centerFormData.legalDocType}
                        onValueChange={(value) => setCenterFormData({ ...centerFormData, legalDocType: value })}
                      >
                        <SelectTrigger id="legalDocType">
                          <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="escritura">Escritura Pública</SelectItem>
                          <SelectItem value="certificado">Certificado Parcelario</SelectItem>
                          <SelectItem value="contrato">Contrato de Arrendamiento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="centerState">Estado *</Label>
                      <Select
                        value={centerFormData.state}
                        onValueChange={(value) => setCenterFormData({ ...centerFormData, state: value })}
                      >
                        <SelectTrigger id="centerState">
                          <SelectValue placeholder="Seleccione estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jalisco">Jalisco</SelectItem>
                          <SelectItem value="michoacan">Michoacán</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="centerMunicipality">Municipio *</Label>
                      <Select
                        value={centerFormData.municipality}
                        onValueChange={(value) => setCenterFormData({ ...centerFormData, municipality: value })}
                      >
                        <SelectTrigger id="centerMunicipality">
                          <SelectValue placeholder="Seleccione municipio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mun1">Municipio 1</SelectItem>
                          <SelectItem value="mun2">Municipio 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="centerLocality">Localidad *</Label>
                      <Select
                        value={centerFormData.locality}
                        onValueChange={(value) => setCenterFormData({ ...centerFormData, locality: value })}
                      >
                        <SelectTrigger id="centerLocality">
                          <SelectValue placeholder="Seleccione localidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loc1">Localidad 1</SelectItem>
                          <SelectItem value="loc2">Localidad 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="centerLatitude">Latitud *</Label>
                      <Input
                        id="centerLatitude"
                        value={centerFormData.latitude}
                        onChange={(e) => setCenterFormData({ ...centerFormData, latitude: e.target.value })}
                        placeholder="Ej: 19.432608"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="centerLongitude">Longitud *</Label>
                      <Input
                        id="centerLongitude"
                        value={centerFormData.longitude}
                        onChange={(e) => setCenterFormData({ ...centerFormData, longitude: e.target.value })}
                        placeholder="Ej: -99.133209"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false)
                        resetForm()
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={editingCenter ? handleUpdateCenter : handleAddCenter}
                      className="bg-guinda-160 hover:bg-guinda-150"
                    >
                      {editingCenter ? "Actualizar" : "Agregar"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {productionCenters.length === 0 ? (
            <p className="py-8 text-center text-neutro-600">
              No hay centros productivos registrados. Haga clic en "Agregar Centro" para comenzar.
            </p>
          ) : (
            <div className="space-y-4">
              {productionCenters.map((center) => (
                <div
                  key={center.id}
                  className="flex items-start justify-between rounded-lg border border-neutro-200 p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-guinda-160">
                      {center.state} - {center.municipality}
                    </p>
                    <p className="text-sm text-neutro-600">
                      Régimen: {center.propertyRegime} | Doc: {center.legalDocType}
                    </p>
                    <p className="text-sm text-neutro-600">
                      Coordenadas: {center.latitude}, {center.longitude}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditCenter(center)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteCenter(center.id)}>
                      <Trash2 className="h-4 w-4 text-mistake" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
function resetForm() {
    throw new Error("Function not implemented.")
}

