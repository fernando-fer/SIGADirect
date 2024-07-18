import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

//<li><Link to="../CargaAlm">Carga Alumnos</Link></li>
const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../sesionDic">Inicio</Link></li>  
         <li><Link to="../DiaEventDir">Diario de Eventos</Link></li>
        <li><Link to="../ExpedientesDir">Expedientes</Link></li>
        <li><Link to="../CargaAlumnosDir">Carga Alumnos</Link></li>
        <li><Link to="../AlumnosDir">Alumnos</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
