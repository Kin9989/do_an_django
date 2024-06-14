import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
    const [productStats, setProductStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductStats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/orders/stats/productsOverrall/');
                setProductStats(response.data.rateProduct);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProductStats();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Xem Thống Kê Tất Cả Sản Phẩm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thống kê tất cả sản phẩm "}

                </DialogTitle>



                <DialogContent>

                    <div>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {productStats && (
                            <PieChart
                                series={[
                                    {
                                        data: productStats.map((product) => ({
                                            value: product.total_orders,
                                            label: product.name,
                                        })),
                                    },
                                ]}
                                width={590}
                                height={300}
                            />
                        )}
                    </div>


                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Đóng</Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
