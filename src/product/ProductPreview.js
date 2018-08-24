import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import numeral from 'numeral';
import { withContext } from '../context';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const Image = styled.img`
  max-height: 200px;
  object-fit: cover;
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

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
`;

const CommonButton = styled.button`
  background-color: black;
  color: white;
  text-transform: uppercase;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 200px;
`;

const PrimaryButton = styled(CommonButton)`
  background-color: black;
`;
const SecondaryButton = styled(CommonButton)`
  background-color: grey;
`;

class ProductPreview extends Component {
  render() {
    const {
      image,
      title,
      price,
      brand,
      id,
      actions: { addItem }
    } = this.props;
    return (
      <Wrapper>
        <ImageWrapper>
          <Image src={`/media/${image}`} width="100%" height="auto" />
          <Overlay>
            <PrimaryButton onClick={() => {}}>View details</PrimaryButton>
            <SecondaryButton
              onClick={() => {
                addItem(id);
              }}
            >
              add to cart
            </SecondaryButton>
          </Overlay>
        </ImageWrapper>
        <span>{brand}</span>
        <Title>{title}</Title>
        <span>{numeral(price).format('$0,0.00')}</span>
      </Wrapper>
    );
  }
}

export default withContext(ProductPreview);
