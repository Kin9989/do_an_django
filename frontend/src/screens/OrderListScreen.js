import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listOrders } from "../actions/orderActions";

import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Grid } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ClearIcon from '@mui/icons-material/Clear';

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  /* HANDLER */


  // table

  const columns = [
    { field: '_id', headerName: 'Mã đơn', width: 120 },
    {
      field: 'user',
      headerName: 'Tên khách hàng',
      width: 200,

      valueGetter: (value, row) => row.User ? row.User.name : '',
    },
    {
      field: 'totalPrice', headerName: 'Tổng tiền', width: 120,
      valueGetter: (params, row) => {
        const totalPrice = row.totalPrice;
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice);
      }

    },
    {
      field: 'isPaid', headerName: 'Thanh Toán', width: 150,
      valueGetter: (value, row) => row.isPaid ? row.paidAt.substring(0, 10) : "chưa thanh toán",
    },
    {
      field: 'isDeliver', headerName: 'Giao Hàng', width: 150
      ,
      valueGetter: (value, row) => row.isDeliver ? row.deliveredAt.substring(0, 10) : "chưa giao hàng",
    },
    {
      field: 'action',
      headerName: 'ACTION',
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <div>


          <LinkContainer
            to={`/admin/${params.row._id}/orderedit`}
            style={{ marginLeft: '5px' }}>
            <Button variant="dark" className="btn-sm" >
              Chỉnh sửa
            </Button>
          </LinkContainer>



          <Button
            variant="outlined"
            size="small"
            color="error"
            style={{ marginLeft: '5px' }}
          // onClick={() => deleteHandler(params.row.id)}
          >
            Delete
          </Button>

          <LinkContainer to={`/order/${params.row._id}`} style={{ marginLeft: '5px' }}>
            <Button variant="dark" className="btn-sm" >
              Xem
            </Button>
          </LinkContainer>
        </div>
      ),
    },
  ];


  return (
    <div>
      <h1>Đơn Hàng</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // <Table striped bordered hover responsive className="table-sm">
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>USER</th>
        //       <th>DATE</th>
        //       <th>TOTAL</th>
        //       <th>PAID</th>
        //       <th>DELIVERED</th>
        //       <th></th>
        //     </tr>
        //   </thead>

        //   <tbody>
        //     {orders.map((order) => (
        //       <tr key={order._id}>
        //         <td>{order._id}</td>
        //         <td>{order.User && order.User.name}</td>
        //         <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
        //         <td>{order.totalPrice}</td>

        //         <td>
        //           {order.isPaid ? (
        //             order.paidAt.substring(0, 10)
        //           ) : (
        //             <i className="fas fa-times" style={{ color: "red" }}></i>
        //           )}
        //         </td>

        //         <td>
        //           {order.isDeliver ? (
        //             order.deliveredAt.substring(0, 10)
        //           ) : (
        //             <i className="fas fa-times" style={{ color: "red" }}></i>
        //           )}
        //         </td>

        //         <td>
        //           <LinkContainer to={`/order/${order._id}`}>
        //             <Button variant="dark" className="btn-sm">
        //               Details
        //             </Button>
        //           </LinkContainer>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </Table>
        <div style={{ height: 'fitContent', width: '100%' }}>
          {/* <DataGrid
            rows={orders}
            columns={columns}
            pageSize={20}
            getRowId={(row) => row._id}

          /> */}
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row._id}
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
      )}
    </div>
  );
}

export default OrderListScreen;







// import React, { useEffect } from "react";

// /* REACT ROUTER BOOTSTRAP */
// import { LinkContainer } from "react-router-bootstrap";

// /* REACT BOOTSTRAP */
// import { Table, Button } from "react-bootstrap";

// /* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";

// /* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

// /* ACTION CREATORS */
// import { listOrders } from "../actions/orderActions";

// function OrderListScreen({ history }) {
//   const dispatch = useDispatch();

//   /* PULLING OUT STATE */
//   const orderList = useSelector((state) => state.orderList);
//   const { orders, loading, error } = orderList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listOrders());
//     } else {
//       history.push("/login");
//     }
//   }, [dispatch, history, userInfo]);

//   /* HANDLER */

//   return (
//     <div>
//       <h1>Orders</h1>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>USER</th>
//               <th>DATE</th>
//               <th>TOTAL</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.User && order.User.name}</td>
//                 <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
//                 <td>{order.totalPrice}</td>

//                 <td>
//                   {order.isPaid ? (
//                     order.paidAt.substring(0, 10)
//                   ) : (
//                     <i className="fas fa-times" style={{ color: "red" }}></i>
//                   )}
//                 </td>

//                 <td>
//                   {order.isDeliver ? (
//                     order.deliveredAt.substring(0, 10)
//                   ) : (
//                     <i className="fas fa-times" style={{ color: "red" }}></i>
//                   )}
//                 </td>

//                 <td>
//                   <LinkContainer to={`/order/${order._id}`}>
//                     <Button variant="dark" className="btn-sm">
//                       Details
//                     </Button>
//                   </LinkContainer>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }

// export default OrderListScreen;
