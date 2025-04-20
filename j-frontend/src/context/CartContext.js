import CreateContext from "./CreateContext";

const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
    cartItems : storedCart,
    count : storedCart.reduce((sum, item) => sum + item.quantity, 0),
};

const CartReducer = (state,action) => {

    let updatedCart;
    switch(action.type){
        case "ADD_TO_CART":
            const product = action.payload;
            const existingProduct = state.cartItems.find(item => item.pid === product.pid);

            if(existingProduct){

                updatedCart = state.cartItems.map((item) => 
                    item.pid === product.pid
                        ? { ...item, quantity: item.quantity + 1 }
                        : item 
                );

            }else {
                updatedCart = [...state.cartItems, { ...product, quantity: 1 }]; 
            }

            localStorage.setItem("cartItems", JSON.stringify(updatedCart));

            return {...state,cartItems : updatedCart,count: updatedCart.reduce((sum, item) => sum + item.quantity, 0)}
            
        default : 
            return state;
    }

};

const AddToCart = (dispatch) => {
    return (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    }
};

const RemoveFromCart = (dispatch) => {
    return (product) => {
        dispatch({type : "REMOVE_FROM_CART" , payload: product});
    }
};

const ClearCart = (dispatch) => {
    return () => {
        dispatch({type : "CLEAR_CART"});
    };
};

export const {Context , Provider} = CreateContext(CartReducer , {AddToCart , RemoveFromCart , ClearCart},initialState);