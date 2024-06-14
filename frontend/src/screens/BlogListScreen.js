import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Button from '@mui/material/Button';
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Grid, Box } from "@mui/material";

const BlogListScreen = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            if (userInfo && userInfo.isAdmin) {
                try {
                    const response = await axios.get('/api/users/blogs/');
                    const blogsWithId = response.data.map((blog, index) => ({
                        id: index, // Add a unique id for each blog
                        ...blog,
                    }));
                    setBlogs(blogsWithId);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            } else {
                history.push("/login");
            }
        };
        fetchBlogs();
    }, []);

    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`/api/users/blogs/delete/${id}/`);
            if (response.status === 200) {
                // Remove the deleted blog from the state
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                alert('Đang có lỗi xảy ra vui lòng chờ trong giây lát');
            }
        } catch (error) {
            // Handle error
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'description', headerName: 'Description', width: 400 },
        {
            field: 'action',
            headerName: 'ACTION',
            sortable: false,
            width: 200,
            renderCell: (params) => (
                <div>
                    <LinkContainer to={`/admin/blog/${params.row.id}/edit`}>
                        <Button variant="contained" color="primary">Chỉnh sửa</Button>
                    </LinkContainer>
                    <Button variant="contained" color="error" onClick={() => deleteHandler(params.row.id)}>Xóa</Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>QUẢN LÝ Bài Viết</Typography>
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/admin/blog/create">
                        <i className="fas fa-plus"></i> Tạo bài viết
                    </Button>
                </Grid>
            </Grid>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="error">{error}</Message>
            ) : (
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={blogs}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </Box>
            )}
        </>
    );
}

export default BlogListScreen;
