import React from "react";

function ProductList(props) {
  function deleteProduct(index) {
    props.deleteProduct(index);
  }

  return (
    <div className="products-list">
      {props.products
        ? props.products.map((value, index) => (
            <div
              key={index}
              onClick={() => props.history.push("/product/" + value.slug)}
            >
              <img src={value.image} alt="" />
              <h2>{value.name}</h2>
              <p className="description">{value.description}</p>
              <p className="price">{`${value.price} $`}</p>
              <button
                onClick={e => {
                  deleteProduct(index);
                  e.stopPropagation();
                }}
              >
                ⓧ
              </button>
            </div>
          ))
        : "No products"}
    </div>
  );
}

export default ProductList;
