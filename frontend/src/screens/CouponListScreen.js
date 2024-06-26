import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Grid, Box } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
const CouponListScreen = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const fetchCoupons = useCallback(async () => {
        setLoading(true);
        setError(null);

        if (userInfo && userInfo.isAdmin) {
            try {
                const response = await axios.get('/api/orders/coupons/');
                const couponsWithId = response.data.map((coupon) => ({
                    id: coupon.id,
                    ...coupon,
                    active: coupon.is_active ? <CheckIcon style={{ color: 'green' }} /> : <CloseIcon style={{ color: 'red' }} /> // Use CheckIcon and CloseIcon components
                }));
                setCoupons(couponsWithId);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            history.push("/login");
        }



    }, [userInfo]);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`/api/orders/coupons/${id}/delete/`);
            if (response.status === 200) {
                setCoupons(prevCoupons => prevCoupons.filter(coupon => coupon.id !== id));
            } else {
                history.push('/admin/coupon/list/');
                window.alert('Bạn muốn xóa mã khuyến mãi này ?')
                window.location.reload();
            }
        } catch (error) {
            setError("An error occurred while deleting the coupon. Please try again.");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'code', headerName: 'Tên Code', width: 200 },
        { field: 'discount', headerName: 'Giảm giá (vnđ)', width: 200 },
        {
            field: 'active',
            headerName: 'Trạng thái',
            width: 200,
            renderCell: (params) => params.value // Custom render function for 'active' column
        },
        {
            field: 'action',
            headerName: 'Hành động',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <div>
                    <LinkContainer to={`/admin/coupon/${params.row.id}/edit`}>
                        <Button variant="contained" color="primary" size="small" style={{ marginRight: 5 }}>
                            Chỉnh sửa
                        </Button>
                    </LinkContainer>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => deleteHandler(params.row.id)}
                        style={{ marginLeft: '5px' }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Grid container spacing={2} className="mt-1">
                        <Grid item xs={12} md={5}>
                            <Typography variant="h4">Quản lý mã giảm giá</Typography>
                        </Grid>
                        <Grid item xs={12} md={7} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                to="/admin/coupon/create"
                            >
                                <i className="fas fa-plus"></i> Tạo mã giảm giá
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
                        <DataGrid
                            rows={coupons}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Box>
                </>
            )}
        </div>
    );
};

export default CouponListScreen;
