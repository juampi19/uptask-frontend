import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import { Alerta } from "./Alerta";

export const FormularioProyecto
  = () => {

    const { mostrarAlerta, alerta } = useProyectos();

    const [proyecto, setProyecto] = useState({});


    const handleChange = (e) => {
      setProyecto({
        ...proyecto,
        [e.target.name]: e.target.value
      })
    }


    const handleSubmit = (e) => {
      e.preventDefault()

      //Comprobar que los campos no esten vacios
      if ([proyecto.nombre, proyecto.descripcion, proyecto.fecha, proyecto.cliente].includes(undefined)) {
        mostrarAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        });
        return;
      }

      console.log(proyecto);
      mostrarAlerta({
        msg: 'Todo ok',
        error: false
      })
    }

    return (

      <form className="bg-white py-10 px-5 w-full md:w-2/3 rounded-lg shadow"
        onSubmit={handleSubmit}
      >

        {alerta.msg && <Alerta alerta={alerta} />}
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm"
          >Nombr Proyecto</label>

          <input
            type="text"
            className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
            id="nombre"
            name="nombre"
            placeholder="Nombre del Proyecto"
            onChange={handleChange}
            value={proyecto.nombre ? proyecto.nombre : ''}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold text-sm"
          >Descripción</label>

          <textarea

            className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
            id="descripcion"
            name="descripcion"
            placeholder="Descripción del Proyecto"
            onChange={handleChange}
            value={proyecto.descripcion ? proyecto.descripcion : ''}
          ></textarea>
        </div>

        <div className="my-5">
          <label
            htmlFor="fecha"
            className="text-gray-700 uppercase font-bold text-sm"
          >Fecha Entrega</label>

          <input
            type="date"
            className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
            id="fecha"
            name="fecha"
            onChange={handleChange}
            value={proyecto.fecha ? proyecto.fecha : ''}
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="cliente"
            className="text-gray-700 uppercase font-bold text-sm"
          >Cliente</label>

          <input
            type="text"
            className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
            id="cliente"
            name="cliente"
            placeholder="Cliente"
            onChange={handleChange}
            value={proyecto.cliente ? proyecto.cliente : ''}
          />
        </div>

        <input type="submit"
          value={'Crear Proyecto'}
          className="my-3 bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    )
  }
