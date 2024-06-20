import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = ({ orderId, totalPrice }) => {
    const [formData, setFormData] = useState({
        order_type: 'topup',
        order_id: orderId,  // Use orderId from props
        amount: totalPrice,  // Use totalPrice from props
        order_desc: '',
        bank_code: '',
        language: 'vn'
    });

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderId}/`);
                const order = response.data;
                setFormData({
                    ...formData,
                    amount: order.totalPrice,
                    order_desc: `Thanh toan don hang thoi gian: ${new Date().toLocaleString()}`,
                });
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/orders/get-csrf-token/');
                setCsrfToken(response.data.csrf_token);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchOrderDetails();
        fetchCsrfToken();
    }, [orderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Form Data:', formData);  // Log form data
            console.log('CSRF Token:', csrfToken);  // Log CSRF token

            const response = await axios.post('/api/orders/payment/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });

            console.log('Response Data:', response.data);  // Log response data

            if (response.data.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                console.error('Error in response data:', response.data);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        csrfToken ? (
            <div className="table-responsive">
                <div className="table-responsive">
                    <h3>Payment Form</h3>
                    <form onSubmit={handleSubmit} id="create_form">
                        <div className="form-group">
                            <label htmlFor="order_type">Loại hàng hóa </label>
                            <select
                                name="order_type"
                                id="order_type"
                                className="form-control"
                                value={formData.order_type}
                                onChange={handleChange}
                            >
                                <option value="topup">Nạp tiền điện thoại</option>
                                <option value="billpayment">Thanh toán hóa đơn</option>
                                <option value="fashion">Thời trang</option>
                                <option value="other">Khác - Xem thêm tại VNPAY</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="order_id">Mã hóa đơn</label>
                            <input
                                className="form-control"
                                id="order_id"
                                name="order_id"
                                type="text"
                                value={formData.order_id}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Số tiền</label>
                            <input
                                className="form-control"
                                id="amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="order_desc">Nội dung thanh toán</label>
                            <textarea
                                className="form-control"
                                id="order_desc"
                                name="order_desc"
                                rows="2"
                                value={formData.order_desc}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bank_code">Ngân hàng</label>
                            <select
                                name="bank_code"
                                id="bank_code"
                                className="form-control"
                                value={formData.bank_code}
                                onChange={handleChange}
                            >
                                <option value="">Không chọn</option>
                                <option value="NCB">Ngan hang NCB</option>
                                <option value="AGRIBANK">Ngan hang Agribank</option>
                                <option value="SCB">Ngan hang SCB</option>
                                <option value="SACOMBANK">Ngan hang SacomBank</option>
                                <option value="EXIMBANK">Ngan hang EximBank</option>
                                <option value="MSBANK">Ngan hang MSBANK</option>
                                <option value="NAMABANK">Ngan hang NamABank</option>
                                <option value="VNMART">Vi dien tu VnMart</option>
                                <option value="VIETINBANK">Ngan hang Vietinbank</option>
                                <option value="VIETCOMBANK">Ngan hang VCB</option>
                                <option value="HDBANK">Ngan hang HDBank</option>
                                <option value="DONGABANK">Ngan hang Dong A</option>
                                <option value="TPBANK">Ngân hàng TPBank</option>
                                <option value="OJB">Ngân hàng OceanBank</option>
                                <option value="BIDV">Ngân hàng BIDV</option>
                                <option value="TECHCOMBANK">Ngân hàng Techcombank</option>
                                <option value="VPBANK">Ngan hang VPBank</option>
                                <option value="MBBANK">Ngan hang MBBank</option>
                                <option value="ACB">Ngan hang ACB</option>
                                <option value="OCB">Ngan hang OCB</option>
                                <option value="IVB">Ngan hang IVB</option>
                                <option value="VISA">Thanh toan qua VISA/MASTER</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="language">Ngôn ngữ</label>
                            <select
                                name="language"
                                id="language"
                                className="form-control"
                                value={formData.language}
                                onChange={handleChange}
                            >
                                <option value="vn">Tiếng Việt</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-default">Thanh toán Redirect</button>
                        <input type="hidden" id="csrf_token" value="{{ csrf_token }}" />

                    </form>
                </div>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default PaymentForm;
