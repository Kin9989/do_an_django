
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { Container, Box, Typography } from '@mui/material';


import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Grid, } from "@mui/material";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const SwiperSlider = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    const fetchCoupons = useCallback(async () => {
        setLoading(true);
        setError(null);
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
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    return (
        <Container>
           
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                style={{ width: '100%', height: '300px' }}
            >

                {coupons.map(coupons => (
                    <SwiperSlide>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                            bgcolor="lightcoral"
                        >
                            <Typography variant="h5">{coupons.code}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}

                {/* Add more SwiperSlide components if needed */}
            </Swiper>
        </Container>
    );
};

export default SwiperSlider;
