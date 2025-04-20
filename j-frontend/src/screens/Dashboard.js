import React, { useEffect, useState , useContext} from "react";
import { authFetch } from "../service/ApiClient";
import { useNavigate } from "react-router-dom";
import { Context as ProductsContext } from "../context/ProductContext";

const DashBoardPage = () => {
    
    const {state,setContextProducts} = useContext(ProductsContext);

    const navigate = useNavigate(); 

    const[products,setProducts] = useState(null);
    const[error,setError] = useState(null);

    useEffect(() => {

        // make an api call to get the user info 

        const formID = "251074030838957";

        const makeApiCall = async () => {
            try{
                const data = await authFetch(`https://api.jotform.com/form/${formID}/payment-info`,{
                    method : "GET",
                });
                setProducts(data.content.products);
                setContextProducts(data.content.products);
                localStorage.setItem('products', JSON.stringify(data.content.products));
                console.log(data);
            }catch(error){
                setError(error.message || "Failed to fetch the user data");
            }
        }

        const storedProducts = localStorage.getItem('products');
        if(storedProducts){
            setProducts(JSON.parse(storedProducts)); 
            setContextProducts(JSON.parse(storedProducts));
        }else {
            makeApiCall();
        }

        // if (!state.products) {
        //     const storedProducts = localStorage.getItem('products');
        //     if (storedProducts) {
        //         setProducts(JSON.parse(storedProducts)); 
        //         setContextProducts(JSON.parse(storedProducts));
        //     } else {
        //         makeApiCall();
        //     }
        // }

    },[]);

    return (
        <div className="container mt-4">
            {products ? (
                <div>
                    <h4 className="mb-3">Our Products</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                                <div className="card h-100 shadow-sm p-2">
                                    {product.images && (
                                        <img
                                            src={JSON.parse(product.images)[0]}
                                            className="card-img-top rounded"
                                            alt={product.name}
                                            style={{ height: "140px", objectFit: "cover" }}
                                        />
                                    )}
                                    <div className="card-body p-2 d-flex flex-column">
                                        <h6 className="card-title mb-1 text-truncate">{product.name}</h6>
                                        <p className="card-text text-muted small" style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
                                            {product.description?.slice(0, 50)}...
                                        </p>
                                        <div className="mt-auto d-flex justify-content-between align-items-center">
                                            <span className="text-primary fw-semibold" style={{ fontSize: "0.85rem" }}>
                                                ${product.price}
                                            </span>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => navigate(`/product?id=${product.pid}`)}
                                            >
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Loading products...</div>
            )}
        </div>
    );
};

export default DashBoardPage;
