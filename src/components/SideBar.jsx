import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const SideBar = () => {

  const {auth} = useAuth();
  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10 '>
      <p className='text-xl font-bold'>Hola: {auth.nombre}</p>

      <Link
      to={'crear-proyecto'}
        className='bg-sky-600 w-full p-3 text-white mt-5 block text-center font-bold uppercase rounded-lg'
        >Nuevo Proyecto</Link>
    </aside>
  )
}
