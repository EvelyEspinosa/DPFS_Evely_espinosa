import React, { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [latestProduct, setLatestProduct] = useState({});
  const [productsByCategory, setProductsByCategory] = useState({});
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    
    fetch('/api/product')
      .then(response => response.json())
      .then(data => {
        setProductsCount(data.count);
        setProductsByCategory(data.countByCategory);
        setProductsList(data.products);
      });

    
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsersCount(data.count);
      });

    
    fetch('/api/product/latest')
      .then(response => response.json())
      .then(data => {
        setLatestProduct(data);
      });
      
    
    fetch('/api/product/categories')
      .then(response => response.json())
      .then(data => {
        setCategoriesCount(data.count);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="panels">
        <div className="panel">
          <h2>Total de Productos</h2>
          <p>{productsCount}</p>
        </div>
        <div className="panel">
          <h2>Total de Usuarios</h2>
          <p>{usersCount}</p>
        </div>
        <div className="panel">
          <h2>Total de Categorías</h2>
          <p>{categoriesCount}</p>
        </div>
        <div className="panel">
          <h2>Último Producto Creado</h2>
          <p>{latestProduct.name}</p>
          <p>{latestProduct.description}</p>
        </div>
        <div className="panel">
          <h2>Productos por Categoría</h2>
          <ul>
            {Object.keys(productsByCategory).map(category => (
              <li key={category}>{category}: {productsByCategory[category]}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Listado de Productos</h2>
          <ul>
            {productsList.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;