import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByCategory } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

const CategoryByProductScreen = ({ match }) => {
    const categoryId = match.params.id;

    const dispatch = useDispatch();

    const productListByCategory = useSelector((state) => state.productListByCategory);
    const { loading, error, products } = productListByCategory;

    useEffect(() => {
        dispatch(listProductsByCategory(categoryId));
    }, [dispatch, categoryId]);


    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Quay lại
            </Link>
            <h1>Sản phẩm trong danh mục</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : products.length === 0 ? (
                <Message variant="info">Không có sản phẩm trong danh mục này.</Message>
            ) : (
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryByProductScreen;
