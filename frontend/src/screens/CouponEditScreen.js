import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, CircularProgress, Alert, Checkbox, FormControlLabel } from '@mui/material';

const CouponEditScreen = () => {
    const { id } = useParams();
    const history = useHistory();

    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCoupon = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/orders/coupons/${id}/`);
                setCode(data.code);
                setDiscount(data.discount);
                setIsActive(data.is_active);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCoupon();
    }, [id]);

    const updateHandler = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.put(`/api/orders/coupons/${id}/update/`, {
                code,
                discount,
                is_active: isActive,
            });
            if (response.status === 200) {
                setSuccess(true);
                history.push('/admin/coupon/list');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Box sx={{ width: '50%', margin: '0 auto', marginTop: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Chỉnh sửa mã giảm giá
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <form onSubmit={updateHandler}>
                    <TextField
                        label="Tên Code"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                    <TextField
                        label="Giảm giá (%)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        required
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                        }
                        label="Tồn tại"
                    />
                    {updating && <CircularProgress />}
                    {success && <Alert severity="success">Coupon updated successfully!</Alert>}
                    <div></div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: '1rem' }}
                        disabled={updating}
                    >
                        Cập nhật
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default CouponEditScreen;
