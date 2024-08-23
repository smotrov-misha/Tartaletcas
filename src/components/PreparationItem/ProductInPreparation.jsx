import { useState, useEffect } from "react";

function ProductInPreparation({ product, id, changeCheckmark }) {
  const [checked, setChecked] = useState(product.checkmark);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    changeCheckmark(id, isChecked);
    setChecked(isChecked);
  };

  useEffect(() => {
    setChecked(product.checkmark);
  }, [product.checkmark]);

  return (
    <div className="product-in-prep">
      <h3 className="product-name-in-prep">{product.name}</h3>
      <div className="how-many-product">
        <h3>{product.quantity + " " + product.unit}</h3>
        <label className="check-product">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

export default ProductInPreparation;
