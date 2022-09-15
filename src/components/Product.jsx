import React, { memo } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";

Product.defaultProps = {
  products: []
};

const ProductBox = ({ product }) => {
  return (
    <Col sm style={{ margin: "7px 0" }}>
      <Card style={{ height: "100%" }}>
        <Card.Img
          variant="top"
          src={product.images[0]}
          style={{ height: "250px", objectFit: "contain", margin: "0 auto" }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

function Product(props) {
  const { products } = props;
  console.count("render-Product");
  if (products.length <= 0) {
    return <Spinner animation="border" role="status" />;
  }

  const productList = products.map((product) => (
    <ProductBox product={product} key={product.id} />
  ));
  return (
    <Row xs={1} sm={1} md={2} lg={4}>
      {productList}
    </Row>
  );
}

export default memo(Product);
