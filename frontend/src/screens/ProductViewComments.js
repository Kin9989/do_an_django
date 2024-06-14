import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductComponent from '../components/ProductComponent';
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductViewComments = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [productName, setProductName] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = products.find(product => product._id === parseInt(productId));
        if (product) {
            setProductName(product.name);
        }
    }, [productId, products]);

    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Danh sách bình luận của sản phẩm: {productName}</h2>
            <ProductComponent productId={productId} />
        </div>
    );
}

export default ProductViewComments;
