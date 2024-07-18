// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import Inicio from './Views/Inicio';
import Header from './Views/Header';
import Footer from './Views/Footer';
import Login from './Views/Login';
import Registro from './Views/Registro';
import Restauracion from './Views/Restauracion';
import Bitacoras from './Views/Bitacoras';
import Boletin from './Views/Boletin';
import Calendario from './Views/Calendarios';
import AcercaDe from './Views/AcercaDe';
import Sesion from './Views/sesion';
import SesionAd from './Views/sesionAd';
import TableExp from './Views/TablaExp';

import MenuAd from './Views/Repo/MenuAd';
import Expedientes from './Views/Repo/TBL/expedientes';
import ErrorHandler from './Views/ErrorHandler';
import PageTransition from './Views/PageTransition'; // Importa el componente de transición
import Rest from './Views/ResetPasswordForm';
import IMG404 from './IMG/404.png';
import ValidarUsuario from './Views/ValidarUsuario';
import ResponderPregunta from './Views/ResponderPregunta';
import RestaurarContraseña from './Views/RestaurarContraseña';

import SessionTimeoutHandler from './Views/SessionTimeoutHandler';
import ProtectedRoute from './Views/ProtectedRoute';
import ViewsBit from './Views/ViewsBittacoras';

import CargaAct from './Views/cargar';
import DownAct from './Views/actDoc';


//Cargos

//Admin
import SesionAdmin from './CARGOS/Admin/sesionAdmin';
import DiaEvent from './CARGOS/Admin/DiarioEvent'
import UserControl from './CARGOS/Admin/UserAcceso';
import CargaAlumnos from './CARGOS/Admin/CargaAlumnos';
import TablaAlumnos from './CARGOS/Admin/TablaAlm';

//Directivos
import SesionDic from './CARGOS/Directivos/sesionDic';
import DiaEventDir from './CARGOS/Directivos/DiarioEventDir';
import ExpedientesDir from './CARGOS/Directivos/expedientesDir';
import CargaAlumnosDir from './CARGOS/Directivos/CargaAlumnosDir';
import AlumnosDir from './CARGOS/Directivos/AlumnosDir';


//Administrativo

//Docente
import SesionD from './CARGOS/Docentes/sesionD';
import Acti from './CARGOS/Docentes/Acti';

//Secretario
import SesionS from './CARGOS/Secretario/sesionS';
import ExpS from './CARGOS/Secretario/TablaExpS';
import ExpedientesS from './CARGOS/Secretario/expedientesS';


import { useLocalStorage } from 'react-use';



const NotFound = () => (
  <div>
    <center>
      <Header />
      <h2>¡Ooops!</h2>
      <h1>¡Error 404!</h1>
      <h3>La página que estás buscando no se encuentra en el servidor.</h3>
      <img src={IMG404} alt="Error 404" style={{ maxWidth: '100%', height: 'auto' }} />
    </center>
  </div>
);

const App = () => {
  const [user, setUser] = useLocalStorage('user');
  // milis por 60 para obtener minutos * la cantidad de minutos
  const TIMEOUT_DURATION = 1000 * 60 * 5;
  console.log("CSP activo");

  return (
    <body>
      <Router>
        <SessionTimeoutHandler timeoutDuration={TIMEOUT_DURATION} />
        <Helmet>
        <meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; 
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' https://www.google.com https://www.gstatic.com data:; 
    font-src 'self'; 
    connect-src 'self' https://sigaemail.host8b.me http://localhost; 
    frame-src 'self' https://www.google.com;" />


        </Helmet>
        <ErrorHandler>
          <TransitionGroup>
            <CSSTransition key={window.location.key} classNames="fade" timeout={300}>
              <Routes>
                <Route path="/" element={<PageTransition><Inicio /></PageTransition>} />
                <Route path="/Login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/Registro" element={<PageTransition><Registro /></PageTransition>} />
                <Route path="/Restauracion" element={<PageTransition><Restauracion /></PageTransition>} />
                <Route path="/Bitacoras" element={<PageTransition><Bitacoras /></PageTransition>} />
                <Route path="/Boletin" element={<PageTransition><Boletin /></PageTransition>} />
                <Route path="/Calendario" element={<PageTransition><Calendario /></PageTransition>} />
                <Route path="/AcercaDe" element={<PageTransition><AcercaDe /></PageTransition>} />

                <Route path="/ValidarUsuario" element={<ValidarUsuario />} />
                <Route path="/ResponderPregunta/:usuario" element={<ResponderPregunta />} />
                {/*INICIA - RUTAS PROTEGIDAS */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/RestaurarContrasena/:usuario" element={<PageTransition><RestaurarContraseña /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/sesion" element={<PageTransition><Sesion /></PageTransition>} />
                </Route>



                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/sesionD" element={<PageTransition><SesionD /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/SesionS" element={<PageTransition><SesionS /></PageTransition>} />
                </Route>
                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/SesionDic" element={<PageTransition><SesionDic /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/ExpS" element={<PageTransition><ExpS /></PageTransition>} />
                </Route>

                
                

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/sesionAd" element={<PageTransition><SesionAd /></PageTransition>} />
                </Route>


                
                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/SesionAdmin" element={<PageTransition><SesionAdmin /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/DiaEvent" element={<PageTransition><DiaEvent /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/DiaEventDir" element={<PageTransition><DiaEventDir /></PageTransition>} />
                </Route>


                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/ExpedientesDir" element={<PageTransition><ExpedientesDir /></PageTransition>} />
                </Route>


                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/CargaAlumnosDir" element={<PageTransition><CargaAlumnosDir /></PageTransition>} />
                </Route>

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/AlumnosDir" element={<PageTransition><AlumnosDir /></PageTransition>} />
                </Route>



                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/Acti" element={<PageTransition><Acti /></PageTransition>} />
                </Route>



                





                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/TablaExp" element={<PageTransition><TableExp /></PageTransition>} />
                </Route>


                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/TablaAlumnos" element={<PageTransition><TablaAlumnos /></PageTransition>} />
                </Route>



                <Route path="/CargaAct" element={<PageTransition><CargaAct /></PageTransition>} />

                <Route path="/DownAct" element={<PageTransition><DownAct /></PageTransition>} />



                {/*FIN - 
                
                
                 /<Route element={<ProtectedRoute canActivate={user} />}>
                 // <Route path="/CargaAlm" element={<PageTransition><CargaAlm /></PageTransition>} />
                </Route>
                
                RUTAS PROTEGIDAS */}

                /<Route element={<ProtectedRoute canActivate={user} />}>
                 // <Route path="/CargaAlumnos" element={<PageTransition><CargaAlumnos /></PageTransition>} />
                </Route>

                <Route path="/Rest" element={<PageTransition><Rest /></PageTransition>} />

                <Route element={<ProtectedRoute canActivate={user} />}>
                  <Route path="/MenuAd" element={<PageTransition><MenuAd /></PageTransition>} />
                </Route>
                {/*FIN - RUTAS PROTEGIDAS */}
                <Route path="/expedientes" element={<PageTransition><Expedientes /></PageTransition>} />

                {/*FIN - RUTAS PROTEGIDAS */}
                <Route path="/expedientesS" element={<PageTransition><ExpedientesS /></PageTransition>} />

                <Route path="/UserControl" element={<PageTransition><UserControl /></PageTransition>} />

                <Route path="/ViewsBit" element={<PageTransition><ViewsBit /></PageTransition>} />

                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </ErrorHandler>
      </Router>
    </body>
  );
};

export default App;

