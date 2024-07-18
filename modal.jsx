import React, { useState } from 'react';
const Modal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      clave: '',
      cicloEsc: '',
      alumno: '',
      grado: '',
      grupo: '',
      expediente: '',
      resguardo: '',
      caja: '',
      archivo: null,
    });

        const [errors, setErrors] = useState('');
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };
      
        const handleFileChange = (e) => {
          setFormData({ ...formData, archivo: e.target.files[0] });
        };
      
        const validateForm = () => {
            const {
              clave,
              cicloEsc,
              alumno,
              grado,
              grupo,
              expediente,
              resguardo,
              caja,
              archivo
            } = formData;
          
            if (
              !clave ||
              !cicloEsc ||
              !alumno ||
              !grado ||
              !grupo ||
              !expediente ||
              !resguardo ||
              !caja ||
              !archivo
            ) {
              setErrors('Favor de llenar todos los campos para realizar el registro.');
              return false;
            }
            return true;
          };
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('clave', formData.clave);
      formDataToSend.append('cicloEsc', formData.cicloEsc);
      formDataToSend.append('alumno', formData.alumno);
      formDataToSend.append('grado', formData.grado);
      formDataToSend.append('grupo', formData.grupo);
      formDataToSend.append('expediente', formData.expediente);
      formDataToSend.append('resguardo', formData.resguardo);
      formDataToSend.append('caja', formData.caja);
      formDataToSend.append('archivo', formData.archivo);
  
      try {
          //const response = await fetch('http://localhost/WebServices/RegistroExp.php', {
            const response = await fetch('https://sigaemail.host8b.me/RegistroExp.php', {
           
              method: 'POST',
              body: formDataToSend,
              // Añadir encabezados necesarios para enviar datos de formulario
          });
          if (response.ok) {
              console.log('Expediente registrado correctamente');
          } else {
              console.error('Error al registrar el expediente');
          }
      } catch (error) {
          console.error('Error de conexión:', error);
      }
  
      onClose();
      
  };
  
  
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
            <br />
          <span className="close" onClick={onClose}>&times;</span>
          
          <br /><br />
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={styles.column}>
                <label style={styles.label}>Clave (CURP):</label>
                <input type="text" name="clave" value={formData.clave} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Ciclo Escolar:</label>
                <input type="text" name="cicloEsc" value={formData.cicloEsc} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Nombre del Alumno:</label>
                <input type="text" name="alumno" value={formData.alumno} onChange={handleChange} style={styles.input} />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label style={styles.label}>Grado:</label>
                <input type="text" name="grado" value={formData.grado} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Grupo:</label>
                <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Expediente:</label>
                <select name="expediente" value={formData.expediente} onChange={handleChange} style={styles.input}>
                  <option value="">Seleccione el Expediente</option>
                  <option value="BOLETA">BOLETA</option>
                  <option value="CERTIFICADO">CERTIFICADO</option>
                  <option value="CONSTANCIA">CONSTANCIA</option>
                </select>
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.column}>
                <label style={styles.label}>Resguardo Físico:</label>
                <input type="text" name="resguardo" value={formData.resguardo} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Caja:</label>
                <input type="text" name="caja" value={formData.caja} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.column}>
                <label style={styles.label}>Insertar Archivo PDF:</label>
                <input type="file" name="archivo" onChange={handleFileChange} style={styles.input} />
              </div>
            </div>
            {errors && <p style={styles.error}>{errors}</p>}

            <button type="submit" style={styles.button}>Registrar</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;

const styles = {
    modal: {
      display: 'none',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
      backgroundColor: '#fefefe',
      margin: '10% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '50%', // Ajusta el ancho del formulario según tus necesidades
      borderRadius: '5px',
    },
    close: {
      color: '#aaa',
      float: 'right',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    form: {
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    column: {
      flex: '1',
      marginRight: '10px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontSize: '14px',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };