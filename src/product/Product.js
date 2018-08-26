import React, { Component } from 'react';
import { withContext } from '../context';
import ProductPreview from './ProductPreview';

class Product extends Component {
  render() {
    const {
      match,
      state: { products }
    } = this.props;
    const product = products.find(p => p.id === match.params.id);
    if (!product) {
      return <div>Product not found :(</div>;
    }
    const title = product.title;
    return (
      <div>
        Product {title}
        <ProductPreview
          image={product.image}
          title={product.title}
          price={product.price}
          brand={product.brand}
          id={product.id}
        />
      </div>
    );
  }
}

export default withContext(Product);
