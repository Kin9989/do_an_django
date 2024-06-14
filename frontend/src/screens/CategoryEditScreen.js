import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, listCategoryDetails } from "../actions/categoryActions"; // import action to get category details
import { useParams } from "react-router-dom";

const CategoryEditScreen = () => {
    const { id, name: categoryName } = useParams(); // Lấy id và categoryName từ URL params
    const [name, setName] = useState(categoryName); // Sử dụng categoryName để set giá trị mặc định cho trường nhập

    const dispatch = useDispatch();

    const categoryDetails = useSelector((state) => state.categoryDetails); // Select categoryDetails from Redux state
    const { loading: categoryLoading, error: categoryError, category, } = categoryDetails; // Destructure categoryDetails

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = categoryUpdate;

    useEffect(() => {
        // Fetch category details when component mounts
        dispatch(listCategoryDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        // Update name with the category name when category details are loaded successfully
        if (!categoryLoading && !categoryError && category) {
            setName(category.name);
        }
    }, [categoryLoading, categoryError, category,]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateCategory({ _id: id, name }));
    };

    return (
        <div>
            <h1>Chỉnh Sửa Danh Mục</h1>
            {categoryLoading && <p>Loading...</p>}
            {updateError && <p>Lỗi: Vui lòng kiểm tra lại tên doanh mục </p>}
            {updateSuccess && <p>Chỉnh Sửa Danh mục thành công</p>}


            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Tên Danh Mục</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Vui Lòng Nhập Tên DOanh Mục"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                
                <Button type="submit" variant="primary" className="mt-2">
                    Cập Nhật
                </Button>
            </Form>

        </div>
    );
};

export default CategoryEditScreen;
