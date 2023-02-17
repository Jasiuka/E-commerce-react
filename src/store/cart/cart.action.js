import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN, bool);

//   const addItemToCart = (productToAdd) => {
//     const newCartItems = addCartItem(cartItems, productToAdd);
//     updateCartItemReducer(newCartItems);
//   };

//   const removeItemFromCart = (cartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     updateCartItemReducer(newCartItems);
//   };

//   const deleteItemFromCart = (cartItemToDelete) => {
//     const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
