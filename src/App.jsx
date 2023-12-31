import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { RutaProtegida } from './layout/RutaProtegida';

import { Login } from './pages/Login';
import { Registrar } from './pages/Registrar';
import { OlvidePassword } from './pages/OlvidePassword';
import { NuevoPassword } from './pages/NuevoPassword';
import { ConfirmarCuenta } from './pages/ConfirmarCuenta';
import { Proyectos } from './pages/Proyectos';
import { NuevoProyecto } from './pages/NuevoProyecto';

import { AuthProvider } from './context/AuthProvider';
import { ProyectosProvider } from './context/ProyectosProvider';


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          
          <Routes>
            {/**Area publica */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            {/**Area Privada */}
            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto />} />
            </Route>
          </Routes>

        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
