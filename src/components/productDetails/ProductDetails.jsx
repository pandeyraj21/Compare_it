import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import BASE_URL from "../../config"

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const comparedAttributes = new Set(['title', 'price', 'brand', 'category']); // Typically compared attributes

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then(response => response.json())
      .then(json => {
        setData(json.products);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const compareStrings = (a, b) => {
    if (!a) return -1;
    if (!b) return 1;
    return a.localeCompare(b);
  };

  const handleCompare = (product) => {
    let products = JSON.parse(localStorage.getItem('compareProducts')) || [];
    if (products.length >= 4) {
      notification.error({
        message: 'Compare Limit Reached',
        description: 'You can compare only up to 4 products at a time.',
      });
      return;
    }
    if (!products.find(p => p.id === product.id)) {
      products.push(product);
      localStorage.setItem('compareProducts', JSON.stringify(products));
      navigate('/compare-products');
    } else {
      notification.info({
        message: 'Product Already in Compare',
        description: 'This product is already added for comparison.',
      });
    }
  };

  const isProductInCompare = (id) => {
    const products = JSON.parse(localStorage.getItem('compareProducts')) || [];
    return products.some(product => product.id === id);
  };

  const renderHighlighted = (text, key, id) => {
    const products = JSON.parse(localStorage.getItem('compareProducts')) || [];
    const isCompared = products.some(product => product.id === id && comparedAttributes.has(key));
    return isCompared ? <Tag color="blue">{text}</Tag> : text;
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', sorter: (a, b) => compareStrings(a.title, b.title), render: (text, record) => renderHighlighted(text, 'title', record.id) },
    { title: 'Description', dataIndex: 'description', ellipsis: true },
    { title: 'Price', dataIndex: 'price', sorter: (a, b) => a.price - b.price, render: (price, record) => renderHighlighted(`$${price}`, 'price', record.id) },
    { title: 'Brand', dataIndex: 'brand', sorter: (a, b) => compareStrings(a.brand, b.brand), render: (text, record) => renderHighlighted(text, 'brand', record.id) },
    { title: 'Category', dataIndex: 'category', sorter: (a, b) => compareStrings(a.category, b.category), render: (text, record) => renderHighlighted(text, 'category', record.id) },
    { title: 'Compare', key: 'compare', render: (_, record) => (
      <Button onClick={() => handleCompare(record)} type="primary" disabled={isProductInCompare(record.id)}>
        Compare
      </Button>
    )},
  ];

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
    </div>
  );
};

export default ProductDetails;
