import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import DetailsStatsDMY from './DetailsStatsDMY';

const LineChartStat = () => {
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [year, setYear] = useState('2024');

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setStatsData(null);
        try {
            const monthlyData = [];
            for (let month = 1; month <= 12; month++) {
                const response = await axios.post('/api/orders/stats/total/DMY/', { month, year });
                monthlyData.push({
                    month: month.toString(),
                    revenue: response.data.total_revenue || 0,
                });
            }
            setStatsData(monthlyData);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (year) {
            handleSubmit();
        }
    }, [year]);

    const chartSetting = {
        xAxis: [
            {
                label: `doanh số năm ${year}`,
                dataKey: 'month',
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
                    <LineChart
                        dataset={statsData}
                        yAxis={[{ dataKey: 'revenue', label: 'Doanh số (VND)', valueFormatter }]}
                        xAxis={[{ dataKey: 'month', label: 'Tháng' }]}
                        series={[
                            { dataKey: 'revenue', label: 'Doanh số theo tháng', valueFormatter },
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

export default LineChartStat;
