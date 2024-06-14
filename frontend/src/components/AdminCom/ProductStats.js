import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';
import ProductsSTATS from './ProductsSTATS';
const StatsDMY = () => {
    const [productName, setProductName] = useState('');
    const [productStats, setProductStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const fetchProductStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/orders/stats/products/', {
                product_name: productName,
            });
            setProductStats(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productName !== '') {
            fetchProductStats();
        }
    }, [productName]);

    return (
        <div>
            <div>


                <TextField label="Vui lòng nhập tên sản phẩm" variant="outlined" type="text"
                    id="productName"
                    value={productName}
                    onChange={handleProductNameChange} />

            </div>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {productStats && (
                <div>
                    <h2>Thông tin sản phẩm</h2>
                    <p>Tên sản phẩm: {productStats.product_name}</p>
                    {/* <p>Tổng số lượng đã bán: {productStats.total_sold}</p>
                    <p>Tổng doanh thu: {productStats.total_revenue}</p> */}

                    {/* Thêm BarChart */}
                    <BarChart
                        xAxis={[
                            { scaleType: 'band', data: ['Số lượng bán',] }
                        ]}
                        series={[
                            { data: [productStats.total_sold] }
                        ]}
                        width={500}
                        height={300}
                    />
                    {/* <BarChart
                        xAxis={[
                            { scaleType: 'band', data: ['Số lượng bán', 'Doanh thu'] }
                        ]}
                        series={[
                            { data: [productStats.total_sold , productStats.total_revenue ] }
                        ]}
                        width={500}
                        height={300}
                    /> */}
                </div>
            )}
            <ProductsSTATS></ProductsSTATS>
        </div>
    );
};

export default StatsDMY;
