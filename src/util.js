import { compose, sumBy, sum, values } from 'lodash/fp';

// get total cost of your shopping cart
export function getTotalCost(filteredProducts, cart) {
  return sumBy(item => {
    console.log('what the products', cart[item.id]);
    return cart[item.id] * item.price;
  })(filteredProducts);
}

export function getItemCount(cart) {
  return compose(
    sum,
    values
  )(cart);
}
