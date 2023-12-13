import { FormularioProyecto } from "../components/FormularioProyecto"


export const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>

      <div className="mt-10 md:flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}
