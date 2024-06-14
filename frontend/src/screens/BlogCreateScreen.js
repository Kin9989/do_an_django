import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const BlogCreateScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/users/addblog/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                history.push('/blogs');
            }
        } catch (error) {
            setError(error.response?.data || 'Something went wrong');
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Tạo bài viết mới
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Mô tả blog"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    modules={BlogCreateScreen.modules}
                    formats={BlogCreateScreen.formats}
                    placeholder="Write something amazing..."
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ marginTop: '20px' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                >
                    Tạo bài viết
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

BlogCreateScreen.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

BlogCreateScreen.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default BlogCreateScreen;
