import useProyectos from "../hooks/useProyectos"



export const Proyectos = () => {

  const {proyectos} = useProyectos();


  return (
    <>
      <h1 className="text-4xl font-black">Proyecto</h1>

      <div></div>
    </>
  )
}
