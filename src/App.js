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

  function deleteProduct(index) {
    let updatedProducts = [...products];
    updatedProducts = updatedProducts
      .slice(0, index)
      .concat(updatedProducts.slice(index + 1, updatedProducts.length));

    setProducts(updatedProducts);
  }

  return (
    <Router>
      <div id="app">
        <aside>
          <Link to={"/"}>Products</Link>
          <Link to={"/add-product"}>Add Product</Link>
        </aside>

        <main>
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
          <Route path="/product/:slug" component={SingleProduct} />
        </main>
      </div>
    </Router>
  );
}

export default App;
