import { createAction, createReducer } from "@reduxjs/toolkit";

const addPizza = createAction("addToCart");

const initialState = {
  cartItems: [],
  costing: 0,
  delivery: 0,
  total: 0,
};
export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(addPizza, (state, action) => {
    const item = action.payload;
    const isItemPresent = state.cartItems.find((x) => x._id === item.id);

    if (isItemPresent) {
    } else {
      state.cartItems.push(item);
    }
  });
});
