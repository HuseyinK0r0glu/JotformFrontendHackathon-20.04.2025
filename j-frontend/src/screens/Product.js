import React from "react";
import { useLocation} from "react-router-dom";

const ProductPage = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    // show the properties of the product with the given id

    return (
        <div>
            <h1>Product</h1>
        </div>
    );
}

export default ProductPage;