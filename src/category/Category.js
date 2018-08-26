import React, { Component } from 'react';
import styled from 'styled-components';
import './Category.css';
import { withContext } from '../context';
import ProductPreview from '../product/ProductPreview';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// show off css grid because it's just great
const Grid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 270px;
  padding: 2rem 2rem;
  max-width: 1000px;
  width: 100%;
`;

class Category extends Component {
  render() {
    const {
      state: { isLoading, products }
    } = this.props;
    if (isLoading) {
      return <span>loading...</span>;
    }
    return (
      <Wrapper>
        <Grid>
          {products.map(item => (
            <ProductPreview
              id={item.id}
              key={item.id}
              brand={item.brand}
              description={item.description}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
        </Grid>
      </Wrapper>
    );
  }
}

export default withContext(Category);
