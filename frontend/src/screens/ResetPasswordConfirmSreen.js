import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPasswordConfirm = () => {
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/reset-password-confirm/${uidb64}/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            setMessage(data.detail);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Xác nhận đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mật khẩu mới:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đặt lại mật khẩu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordConfirm;
