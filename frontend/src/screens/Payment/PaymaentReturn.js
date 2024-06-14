import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentReturn = () => {
    const [data, setData] = useState({
        title: '',
        result: '',
        order_id: '',
        amount: '',
        order_desc: '',
        vnp_TransactionNo: '',
        vnp_ResponseCode: '',
        msg: '',
        redirect_url: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/oders/payment_return/', {
                    params: new URLSearchParams(window.location.search)
                });
                setData(response.data);

                // Redirect to the specified URL after a delay
                if (response.data.redirect_url) {
                    setTimeout(() => {
                        window.location.href = response.data.redirect_url;
                    }, 3000); // Delay of 3 seconds
                }
            } catch (error) {
                console.error('Error fetching payment return data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="panel panel-default">
            <div className="panel-heading">{data.title}: {data.result}</div>
            <div className="panel-body">
                <p>order_id: {data.order_id}</p>
                <p>amount: {data.amount}</p>
                <p>order_desc: {data.order_desc}</p>
                <p>vnp_TransactionNo: {data.vnp_TransactionNo}</p>
                {data.vnp_ResponseCode === '00' ? (
                    <p>vnp_ResponseCode: {data.vnp_ResponseCode} - Thành công</p>
                ) : (
                    <p>vnp_ResponseCode: {data.vnp_ResponseCode} - Lỗi</p>
                )}
                {data.msg && <p className="alert-warning">{data.msg}</p>}
            </div>
        </div>
    );
};

export default PaymentReturn;
