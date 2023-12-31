import clienteAxios from '../config/clienteAxios';

import { useState } from 'react';
import {Link} from 'react-router-dom';
import { Alerta } from '../components/Alerta';

export const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});



  const handleSubmit = async(e) => {
    e.preventDefault();

    //Comprobar que el campo no este vacio
    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      });

      return;
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email});

      setAlerta({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos</span></h1>

      {alerta.msg && <Alerta alerta={alerta}/>}
      <form className="my-10 bg-white shadow-md rounded-lg p-10"
        onSubmit={handleSubmit}
      >

     

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de Regístro" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            id="email"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
        </div>

       

        <input 
          type="submit"
          value={'Enviar Instrucciones'}
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-800 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to={'/'} className='block text-center my-5 text-slate-500 uppercase text-sm'>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link to={'/registrar'} className='block text-center my-5 text-slate-500 uppercase text-sm'>¿No tienes una cuenta? Registrate</Link>
        
      </nav>
    </>
  )
}
