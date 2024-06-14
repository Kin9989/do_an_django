import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailsStatsDMY() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('api/orders/stats/totalDMY/', {
                day_start: startDate.date(),
                month_start: startDate.month() + 1, // months are 0-indexed in dayjs
                year_start: startDate.year(),
                day_end: endDate.date(),
                month_end: endDate.month() + 1,
                year_end: endDate.year(),
            });
            setStatsData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Xem thống kê chi tiết
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Xem thống kê chi tiết</DialogTitle>
                <DialogContent style={{ width: 'fit-content', height: 'fit-content' }}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                />
                            </div>
                        </LocalizationProvider>
                        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                            Get Statistics
                        </Button>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {statsData && (
                            <div>
                                <h2>Total Orders: {statsData.total_orders}</h2>
                                <h2>Total Revenue: {statsData.total_revenue}</h2>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Mã đơn hàng</TableCell>
                                                    <TableCell>Tổng tiền</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {statsData.orders
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((order) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                                                            <TableCell>{order._id}</TableCell>
                                                            <TableCell>{order.totalPrice}</TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 25, 100]}
                                        component="div"
                                        count={statsData.orders ? statsData.orders.length : 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
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
