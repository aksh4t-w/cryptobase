export const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    // case "REMOVE_FROM_BASKET":
    //   let newBasket = [...state.basket];
    //   const index = newBasket.findIndex((item) => item.id === action.id);

    //   if (index >= 0) {
    //     newBasket.splice(index, 1);
    //     return {
    //       ...state,
    //       basket: newBasket,
    //     };
    //   } else {
    //     console.warn(
    //       `Can't remove product (id: ${action.id}) as its not present.`
    //     );
    //   }
    default:
      return state;
  }
}

export default reducer;
