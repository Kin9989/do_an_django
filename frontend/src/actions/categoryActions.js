import axios from "axios";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    PRODUCT_LIST_BY_CATEGORY_FAIL,
    PRODUCT_LIST_BY_CATEGORY_SUCCESS,
    PRODUCT_LIST_BY_CATEGORY_REQUEST
} from "../constants/categoryConstants";

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await axios.get("/api/products/categories/");

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const listCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/category/${id}/`);

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: userInfo ? `Bearer ${userInfo.token}` : null,
            },
        };

        // Check if there are any products in the category
        const { data: categoryProducts } = await axios.get(`/api/products/categories/${id}/products/`, config);

        if (categoryProducts.length > 0) {
            // If there are products, dispatch an error indicating that products must be removed first
            dispatch({
                type: CATEGORY_DELETE_FAIL,
                payload: 'Vui lòng xóa tất cả sản phẩm trong danh mục',
            });
            return;
        }

        // If there are no products, proceed with deleting the category
        await axios.delete(`/api/products/categories/delete/${id}/`, config);

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const createCategory = (name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        if (!userInfo) {
            // If user is not logged in, dispatch a failure action
            dispatch({
                type: CATEGORY_CREATE_FAIL,
                payload: 'User is not logged in',
            });
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            "/api/products/category/",
            { name },
            config
        );

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


export const updateCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: userInfo ? `Bearer ${userInfo.token}` : null,
            },
        };

        const { data } = await axios.put(
            `/api/products/category/${category._id}/update/`,
            category,
            config
        );

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listProductsByCategory = (categoryId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });

        const { data } = await axios.get(`/api/products/categories/${categoryId}/products/`);




        dispatch({
            type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_BY_CATEGORY_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};