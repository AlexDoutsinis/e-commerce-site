import React, { useState } from "react";
import { slugify } from "../utils/slugify";

function AddProduct(props) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangePrice(e) {
    setPrice(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function addProduct(e) {
    e.preventDefault();
    props.addProduct({ name, price, description, image, slug: slugify(name) });
    props.history.push("/");
  }

  return (
    <div>
      <form onSubmit={addProduct}>
        <h1>Add Product</h1>
        <div>
          <label>Name:</label>
          <input required onChange={handleChangeName} />
        </div>
        <div>
          <label>Price in $:</label>
          <input required onChange={handleChangePrice} />
        </div>
        <div>
          <label>Description:</label>
          <textarea required onChange={handleDescription} />
        </div>
        <div>
          <label>Image URL:</label>
          <input required onChange={handleChangeImage} />
        </div>
        <input type="submit" value="Add" className="button" />
      </form>
    </div>
  );
}

export default AddProduct;
