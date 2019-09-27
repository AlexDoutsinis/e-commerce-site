import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";

import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  function addProduct(product) {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function deleteProduct(index) {
    let updatedProducts = [...products];
    updatedProducts = updatedProducts
      .slice(0, index)
      .concat(updatedProducts.slice(index + 1, updatedProducts.length));

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  }

  function productIndex(products, slug) {
    return products.findIndex(p => p.product.slug === slug);
  }

  function addToCart({ product, quantity }) {
    const index = productIndex(cart, product.slug);

    let newCart = [];

    if (index === -1) {
      //not existing
      newCart = [...cart, { product, quantity }];
    } else {
      quantity += cart[index].quantity;
      newCart = cart
        .filter(item => item.product.slug !== product.slug)
        .concat({ product, quantity });
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function removeProduct(value, remove) {
    const index = productIndex(cart, value.product.slug);
    const { quantity, product } = value;
    let newCart;

    if (remove && quantity < 2) {
      newCart = cart.filter(item => item.product.slug !== product.slug);
    } else {
      newCart = [...cart];
      newCart[index] = {
        product,
        quantity: remove ? quantity - 1 : quantity + 1
      };
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function clearProduct({ product }) {
    const newCart = cart.filter(item => item.product.slug !== product.slug);

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={"/"}>Products</Link>
          <Link to={"/add-product"}>Add Product</Link>
        </aside>

        <main>
          <Cart
            cart={cart}
            removeProduct={removeProduct}
            clearProduct={clearProduct}
          />
          <Route
            exact
            path="/"
            render={({ history }) => (
              <ProductList
                products={products}
                deleteProduct={deleteProduct}
                history={history}
              />
            )}
          />
          <Route
            path="/add-product"
            render={({ history }) => (
              <AddProduct addProduct={addProduct} history={history} />
            )}
          />
          <Route
            path="/product/:slug"
            render={({ match }) => (
              <SingleProduct
                product={products.find(p => p.slug === match.params.slug)}
                addToCart={addToCart}
              />
            )}
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
