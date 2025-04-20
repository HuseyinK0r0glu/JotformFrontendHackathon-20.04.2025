import React , { useContext, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Context as ProductsContext } from "../context/ProductContext";

const ProductPage = () => {

    const {state,setContextProducts} = useContext(ProductsContext);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    useEffect(() => {
        if (!state.products) {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                setContextProducts(JSON.parse(storedProducts)); // Load from localStorage
            }
        }
    },[]);

    // show the properties of the product with the given id

    const product = state.products?.find((prod) => prod.pid === id);

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}
            >
                <div className="container" style={{ maxWidth: "500px" }}>
                    <div className="card shadow-sm p-3">
                        {product.images && (
                            <img
                                src={JSON.parse(product.images)[0]}
                                className="card-img-top rounded"
                                alt={product.name}
                                style={{ height: "250px", objectFit: "cover" }}
                            />
                        )}
                        <div className="card-body">
                            <h4 className="card-title mb-2">{product.name}</h4>
                            <h6 className="text-primary mb-3">${product.price}</h6>
                            <p
                                className="card-text"
                                style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
                            >
                                {product.description}
                            </p>
                            <button className="btn btn-primary mt-3">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ProductPage;