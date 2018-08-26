import { compose, sumBy, sum, values } from 'lodash/fp';

// get total cost of your shopping cart
export function getTotalCost(products, cart) {
  return sumBy(item => {
    return (cart[item.id] || 0) * item.price;
  })(products);
}

// get total amount of items in your shopping cart
export function getItemCount(cart) {
  return compose(
    sum,
    values
  )(cart);
}
