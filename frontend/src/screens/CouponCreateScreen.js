import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Checkbox, FormControlLabel } from '@mui/material';

const CouponCreateScreen = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            code,
            discount,
            is_active: isActive,
        };

        try {
            const response = await axios.post('/api/orders/coupons/add/', formData);
            if (response.status === 201) {
                history.push('/admin/coupon/list/');


            }
        } catch (error) {
            setError(error.response?.data || 'Something went wrong');
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Tạo mã khuyến mãi mới
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Vui lòng nhập mã khuyến mãi"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    fullWidth
                    type="number"
                    placeholder="Vui lòng nhập số tiền giảm"
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    }
                    label="Active"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                >
                    Tạo mã khuyến mãi
                </Button>
                {error && (
                    <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                        {error}
                    </Typography>
                )}
            </form>
        </Container>
    );
};

export default CouponCreateScreen;
