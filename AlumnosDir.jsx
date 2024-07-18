import React, { useState, useEffect } from 'react';

import '../css/table.css';
import '../css/search.css';

const ListAlumnos = () => {
  const [alumnos, setAlumnos] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    // Realizar la solicitud al servicio web para obtener los datos de los alumnos
    fetch('https://sigaemail.host8b.me/ListAlumnos.php')
      .then(response => response.json())
      .then(data => {
        console.log('Datos de los alumnos:', data);
        setAlumnos(data); // Almacena los datos de los alumnos en el estado
      })
      .catch(error => console.error('Error al obtener los datos de los alumnos:', error));
  }, []);

  const handleSearch = () => {
    // Filtrar los alumnos según el término de búsqueda y el campo seleccionado
    const filtered = alumnos.filter(alumno => {
      if (searchField === 'curp') {
        return alumno.vchCurp.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchField === 'nombre') {
        return alumno.vchNombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return true; // Si no se selecciona un campo de búsqueda, mostrar todos los resultados
      }
    });

    setAlumnos(filtered);
  };

  return (
    <div className="alumnos-container">

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="curp">CURP</option>
          <option value="nombre">Nombre Completo</option>
        </select>
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {alumnos ? (
        <table>
          <thead>
            <tr>
              <th>CURP</th>
              <th>Nombre Completo</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno, index) => (
              <tr key={index}>
                <td>{alumno.vchCurp}</td>
                <td>{alumno.vchNombreCompleto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Cargando datos de los alumnos...</p>
      )}
    </div>
  );
};

export default ListAlumnos;
