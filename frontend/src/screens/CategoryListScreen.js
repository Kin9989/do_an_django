// CategoryListScreen.js
// CategoryListScreen.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listCategories, deleteCategory } from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Button from '@mui/material/Button';
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants";

// mui
// as RouterLink 
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Grid } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';

const CategoryListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = categoryDelete;

    useEffect(() => {
        dispatch({ type: CATEGORY_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history.push("/login");
        }

        dispatch(listCategories());

        // if (successCreate) {
        //     history.push(`/admin/category/${createdCategory.id}/edit`);
        // } else {
        //     dispatch(listCategories());
        // }
    }, [dispatch, successDelete, history,
        userInfo,]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteCategory(id));
        }
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Tên Danh mục', width: 200 },

        {
            field: 'action',
            headerName: '',
            sortable: false,
            width: 330,
            renderCell: (params) => (
                <div >
                    <Button
                        component={RouterLink}
                        to={`/admin/category/${params.row.id}/edit`}
                        variant="outlined"
                        size="small"
                        color="primary"
                        style={{ marginLeft: '5px' }}
                    >
                        Sửa
                    </Button>


                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        style={{ marginLeft: '5px' }}
                        onClick={() => deleteHandler(params.row.id)}
                    >
                        Xóa
                    </Button>




                </div>
            ),
        },
    ];

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <h1>QUẢN LÝ DANH MỤC</h1>
                </Grid>
                <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>

                    <Button className="my-3" variant="contained" style={{ background: 'black' }} component={RouterLink} to="/admin/category/create">
                        <i className="fas fa-plus"></i> Tạo danh mục
                    </Button>

                </Grid>

            </Grid>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div style={{ height: 400, width: '100%' }}>
                    {/* <DataGrid
                        rows={categories}
                        columns={columns}
                        pageSize={5}
                        // checkboxSelection
                        getRowId={(row) => row.id}
                    /> */}

                    <DataGrid
                        rows={categories}
                        columns={columns}
                        getRowId={(row) => row.id}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />


                </div>
            )
            }
        </div >
    );
};

export default CategoryListScreen;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { listCategories, deleteCategory } from "../actions/categoryActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Button from '@mui/material/Button';

// // mui

// import Grid from '@mui/material/Grid';


// const CategoryListScreen = ({ history }) => {
//     const dispatch = useDispatch();

//     const categoryList = useSelector((state) => state.categoryList);
//     const { loading, error, categories } = categoryList;

//     const categoryDelete = useSelector((state) => state.categoryDelete);
//     const {
//         loading: loadingDelete,
//         error: errorDelete,
//         success: successDelete,
//     } = categoryDelete;

//     useEffect(() => {
//         dispatch(listCategories());
//     }, [dispatch, successDelete]);

//     const deleteHandler = (id) => {
//         if (window.confirm("Are you sure?")) {
//             dispatch(deleteCategory(id));
//         }
//     };

//     return (
//         <div>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} md={5}>
//                     <h1>QUẢN LÝ DANH MỤC</h1>
//                 </Grid>
//                 <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
//                     <Link className="my-3" to="/admin/category/create">
//                         <Button variant="contained" style={{ background: 'black' }}>
//                             <i className="fas fa-plus"></i> Tạo danh mục
//                         </Button>
//                     </Link>
//                 </Grid>

//             </Grid>

//             {loadingDelete && <Loader />}
//             {errorDelete && <Message variant="danger">{errorDelete}</Message>}
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <table className="table table-striped table-bordered table-hover">
//                     <thead>
//                         <tr>
//                             <th>Tên</th>
//                             <th>Sửa</th>
//                             <th>Xóa</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {categories.map((category) => (
//                             <tr key={category.id}>
//                                 <td>{category.name}</td>
//                                 <td>
//                                     <Link
//                                         to={`/admin/category/${category.id}/edit`}
//                                         className="btn btn-sm btn-primary"
//                                     >
//                                         <i className="fas fa-edit"></i>
//                                     </Link>
//                                 </td>
//                                 <td>
//                                     <button
//                                         className="btn btn-sm btn-danger"
//                                         onClick={() => deleteHandler(category.id)}
//                                     >
//                                         <i className="fas fa-trash"></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default CategoryListScreen;
