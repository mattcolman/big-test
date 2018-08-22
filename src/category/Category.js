import React, { Component } from 'react';
import styled from 'styled-components';
import './Category.css';
import { withContext } from '../context';
import ProductPreview from '../product/ProductPreview';

const ProductContainer = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem 6rem;
`;

class Category extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="Category">
        <ProductContainer>
          {products.map(item => (
            <ProductPreview
              key={item.id}
              brand={item.brand}
              description={item.description}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
        </ProductContainer>
      </div>
    );
  }
}

export default withContext(Category);
