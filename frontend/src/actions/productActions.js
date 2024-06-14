/* AXIOS */
import axios from "axios";

/* ACTION TYPES */
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,

  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,

  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,

  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,

  GET_REVIEWS_PRODUCT_REQUEST,
  GET_REVIEWS_PRODUCT_SUCCESS,
  GET_REVIEWS_PRODUCT_FAIL,

  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_SUCCESS,
  ADMIN_DELETE_REVIEW_FAIL,
} from "../constants/productConstants";

/* ACTION CREATOR USED IN HomeScreen COMPONENT */
export const listProducts =
  (keyword = "") =>
    async (dispatch) => {
      try {
        dispatch({
          type: PRODUCT_LIST_REQUEST,
        });

        const { data } = await axios.get(`/api/products${keyword}`);

        dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: PRODUCT_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };

/* ACTION CREATOR USED IN ProductScreen COMPONENT */
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN DELETING PRODUCTS IN ProductListScreen COMPONENT */
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO DELETE PRODUCT */
    // eslint-disable-next-line
    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN CREATING PRODUCTS IN ProductListScreen COMPONENT */
export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data", // Thay đổi Content-type thành multipart/form-data
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO CREATE PRODUCT */
    const { data } = await axios.post(`/api/products/create/`, productData, config);

    /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


/* ACTION CREATOR USED IN UPDATING PRODUCTS IN ProductEditScreen COMPONENT */
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO UPDATE PRODUCT */
    const { data } = await axios.put(
      `/api/products/update/${product._id}/`,
      product,
      config
    );

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    /* LOAD IN THE UPDATED PRODUCTS DETAILS */
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/* ACTION CREATOR USED IN CREATING PRODUCT REVIEWS IN ProductScreen COMPONENT */
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      /* MAKING API CALL TO CREATE PRODUCT REVIEW */
      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );

      /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

/* ACTION CREATOR USED IN ProductCarousel COMPONENT */
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_TOP_REQUEST,
    });

    const { data } = await axios.get(`/api/products/top/`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getReviewsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_PRODUCT_REQUEST });
    // console.log('Dispatched GET_REVIEWS_PRODUCT_REQUEST');

    const { data } = await axios.get(`/api/products/${productId}/reviewsproduct/`);
    // console.log('Received data:', data);

    dispatch({ type: GET_REVIEWS_PRODUCT_SUCCESS, payload: data });
    // console.log('Dispatched GET_REVIEWS_PRODUCT_SUCCESS');
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    console.error('Error getting reviews:', error);
  }
};

export const adminDeleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/reviews/${id}/delete/`, config);

    dispatch({
      type: ADMIN_DELETE_REVIEW_SUCCESS,
      payload: id, // Truyền id của review đã bị xóa vào payload
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
