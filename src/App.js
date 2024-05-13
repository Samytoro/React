import React, { useState } from 'react';
import './App.css';

function Home({ setView }) {
  return (
    <div>
      <div className="header">
        <h1>Gestión de Inventario</h1>
      </div>
      <div className="banner-container">
        <div className="banner">
          <img src="https://cdn-icons-png.flaticon.com/512/9984/9984209.png" alt="Kawaii banner" />
        </div>
      </div>
      <div className="container">
        <div className="button-container">
          <button className="button" onClick={() => setView('agregar')}>
            Agregar Producto
          </button>
          <button className="button" onClick={() => setView('lista')}>
            Ver Inventario
          </button>
        </div>
      </div>
    </div>
  );
}

function AgregarProducto({ agregarProducto, setView }) {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAgregarProducto = () => {
    agregarProducto(nombre, parseInt(cantidad), parseFloat(precio));
    setNombre('');
    setCantidad('');
    setPrecio('');
  };

  return (
    <div className="container">
      <h2>Agregar Nuevo Producto</h2>
      <input
        className="form-input"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button className="button form-button" onClick={handleAgregarProducto}>
        Agregar Producto
      </button>
      <button className="button form-button" onClick={() => setView('home')}>
        Volver a Inicio
      </button>
      <button className="button form-button" onClick={() => setView('lista')}>
            Ver Inventario
      </button>
    </div>
  );
}

function ListaProductos({ productos, eliminarProducto, setView, setProductoEditado }) {
  const handleEditarProducto = (producto) => {
    setProductoEditado(producto);
    setView('editar');
  };

  return (
    <div className="container">
      <h2>Lista de Productos</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-th">Nombre</th>
            <th className="table-th">Cantidad</th>
            <th className="table-th">Precio</th>
            <th className="table-th"></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className="table-td">{producto.nombre}</td>
              <td className="table-td">{producto.cantidad}</td>
              <td className="table-td">${producto.precio}</td>
              <td className="table-td">
                <button className="button" onClick={() => handleEditarProducto(producto)}>
                  Editar
                </button>
                <button className="button" onClick={() => eliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button" onClick={() => setView('agregar')}>
        Agregar Producto
      </button>
      <button className="button" onClick={() => setView('home')}>
        Volver a Inicio
      </button>
    </div>
  );
}

function EditarProducto({ productoEditado, editarProducto, setView }) {
  const [nombre, setNombre] = useState(productoEditado.nombre);
  const [cantidad, setCantidad] = useState(productoEditado.cantidad);
  const [precio, setPrecio] = useState(productoEditado.precio);

  const handleEditarProducto = () => {
    editarProducto(productoEditado.id, nombre, parseInt(cantidad), parseFloat(precio));
    setView('lista');
  };

  return (
    <div className="container">
      <h2>Editar Producto</h2>
      <input
        className="form-input"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <input
        className="form-input"
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button className="button form-button" onClick={handleEditarProducto}>
        Guardar Cambios
      </button>
      <button className="button form-button" onClick={() => setView('lista')}>
        Cancelar
      </button>
    </div>
  );
}

function App() {
  const [view, setView] = useState('lista');
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Humidificador', cantidad: 5, precio: 100000 },
    { id: 2, nombre: 'LLaveros', cantidad: 10, precio: 2000 },
    { id: 3, nombre: 'Cuadernos', cantidad: 8, precio: 15000 },
    { id: 4, nombre: 'Mouse', cantidad: 6, precio: 53000 },
  ]);
  const [productoEditado, setProductoEditado] = useState(null);

  const agregarProducto = (nombre, cantidad, precio) => {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      cantidad,
      precio,
    };
    setProductos([...productos, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const editarProducto = (id, nombre, cantidad, precio) => {
    const productosActualizados = productos.map((producto) => {
      if (producto.id === id) {
        return {
          ...producto,
          nombre,
          cantidad,
          precio,
        };
      }
      return producto;
    });
    setProductos(productosActualizados);
  };

  return (
    <div>
      {view === 'home' && <Home setView={setView} />}
      {view === 'agregar' && (
        <AgregarProducto agregarProducto={agregarProducto} setView={setView} />
      )}
      {view === 'lista' && (
        <ListaProductos
          productos={productos}
          eliminarProducto={eliminarProducto}
          setView={setView}
          setProductoEditado={setProductoEditado}
        />
      )}
      {view === 'editar' && (
        <EditarProducto
          productoEditado={productoEditado}
          editarProducto={editarProducto}
          setView={setView}
        />
      )}
    </div>
  );
}

export default App;
