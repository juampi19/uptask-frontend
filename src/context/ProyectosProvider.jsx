/* eslint-disable react/prop-types */
import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/clienteAxios'


const ProyectosContext = createContext();


const ProyectosProvider = ({children}) => {

  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});


  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export {
  ProyectosProvider
}

export default ProyectosContext;