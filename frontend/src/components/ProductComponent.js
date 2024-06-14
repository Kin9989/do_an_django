import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsProduct, adminDeleteReview, createProductReview } from '../actions/productActions';
import moment from 'moment-timezone';
import { DataGrid } from '@mui/x-data-grid';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button, Typography, Grid } from "@mui/material";
const ProductComponent = ({ productId }) => {
    const dispatch = useDispatch();
    const { loading, reviews, error } = useSelector(state => state.getReviewsProduct);


    // const {
    //     success: successProductReview,
    //     loading: loadingProductReview,
    //     error: errorProdcutReview,
    // } = productReviewCreate;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const reviewDelete = useSelector((state) => state.adminDeleteReview);
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    useEffect(() => {
        const getcmtReviewsProduct = () => {
            dispatch(getReviewsProduct(productId));
        };

        getcmtReviewsProduct();
    }, [dispatch, productId]);

    useEffect(() => {

        if (reviewDelete.success) {
            dispatch(getReviewsProduct(productId));
        }
    }, [dispatch, productId, reviewDelete.success, productReviewCreate.success]);

    const convertToLocalTime = (utcTime) => {
        return moment.utc(utcTime).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const deleteHandler = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(adminDeleteReview(reviewId)); // Gọi action adminDeleteReview với productId và reviewId
        }
    };
    return (
        <div>
            <div style={{ height: 300, width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên người dùng</TableCell>
                                <TableCell>Đánh giá</TableCell>
                                <TableCell>Bình luận</TableCell>
                                <TableCell>Ngày bình luận</TableCell>
                                <TableCell>Xóa</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : reviews
                            ).map((review, index) => (
                                <TableRow key={index}>
                                    <TableCell>{review.name}</TableCell>
                                    <TableCell>{review.rating}</TableCell>
                                    <TableCell sx={{ maxWidth: 300 }}>{review.comment}</TableCell>
                                    <TableCell>{convertToLocalTime(review.createdAt).substring(0, 10)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            style={{ marginLeft: '5px' }}
                                            onClick={() => deleteHandler(review._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>



                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={reviews.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage={<div style={{ marginTop: 15 }}>Trang</div>}
                    labelDisplayedRows={({ from, to, count }) => (
                        <div style={{ marginTop: 15 }}>{`${from}-${to} trang  ${page + 1}`}</div>
                    )}
                />
            </div>
        </div>
    );
}

export default ProductComponent;





