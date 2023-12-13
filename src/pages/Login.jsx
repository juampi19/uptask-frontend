import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { Alerta } from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

export const Login = () => {

  const [user, seTUser] = useState({});
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();


  //obtener los datos de los input
  const handleChange = (e) => {
    seTUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  //mandar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Comprobar que los campos no esten vacios
    if([user.email, user.password].includes(undefined)) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return;
    }

    try {
      const {data} = await clienteAxios.post('/usuarios/login', user);
      localStorage.setItem('token', data.token);
      setAlerta({});
      setAuth(data);
      navigate('/proyectos');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }
  

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Iniciar sesión y administra tus <span className="text-slate-700">proyectos</span></h1>

      {alerta.msg && <Alerta alerta={alerta}/>}
      <form className="my-10 bg-white shadow-md rounded-lg p-10"
        onSubmit={handleSubmit}
      >

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de Regístro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name='email'
            id="email"
            onChange={handleChange}
            value={user.email ? user.email : ''}
          />
        </div>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password</label>
          <input type="password" placeholder="Password de Regístro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name='password'
            id="password"
            value={user.password ? user.password : ''}
            onChange={handleChange}
          />
        </div>

        <input 
          type="submit"
          value={'Iniciar Sesión'}
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-800 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to={'registrar'} className='block text-center my-5 text-slate-500 uppercase text-sm'>¿No tienes una cuenta? Registrate</Link>
        <Link to={'olvide-password'} className='block text-center my-5 text-slate-500 uppercase text-sm'>Olvide mi Password</Link>
        
      </nav>
    </>
  )
}
