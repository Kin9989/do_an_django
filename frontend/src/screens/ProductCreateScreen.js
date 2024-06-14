import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { createProduct } from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";
import axios from "axios";

const ProductCreateScreen = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState(""); // Khởi tạo mà không có giá trị mặc định
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");

    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const { loading, error, success } = productCreate;

    const categoryList = useSelector((state) => state.categoryList);
    const { loading: categoryLoading, error: categoryError, categories } = categoryList;

    useEffect(() => {
        if (success) {
            history.push("/admin/productlist");
        }
        dispatch(listCategories());
        // console.log("Categories:", categories);
        console.log("");

    }, [dispatch, history, success]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('countInStock', countInStock);
        formData.append('image', image); // Thêm hình ảnh vào FormData

        dispatch(createProduct(formData));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("image", file);
        // Kiểm tra nếu productId tồn tại thì mới thêm vào formData
        if (productId) {
            formData.append("product_id", productId);
        }

        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post(
                "/api/products/upload/",
                formData,
                config
            );

            setImage(data); // Ở đây data trả về từ server sẽ là URL của ảnh
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    };


    return (
        <FormContainer>
            <h1>Thêm SẢN PHẨM</h1>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {categoryLoading ? (
                <Loader />
            ) : categoryError ? (
                <Message variant="danger">{categoryError}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Tên Sản Phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Vui Lòng Nhập Tên Sản Phẩm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Vui Lòng Nhập Giá"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Thêm Hình Ảnh</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])} // Lưu hình ảnh vào state khi người dùng chọn
                        />
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Nhãn Hàng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Vui Lòng Nhập Tên Nhãn Hàng"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Danh Mục</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}

                        >

                            <option value="">  Vui Lòng Nhập Tên Danh mục</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>



                    <Form.Group controlId="countInStock">
                        <Form.Label>Số Lượng Hàng Tồn</Form.Label>
                        <Form.Control
                            type="number"

                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Mô Tả</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Vui Lòng NHẬP Mô Tả Sản Phẩm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Tạo
                    </Button>
                </Form>
            )}

            <Link to="/admin/productlist" className="btn btn-light my-3">
                Quay lại
            </Link>
        </FormContainer>
    );
};

export default ProductCreateScreen;
