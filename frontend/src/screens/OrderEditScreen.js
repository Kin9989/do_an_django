import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";


import { getOrderDetails, updateOrderStatus, deliverOrder, payOrder } from "../actions/orderActions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
const OrderEditScreen = ({ match }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;
    const [newStatus, setNewStatus] = useState("");
    // const orderStatusUpdate = useSelector((state) => state.orderStatusUpdate);
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = orderStatusUpdate;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [dispatch, orderId]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateOrderStatus(orderId, newStatus));
    };

    const handleDeliverOrder = () => {
        if (order.paymentMethod === "offline") {
            dispatch(deliverOrder(order));
        } else {
            // Handle online payment logic here if needed
        }
    };

    const handlePayOrder = () => {
        if (order.paymentMethod === "offline") {
            dispatch(payOrder(order._id, /* pass paymentResult here if needed */));
        } else {
            // Handle online payment logic here if needed
        }
    };
    return (
        <div>
            <h1>Order Details</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (


                <div>


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã đơn hàng </TableCell>
                                    <TableCell align="left">Người mua</TableCell>
                                    <TableCell align="left">Phương thức thanh toán</TableCell>
                                    <TableCell align="left">Ngày mua</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row"> <p> {order._id}</p></TableCell>
                                    <TableCell align=""><p> {order.user}</p></TableCell>
                                    <TableCell align=""><p> {order.paymentMethod}</p></TableCell>
                                    <TableCell align=""><p> {order.createdAt.substring(0, 10)}</p></TableCell>
                                    <TableCell align=""></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer>


                    {order.orderItems.map((item) => (

                        <Card key={item._id} sx={{ display: 'flex', marginTop: '20px', width: '50%' }}>

                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={item.image}
                                alt={item.name}

                            />

                            <CardContent>
                                <Typography component="div" variant="h5">
                                    {item.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Qty: {item.qty}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Price: {item.price}
                                </Typography>
                            </CardContent>




                        </Card>
                    ))}


                    <div style={{ marginTop: '20px', }}>

                        <p>Tiền thuế: {order.taxPrice}</p>
                        <p>Tiền Ship: {order.shippingPrice}</p>
                        <p>Tổng: {order.totalPrice}</p>
                        <p>Thanh toán: {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                        <p>Giao hàng: {order.isDeliver ? "Đã giao" : "Chưa giao"}</p>

                        <p>Trạng thái: {order.new_status}</p>
                    </div>

                    {/* Render other details as needed */}

                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="newStatus">Chọn trạng thái </label>
                            <select
                                className="form-control"
                                id="newStatus"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="Đã nhận được đơn hàng">Đã nhận được đơn hàng</option>
                                <option value="Đang soạn đơn">Đang soạn đơn</option>
                                <option value="Đã gửi bên vận chuyển">Đã gửi bên vận chuyển</option>
                                <option value="Giao hàng thành công">Giao hàng thành công</option>
                                <option value="Boom hàng">Boom hàng</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update Status
                        </button>
                    </form>
                    {order.paymentMethod === "offline" && !order.isDeliver && (
                        <button onClick={handleDeliverOrder} className="btn btn-primary">
                            ĐÃ GIAO HÀNG
                        </button>
                    )}

                    {/* Button to pay order */}
                    {order.paymentMethod === "offline" && !order.isPaid && (
                        <button onClick={handlePayOrder} className="btn btn-primary">
                            Đã thanh toán
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderEditScreen;
