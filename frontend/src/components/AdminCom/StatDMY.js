import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import DetailsStatsDMY from './DetailsStatsDMY';
import { useSelector } from 'react-redux';

const StatsDMY = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [year, setYear] = useState('2024');
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setStatsData(null);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
                },
            };

            const monthlyData = [];
            for (let month = 1; month <= 12; month++) {
                const response = await axios.post('/api/orders/stats/total/DMY/', { month, year }, config);
                monthlyData.push({
                    month: month.toString(),
                    revenue: response.data.total_revenue || 0,
                });
            }
            setStatsData(monthlyData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (year && userInfo) {
            handleSubmit();
        }
    }, [year, userInfo]);

    const chartSetting = {
        xAxis: [
            {
                label: `doanh số năm ${year}`,
            },
        ],
        width: 500,
        height: 300,
    };

    const valueFormatter = (value) => `${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)}`;

    return (
        <div>
            <div>
                <label htmlFor="year">Chọn năm:</label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </div>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {statsData && (
                <div>
                    <h2>Doanh số theo năm {year}</h2>
                    <BarChart
                        dataset={statsData}
                        layout="horizontal"
                        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'revenue', label: 'doanh số theo tháng', valueFormatter },
                        ]}
                        {...chartSetting}
                    />
                </div>
            )}
            <br />
            <DetailsStatsDMY />
        </div>
    );
};

export default StatsDMY;
