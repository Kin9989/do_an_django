import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditScreen = () => {
    const { id: blogId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/users/blogs/${blogId}/`);
                const { title, content, description, image } = response.data;
                setTitle(title);
                setContent(content);
                setDescription(description);
                setImage(image);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [blogId]);

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

        if (image instanceof File) {
            formData.append('image', image);
        }

        try {
            const response = await axios.put(`/api/users/blogs/update/${blogId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                history.push(`/blogs/${blogId}`);
            }
        } catch (error) {
            setError(error.response?.data || 'Something went wrong');
        }
    };

    return (
        <Container>
            {loading && <div>Loading...</div>}
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            {!loading && (
                <>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Cập nhật bài viết
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Mô tả"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <ReactQuill
                            value={content}
                            onChange={handleContentChange}
                            modules={BlogEditScreen.modules}
                            formats={BlogEditScreen.formats}
                            placeholder="Viết gì đó thú vị..."
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
                            Cập nhật bài viết
                        </Button>
                        {error && (
                            <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                                {error}
                            </Typography>
                        )}
                    </form>
                </>
            )}
        </Container>
    );
};

BlogEditScreen.modules = {
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

BlogEditScreen.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default BlogEditScreen;
