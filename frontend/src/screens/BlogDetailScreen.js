import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IMGBD from "../components/BodyHomePage/ImgBH";

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}
const BlogDetailScreen = ({ id }) => {
    const { id: blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const theme = useTheme();
    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/users/blogs/${id}/`);
                setBlog(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);
    const [blogs, setBlogs] = useState([]);

    const [expandedBlogId, setExpandedBlogId] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/users/blogs/');
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleExpandClick = (blogId) => {
        setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
    };

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        <Item>

                            {loading && <div>Loading...</div>}
                            {error && <div>Error: {error.message}</div>}
                            {blog && (
                                <div className='m-2'>
                                    <div style={{ width: '50%', height: '400px', margin: "0 auto" }} >
                                        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '400px', objectFit: 'cover', objectPosition: 'center' }} />
                                    </div>
                                    <h1>{blog.title}</h1>
                                    <div style={{ display: 'flex', justifyContent: 'start' }}>   Ngày tạo: {formatDate(blog.created_at)}</div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} > {blog.description}</div>
                                    <div dangerouslySetInnerHTML={{ __html: blog.content }} style={{ overflow: 'auto' }} />
                                    {/* Add more details here if needed */}
                                </div>
                            )}
                        </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>

                        <Grid container spacing={2}>

                            {/* <Grid item xs={12} md={12}>
                                <div>
                                    <h5>  Danh sách bài viết mới
                                    </h5>

                                    <Demo>
                                        <List dense={dense}>




                                            {blogs.map((blog) => (
                                                <ListItem key={blog.id}>


                                                    <Card sx={{ display: 'flex' }}>
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                                <Link to={`/bl/${blog.id}`}>
                                                                    <Typography component="div" variant="h5">
                                                                        {blog.title}
                                                                    </Typography>
                                                                </Link>
                                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                    ADMIN
                                                                </Typography>
                                                            </CardContent>

                                                        </Box>
                                                        <Link to={`/bl/${blog.id}`}>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 151, height: 151 }}
                                                                image={blog.image}
                                                                alt="Live from space album cover"
                                                            />
                                                        </Link>
                                                    </Card>

                                                </ListItem>
                                            ))}

                                        </List>
                                    </Demo>

                                </div>
                            </Grid> */}
                            <Grid item xs={12} md={12}>
                                <div>
                                    <h5>  Danh sách bài viết mới
                                    </h5>


                                    <Demo>
                                        <List dense={dense}>
                                            <IMGBD></IMGBD>
                                        </List>
                                    </Demo>


                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>


        </>
    );
}

export default BlogDetailScreen;
