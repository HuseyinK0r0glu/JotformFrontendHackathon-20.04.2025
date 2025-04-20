import React, { useEffect, useState } from "react";
import { authFetch } from "../service/ApiClient";
import { useNavigate } from "react-router-dom";

const DashBoardPage = () => {

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
                console.log(data);
            }catch(error){
                setError(error.message || "Failed to fetch the user data");
            }
        }

        makeApiCall();

    },[]);

    return (
        <div className="container mt-5">
            {products ? (
                <div>
                    <h2 className="mb-4">Our Products</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-md-4 mb-4" key={index}>
                                <div className="card h-100 shadow-sm">
                                    {product.images && (
                                        <img
                                            src={JSON.parse(product.images)[0]}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    )}
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <div className="mt-auto">
                                            <h6 className="text-primary">${product.price}</h6>
                                            <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => {navigate(`/product?id=${product.pid}`)}}>Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default DashBoardPage;
