import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";

import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";

function App() {
  const [products, setProducts] = useState([]);

  function addProduct(product) {
    setProducts([...products, product]);
  }

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={"/"}>Products</Link>
          <Link to={"/add-product"}>Add Product</Link>
        </aside>

        <main>
          <Route exact path="/" component={ProductList} />
          <Route
            path="/add-product"
            render={({ history }) => (
              <AddProduct addProduct={addProduct} history={history} />
            )}
          />
          <Route path="/product/:slug" component={SingleProduct} />
        </main>
      </div>
    </Router>
  );
}

export default App;
