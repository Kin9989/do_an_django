import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    PRODUCT_LIST_BY_CATEGORY_REQUEST,
    PRODUCT_LIST_BY_CATEGORY_SUCCESS,
    PRODUCT_LIST_BY_CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_CREATE_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_DELETE_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const categoryUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORY_UPDATE_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, category: action.payload };
        case CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload };
        case CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productListByCategoryReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_BY_CATEGORY_REQUEST:
            return { ...state, loading: true };
        case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_BY_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};