import React, { useEffect, useState , useContext} from "react";
import { authFetch } from "../service/ApiClient";
import { useNavigate } from "react-router-dom";
import { Context as ProductsContext } from "../context/ProductContext";
import { Context as CartContext } from "../context/CartContext";

const DashBoardPage = () => {
    
    const {state,setContextProducts} = useContext(ProductsContext);

    const {state : cart , AddToCart} = useContext(CartContext);

    const [sortOption,setSortOption] = useState("name-asc");

    const navigate = useNavigate(); 

    const[products,setProducts] = useState(null);
    const[error,setError] = useState(null);

    const [searchQuery , setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }
    
    useEffect(() => {
        if (products) {
          const newFilteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(newFilteredProducts);
        }
      }, [searchQuery, products]); 

    const handleSortChange = (e) => {
    const sortType = e.target.value;
    setSortOption(sortType);

    let sortedProducts;
    switch (sortType) {
        case "name-asc":
        sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
        break;
        case "name-desc":
        sortedProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
        break;
        case "price-asc":
        sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        break;
        case "price-desc":
        sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        break;
        default:
        sortedProducts = [...filteredProducts];
        break;
    }

    setFilteredProducts(sortedProducts);
    };

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

    },[]);

    const handleAddToCart = (product) => {
        // add cart quantites to local storage
        AddToCart(product);
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                {/* Search Input */}
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                <input
                    type="text"
                    className="form-control form-control-sm shadow-sm"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                </div>

                {/* Sorting Dropdown */}
                <div className="col-12 col-md-6">
                <select
                    className="form-select form-select-sm shadow-sm"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="name-asc">Sort by Name (A-Z)</option>
                    <option value="name-desc">Sort by Name (Z-A)</option>
                    <option value="price-asc">Sort by Price (Low to High)</option>
                    <option value="price-desc">Sort by Price (High to Low)</option>
                </select>
            </div>
        </div>

            {filteredProducts ? (
                <div>
                    <h4 className="mb-3">Products</h4>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="row">
                        {filteredProducts.map((product, index) => (
                            <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                            <div className="card h-100 shadow-sm p-2">

                                <div
                                    onClick={() => navigate(`/product?id=${product.pid}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {product.images && (
                                        <img
                                            src={JSON.parse(product.images)[0]}
                                            className="card-img-top rounded"
                                            alt={product.name}
                                            style={{
                                                height: "150px",  
                                                width: "100%",    
                                                objectFit: "contain", 
                                                objectPosition: "center", 
                                                borderRadius: "10px",  
                                            }}
                                        />
                                    )}
                                    <div className="card-body p-2 d-flex flex-column">
                                        <h6 className="card-title mb-1 text-truncate">{product.name}</h6>
                                        <p className="card-text text-muted small" style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
                                            {product.description?.slice(0, 50)}...
                                        </p>
                                    </div>
                                </div>
                        
                                <div className="px-2 pb-2 d-flex justify-content-between align-items-center mt-auto">
                                    <span className="text-primary fw-semibold" style={{ fontSize: "0.85rem" }}>
                                        ${product.price}
                                    </span>
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
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
