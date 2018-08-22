import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import numeral from 'numeral';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Image = styled.div`
  flex-shrink: 0;
  background-image: ${props => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  width: 330px;
  height: 222px;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const SmallText = styled.span`
  font-size: 0.7rem;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const RemoveButton = styled.button``;

class ProductPreview extends Component {
  render() {
    const { image, title, price, brand } = this.props;
    return (
      <Wrapper>
        <ImageWrapper>
          <Image url={`/media/${image}`} />
        </ImageWrapper>
        <span>{brand}</span>
        <Title>{title}</Title>
        <span>{numeral(price).format('$0,0.00')}</span>
      </Wrapper>
    );
  }
}

export default ProductPreview;
