import { act } from "react";
import CreateContext from "./CreateContext";

const productReducer = (state,action) => {

    switch(action.type){
        case "SET_PRODUCTS":
            return {...state,products : action.payload};
        default:
            return state; 
    }

};

const setContextProducts = (dispatch) => {
    return (productData) => {
        dispatch({type : "SET_PRODUCTS" , payload : productData});
    } 
};

export const {Context , Provider} = CreateContext(productReducer,{setContextProducts: setContextProducts},{products : null});
