import React, { Component } from 'react';
import styled from 'styled-components';
import './Category.css';
import { withContext } from '../context';
import ProductPreview from '../product/ProductPreview';

// show off css grid because it's just great
const Grid = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  padding: 2rem 6rem;
`;

const GridItem = styled.div`
  grid-column: 'auto / span 2';
  grid-row: 'auto / span 2';
`;

class Category extends Component {
  render() {
    const {
      state: { products }
    } = this.props;
    return (
      <div className="Category">
        <Grid>
          {products.map(item => (
            <GridItem>
              <ProductPreview
                id={item.id}
                key={item.id}
                brand={item.brand}
                description={item.description}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            </GridItem>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withContext(Category);
