import React from 'react';
import { Link } from 'react-router-dom';
import './style/Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/product-details">Product Details</Link>
        </li>
        <li>
          <Link to="/compare-products">Compare Products Page</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
