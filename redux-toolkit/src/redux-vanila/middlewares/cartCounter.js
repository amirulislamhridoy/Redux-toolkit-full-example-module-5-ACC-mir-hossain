import { ADD_TO_CART } from "../actionTypes/actionTypes";

// carry function 
// custom middleware in redux
const cartCounter = (store) => (next) => (action) => {
  const state = store.getState();
  const cart = state.product.cart;

  if (action.type === ADD_TO_CART) {
    const newAction = {
      ...action,
      payload: { ...action.payload, cartPosition: cart.length },
    };
    return next(newAction);
  }

  return next(action);
};

export default cartCounter;
