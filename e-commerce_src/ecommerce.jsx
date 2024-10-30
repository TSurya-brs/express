import React, { useState } from "react";
import "./ecommerce.css";

import img1 from "./img1.jpeg";
import img2 from "./img2.jpeg";
import img3 from "./img3.jpeg";
import img4 from "./img4.jpeg";
import img5 from "./img5.jpeg";
import img6 from "./img6.jpeg";
import img7 from "./img7.jpeg";
import img8 from "./img8.jpeg";

const Ecommerce = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Stylish Watch",
      description: "A fashionable watch to elevate your style.",
      price: 29.99,
      image: img1,
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Experience sound like never before.",
      price: 19.99,
      image: img2,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Portable speaker for your music on the go.",
      price: 39.99,
      image: img3,
    },
    {
      id: 4,
      name: "Smartphone",
      description: "Latest model with advanced features.",
      price: 699.99,
      image: img4,
    },
    {
      id: 5,
      name: "Laptop",
      description: "High-performance laptop for all your needs.",
      price: 999.99,
      image: img5,
    },
    {
      id: 6,
      name: "Camera",
      description: "Capture stunning photos and videos.",
      price: 499.99,
      image: img6,
    },
    {
      id: 7,
      name: "Smartwatch",
      description: "Stay connected with this sleek smartwatch.",
      price: 199.99,
      image: img7,
    },
    {
      id: 8,
      name: "Gaming laptop",
      description: "The latest in gaming laptop",
      price: 499.99,
      image: img8,
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const Header = () => (
    <header>
      <h1>Shooping Website</h1>
      <button onClick={toggleCart}>
        {isCartOpen ? "Close Cart" : "Open Cart"} ({cart.length})
      </button>
    </header>
  );

  const Product = ({ product }) => (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );

  const ProductList = () => (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  const Cart = () => (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <h3 className="total" style={{ textAlign: "right" }}>
            Total Price: ${getTotalPrice()}
          </h3>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Header />
      {isCartOpen ? <Cart /> : <ProductList />}
    </div>
  );
};

export default Ecommerce;
