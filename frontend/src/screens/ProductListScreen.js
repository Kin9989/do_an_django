
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Grid } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
// Import the getComment action from your actions file

function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());

  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(listCategories());
  // }, [dispatch]);

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productList = useSelector((state) => state.productList);
  const { products, pages, page, loading, error } = productList;
  const [comments, setComments] = useState([]);
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };





  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Tên Sản Phẩm', width: 200 },
    { field: 'price', headerName: 'Giá', width: 130 },
    { field: 'categoryName', headerName: 'Danh Mục', width: 200, },
    { field: 'brand', headerName: 'Nhãn hàng', width: 130 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      width: 330,
      renderCell: (params) => (
        <div >
          <Button
            component={RouterLink}
            to={`/admin/product/${params.row._id}/edit`}
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
            onClick={() => deleteHandler(params.row._id)}
          >
            Xóa
          </Button>
          <Button
            startIcon={<CommentIcon />}
            component={RouterLink}
            to={`/admin/product/${params.row._id}/reviews`}
            variant="outlined"
            size="small"
            style={{ marginLeft: '5px' }}
          >
            Xem Bình Luận
          </Button>

        </div>
      ),
    },
  ];



  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" component="h1">
            Sản Phẩm
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            to="/admin/product/create"
            variant="contained"
            color="primary"
          >
            Thêm sản phẩm
          </Button>
        </Grid>
      </Grid>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={5}
            // checkboxSelection
            getRowId={(row) => row._id}
          />

        </div>
      )}

      <Paginate pages={pages} page={page} isAdmin={true} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
    </div>
  );
}

export default ProductListScreen;



// import React, { useEffect } from "react";

// /* REACT ROUTER BOOTSTRAP */
// import { LinkContainer } from "react-router-bootstrap";

// /* REACT BOOTSTRAP */
// import { Table, Button, Row, Col } from "react-bootstrap";

// /* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import Paginate from "../components/Paginate";
// import { Link } from "react-router-dom";

// /* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";
// import { listCategories } from "../actions/categoryActions";
// import {
//   listProducts,
//   deleteProduct,
//   createProduct,
// } from "../actions/productActions";
// import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

// function ProductListScreen({ history }) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(listCategories());
//     console.log("Categories:", categories);
//   }, [dispatch]);
//   useEffect(() => {
//     dispatch(listCategories());
//   }, [dispatch]);


//   /* PULLING OUT STATE */
//   const categoryList = useSelector((state) => state.categoryList);
//   const { categories } = categoryList;

//   const productList = useSelector((state) => state.productList);
//   const { products, pages, page, loading, error } = productList;

//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     success: successDelete,
//     loading: loadingDelete,
//     error: errorDelete,
//   } = productDelete;

//   const productCreate = useSelector((state) => state.productCreate);
//   const {
//     product: createdProduct,
//     success: successCreate,
//     loading: loadingCreate,
//     error: errorCreate,
//   } = productCreate;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   // GETTING PAGE NUMBER (KEYWORD IS PAGE NUMBER)
//   let keyword = history.location.search;

//   useEffect(() => {
//     dispatch({ type: PRODUCT_CREATE_RESET });

//     if (!userInfo.isAdmin) {
//       history.push("/login");
//     }

//     if (successCreate) {
//       history.push(`/admin/product/${createdProduct._id}/edit`);
//     } else {
//       dispatch(listProducts(keyword));
//     }
//   }, [
//     dispatch,
//     history,
//     userInfo,
//     successDelete,
//     successCreate,
//     createdProduct,
//     keyword,
//   ]);

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure you want to delete this product ?")) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const createProcutHandler = () => {
//     dispatch(createProduct());
//   };

//   return (
//     <div>
//       <Row className="align-items-center">
//         <Col>
//           <h1>Products</h1>
//         </Col>

//         <Col className="text-end">
//           <Link className="my-3" to="/admin/product/create">
//             <Button>
//               <i className="fas fa-plus"></i> Create Product
//             </Button>
//           </Link>
//         </Col>
//       </Row>

//       {loadingCreate && <Loader />}
//       {errorCreate && <Message variant="danger">{errorCreate}</Message>}

//       {loadingDelete && <Loader />}
//       {errorDelete && <Message variant="danger">{errorDelete}</Message>}

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div>
//           <Table striped bordered hover responsive className="table-sm">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>NAME</th>
//                 <th>PRICE</th>
//                 <th>CATEGORY</th>
//                 <th>BRAND</th>
//                 <th></th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id}>
//                   <td>{product._id}</td>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>{categories.find(cat => cat.id === product.category)?.name}</td>
//                   <td>{product.brand}</td>

//                   <td>
//                     <LinkContainer to={`/admin/product/${product._id}/edit`}>
//                       <Button variant="light" className="btn-sm">
//                         <i className="fas fa-edit"></i>
//                       </Button>
//                     </LinkContainer>

//                     <Button
//                       variant="danger"
//                       className="btn-sm"
//                       onClick={() => deleteHandler(product._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           <Paginate pages={pages} page={page} isAdmin={true} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductListScreen;