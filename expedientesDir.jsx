import React, { useState, useEffect } from 'react';

import '../css/table.css';
import '../css/search.css';
import pdfimg from './PDF.png';
import ExpedienteRe from './RegistroExpDir';



const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [cicloEsc, setCicloEsc] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [exp, setExp] = useState('');

  const Grado = ['1', '2', '3'];
  const Grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const Exp = ['BOLETA', 'CERTIFICADO', 'CONSTANCIA'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cicloEsc, grado, grupo, exp });
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label>Ciclo Escolar: </label>
            <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />

            <label>Grado: </label>
            <select value={grado} onChange={(e) => setGrado(e.target.value)}>
              <option value="">Seleccione el Grado</option>
              {Grado.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Grupo: </label>
            <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
              <option value="">Seleccione el Grupo</option>
              {Grupo.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Expediente: </label>
            <select value={exp} onChange={(e) => setExp(e.target.value)}>
              <option value="">Seleccione el Expediente</option>
              {Exp.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button type="submit">Buscar</button>
          </form>
        </div>
      </div>
    )
  );
};

const EditModal = ({ isOpen, onClose, expediente, onSubmit }) => {
  const [Clave, setClave] = useState(expediente ? expediente.Clave : '');
  const [cicloEsc, setCicloEsc] = useState(expediente ? expediente.cicloEsc : '');
  const [Alumno, setAlumno] = useState(expediente ? expediente.Alumno : '');
  const [grado, setGrado] = useState(expediente ? expediente.Grado : '');
  const [grupo, setGrupo] = useState(expediente ? expediente.Grupo : '');
  const [exp, setExp] = useState(expediente ? expediente.Expediente : '');
  const [Resguardo, setResguardo] = useState(expediente ? expediente.Resguardo : '');
  const [Caja, setCaja] = useState(expediente ? expediente.Caja : '');

  useEffect(() => {
    if (expediente) {
      setClave(expediente.Clave);
      setCicloEsc(expediente.cicloEsc);
      setAlumno(expediente.Alumno);
      setGrado(expediente.Grado);
      setGrupo(expediente.Grupo);
      setExp(expediente.Expediente);
      setResguardo(expediente.Resguardo);
      setCaja(expediente.Caja);
    }
  }, [expediente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...expediente, idexp: expediente.idexp, Clave, cicloEsc, Alumno, grado, grupo, exp, Resguardo, Caja });
    onClose();
  };

  return (
    isOpen && expediente && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label>Clave: </label>
            <input type="text" value={Clave} onChange={(e) => setClave(e.target.value)} />

            <label>Ciclo Escolar: </label>
            <input type="text" value={cicloEsc} onChange={(e) => setCicloEsc(e.target.value)} />

            <label>Alumno: </label>
            <input type="text" value={Alumno} onChange={(e) => setAlumno(e.target.value)} />

            <label>Grado: </label>
            <select value={grado} onChange={(e) => setGrado(e.target.value)}>
              <option value="">Seleccione el Grado</option>
              {[1, 2, 3].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Grupo: </label>
            <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
              <option value="">Seleccione el Grupo</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Expediente: </label>
            <select value={exp} onChange={(e) => setExp(e.target.value)}>
              <option value="">Seleccione el Expediente</option>
              {['BOLETA', 'CERTIFICADO', 'CONSTANCIA'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label>Resguardo: </label>
            <input type="text" value={Resguardo} onChange={(e) => setResguardo(e.target.value)} />

            <label>Caja: </label>
            <input type="text" value={Caja} onChange={(e) => setCaja(e.target.value)} />

            <button type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    )
  );
};

const Expedientes = () => {
  const [expedientes, setExpedientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('Todos');
  const [filteredExpedientes, setFilteredExpedientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    fetch('https://sigaemail.host8b.me/expedientes.php')
      .then(response => response.json())
      .then(data => {
        setExpedientes(data);
        setFilteredExpedientes(data);
      })
      .catch(error => console.error('Error al obtener los expedientes de la tabla:', error));
  }, []);

  const handleSearch = () => {
    const filtered = expedientes.filter(expediente => {
      if (searchField === 'Todos') {
        return Object.values(expediente).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return expediente[searchField].toString().toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredExpedientes(filtered);
  };

  const handleOpenAdvancedSearch = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = (expediente) => {
    setSelectedExpediente(expediente);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setMissingFields([]);
  };

  const handleAdvancedSearchSubmit = ({ cicloEsc, grado, grupo, exp }) => {
    const filtered = expedientes.filter(expediente => {
      return (
        expediente.cicloEsc.includes(cicloEsc) &&
        expediente.Grado.includes(grado) &&
        expediente.Grupo.includes(grupo) &&
        expediente.Expediente.includes(exp)
      );
    });
    setFilteredExpedientes(filtered);
    handleCloseModal();
  };

  const handleEditSubmit = (updatedExpediente) => {
    console.log(updatedExpediente); // Añadimos el console.log para verificar los datos
    fetch('https://sigaemail.host8b.me/updateExpediente.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedExpediente)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        const updatedExpedientes = expedientes.map(exp => 
          exp.idexp === updatedExpediente.idexp ? updatedExpediente : exp
        );
        setExpedientes(updatedExpedientes);
        setFilteredExpedientes(updatedExpedientes);
        handleCloseEditModal();
      } else {
        console.error(data.error);
        if (data.missing_fields) {
          setMissingFields(data.missing_fields);
          console.error("Campos faltantes: ", data.missing_fields);
        }
      }
    })
    .catch(error => console.error('Error al actualizar el expediente:', error));
  };

  return (
    <div>
      <ExpedienteRe />

      <div>
        <h4>Buscador</h4>
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="Todos">Todos los datos</option>
          <option value="Alumno">Nombre del alumno</option>
          <option value="Clave">Clave</option>
          <option value="cicloEsc">Ciclo Escolar</option>
        </select>
        <input
          type="text"
          placeholder="Término de búsqueda..."
          value={searchTerm}
          onChange={(e) => { 
            setSearchTerm(e.target.value);
            handleSearch();
          }}
        />
        <br />
        <br />
        <button onClick={handleOpenAdvancedSearch}>Búsqueda Avanzada</button>
        <Modal isOpen={showModal} onClose={handleCloseModal} onSubmit={handleAdvancedSearchSubmit} />
      </div>
      {filteredExpedientes.length === 0 && <h1>No se encontraron resultados</h1>}
      <table>
        <thead>
          <tr>
            <th><center>Clave</center></th>
            <th><center>Ciclo Escolar</center></th>
            <th><center>Alumno</center></th>
            <th><center>Grado</center></th>
            <th><center>Grupo</center></th>
            <th><center>Expediente</center></th>
            <th><center>Resguardo</center></th>
            <th><center>Caja</center></th>
            <th><center>Visualizar Expediente</center></th>
            <th><center>Acciones</center></th>
          </tr>
        </thead>
        <tbody>
          {filteredExpedientes.map(expediente => (
            <tr key={expediente.idexp}>
              <td>{expediente.Clave}</td>
              <td>{expediente.cicloEsc}</td>
              <td>{expediente.Alumno}</td>
              <td>{expediente.Grado}</td>
              <td>{expediente.Grupo}</td>
              <td>{expediente.Expediente}</td>
              <td>{expediente.Resguardo}</td>
              <td>{expediente.Caja}</td>
              <td>
                <center>
                  <a href={`https://sigaemail.host8b.me/PDF/${expediente.archivo}`} target="_blank" rel="noopener noreferrer">
                    <img src={pdfimg} alt="pdfimg" style={{ alignItems: 'center', maxWidth: '10%' }} />
                  </a>
                </center>
              </td>
              <td>
                <p>
                  |  Solicitar  |  <span onClick={() => handleOpenEditModal(expediente)}>Actualizar</span>  |  Eliminar  |
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {missingFields.length > 0 && (
        <div style={{ color: 'red' }}>
          <h3>Campos faltantes:</h3>
          <ul>
            {missingFields.map(field => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
      <br />
      <EditModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        expediente={selectedExpediente}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default Expedientes;
