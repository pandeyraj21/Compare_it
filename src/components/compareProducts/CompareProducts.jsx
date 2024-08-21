import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const CompareProducts = () => {
  const [compareList, setCompareList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('compareProducts')) || [];
    setCompareList(products);
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(json => {
        setAllProducts(json.products);
      })
      .catch(error => console.error("Error loading all products: ", error));
  };

  const removeFromCompare = (product) => {
    const updatedList = compareList.filter(p => p.id !== product.id);
    localStorage.setItem('compareProducts', JSON.stringify(updatedList));
    setCompareList(updatedList);
    notification.success({
      message: 'Product Removed',
      description: 'Product has been successfully removed from comparison.',
    });
  };

  const handleAddMoreProducts = (product) => {
    if (compareList.length >= 4) {
      notification.error({
        message: 'Compare Limit Reached',
        description: 'You can only compare up to 4 products at a time.',
      });
      return;
    }
    if (!compareList.some(p => p.id === product.id)) {
      const updatedList = [...compareList, product];
      localStorage.setItem('compareProducts', JSON.stringify(updatedList));
      setCompareList(updatedList);
      notification.success({
        message: 'Product Added',
        description: 'Product has been added to comparison.',
      });
    } else {
      notification.info({
        message: 'Product Already Added',
        description: 'This product is already in the comparison list.',
      });
    }
  };

  const compareColumns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price', render: price => `$${price}` },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Button onClick={() => removeFromCompare(record)} type="danger" style={{ backgroundColor: '#ff4d4f', borderColor: 'white', color: 'white' }}>
        Remove
      </Button>
    )}
  ];

  const allProductsColumns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price', render: price => `$${price}` },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Add', key: 'add', render: (_, record) => (
      <Button onClick={() => handleAddMoreProducts(record)} type="primary">Add to Compare</Button>
    )}
  ];

  return (
    <div>
      <h2>Compare Products</h2>
      <Table
        columns={compareColumns}
        dataSource={compareList}
        pagination={false}
        rowKey="id"
      />
      <Button onClick={() => setIsModalVisible(true)} type="primary">Add More</Button>
      <Modal
        title="Add More Products to Compare"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={allProductsColumns}
          dataSource={allProducts.filter(ap => !compareList.some(cp => cp.id === ap.id))}
          pagination={{ pageSize: 5 }}
          rowKey="id"
        />
      </Modal>

    </div>
  );
};

export default CompareProducts;
