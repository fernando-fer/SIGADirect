import React, { useState } from 'react';

import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Header from './HeaderDic';
import Menu from './MenuDic';


const CargaAlumnos = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const onFinish = async () => {
    if (!fileList.length) {
      message.error('Por favor selecciona un archivo Excel.');
      return;
    }

    const file = fileList[0];
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isExcel) {
      message.error('El archivo debe ser un archivo Excel (.xlsx).');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://sigaemail.host8b.me/cargaAlumnosExcel.php', {
        method: 'POST',
        body: formData,
      });
      console.log("Response: ", response)

      const data = await response.json();


      if (response.ok) {
        message.success('Archivo subido correctamente y registros nuevos insertados en la base de datos.');
        form.resetFields();
        setFileList([]);
        setUploadCompleted(true);
      } else {
        message.error(data.message);
        console.log("Data: ", data)
        //message.error('Error al subir el archivo o insertar registros en la base de datos.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      message.error('Error al procesar la solicitud.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const beforeUpload = (file) => {
    // Limpiar la lista de archivos al subir uno nuevo
    setFileList([file]);
    return false; // Evitar la carga automática
  };

  return (
    <div className="Inicio">

      <Header />
      <Menu />

      <center>
        <main className="App-main" style={{ alignItems: 'center' }}>
          <h1>CARGA DE ALUMNOS</h1>
        </main>
      </center>

      {uploadCompleted && (
        <div className="mensaje">Registros nuevos insertados correctamente.</div>
      )}


      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Upload beforeUpload={beforeUpload} maxCount={1} fileList={fileList}>
            <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">Cargar</Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default CargaAlumnos;