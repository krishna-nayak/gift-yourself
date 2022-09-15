import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Product from "./components/Product";
import "./styles.css";

// Product - Api Display All Product
// Add Filter according to category user choices
// User Redux to storing Products Data.

export default function App() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({});
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProductData((prev) => ({ ...prev, ...json }));
        setProducts([...json.products]);
        // Category Calucation
        let val = [];
        for (let product of json.products) {
          if (!val.includes(product.category)) {
            val.push(product.category);
          }
        }
        setCategorys([...val]);
      });
  }, []);

  function filterByCategorys(categoryType) {
    let val = [];
    if (categoryType === "All") return setProducts([...productData.products]);
    for (let product of productData.products) {
      if (product.category === categoryType) {
        val.push(product);
      }
    }
    console.log(val.length);
    setProducts([...val]);
  }

  const handleChange = (e) => {
    filterByCategorys(e.target.value);
  };

  return (
    <Container className="text-center">
      <h1>Gift Yourself.com</h1>
      <Form.Select
        aria-label="Category List"
        onChange={handleChange}
        defaultValue={null}
        size={"lg"}
      >
        <option value="All">All</option>
        {categorys.map((category, i) => (
          <option value={category} key={i}>
            {category}
          </option>
        ))}
      </Form.Select>

      <Product products={products} />
    </Container>
  );
}
