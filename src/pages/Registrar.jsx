import clienteAxios from '../config/clienteAxios';

import { useState } from 'react';
import {Link} from 'react-router-dom'
import { Alerta } from '../components/Alerta';

export const Registrar = () => {

  const [user, setUser] = useState({});
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  //Capturar los datos de los input
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }


  //Mandar el formulario
  const handleSubmit = async(e) => {
    e.preventDefault();

    //Comprobar que los campos no esten vacios
    if([user.nombre, user.email, user.password, repetirPassword].includes(undefined)) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }


    //que los password sean iguales
    if(user.password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      });
      return
    }

    //el tamaño del password
    if(user.password.length < 6) {
      setAlerta({
        msg: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      });

      return;
    }

    setAlerta({});

    //crear el usuario en la API
    try {
      const {data} = await clienteAxios.post(`/usuarios`, user);
      setAlerta({
        msg: data.msg,
        error: false
      });

      setUser({});
      setRepetirPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Crea tu cuenta y administra tus <span className="text-slate-700">proyectos</span></h1>


      {
        alerta.msg && <Alerta alerta={alerta}/>
      }

      <form className="my-10 bg-white shadow-md rounded-lg p-10" onSubmit={handleSubmit}>

      <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
          <input type="text" placeholder="Tu Nombre" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="nombre"
            name='nombre'
            onChange={handleChange}
            value={user.nombre ? user.nombre : ''}
          />
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de Regístro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            name='email'
            onChange={handleChange}
            value={user.email ? user.email : ''}
          />
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
          <input type="password" placeholder="Password de Regístro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password"
            name='password'
            onChange={handleChange}
            value={user.password ? user.password : ''}
          />
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir Password</label>
          <input type="password" placeholder="repetir tu password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="password2"
            onChange={ e =>  setRepetirPassword(e.target.value)}
            value={repetirPassword}
          />
        </div>

        <input 
          type="submit"
          value={'Crear Cuenta'}
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-800 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to={'/'} className='block text-center my-5 text-slate-500 uppercase text-sm'>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to={'/olvide-password'} className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvide mi Password</Link>
        
      </nav>
    </>
  )
}
