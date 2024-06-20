import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import BannerBlog from "../components/BodyHomePage/ImgBaner/BANNERBLOG.jpg";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
        backgroundColor: 'white',
    },
}));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const BlogScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedBlogId, setExpandedBlogId] = useState(null);
    const history = useHistory();

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

    const truncateTitle = (title) => {
        const maxLength = 30;
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleFavoriteClick = async (blogId, isFavorited) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage

            if (!token) {
                history.push('/login'); // Redirect to login if token is not available
                return;
            }

            const response = await axios.post(`/api/users/add_to_favorites/${blogId}/`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                },
            });

            if (response.status === 403) {
                history.push('/login'); // Redirect to login page if not authenticated
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to update favorite status');
            }

            const updatedBlogs = blogs.map(blog =>
                blog.id === blogId ? { ...blog, is_favorited: !isFavorited } : blog
            );
            setBlogs(updatedBlogs);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={BannerBlog} style={{ width: "1000px", height: 'auto' }} alt="Banner" />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <h1 style={{ color: "white" }}>Không gian sống lý tưởng <br /> dành cho bạn</h1>
                        <Link to="/blogs">
                            <ColorButton variant="contained">Khám phá ngay</ColorButton>
                        </Link>
                    </div>
                </div>
            </div>
            <Grid container spacing={2} className='container mt-5' style={{ margin: '0 auto' }}>
                {blogs.map(blog => (
                    <Grid item key={blog.id} xs={12} sm={6} md={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                title={truncateTitle(blog.title)}
                                subheader={formatDate(blog.created_at)}
                            />
                            <Link to={`/bl/${blog.id}`}>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={blog.image}
                                    alt="Blog image"
                                />
                            </Link>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() => handleFavoriteClick(blog.id, blog.is_favorited)}
                                >
                                    {/* <FavoriteIcon color={blog.is_favorited ? "error" : "default"} /> */}
                                </IconButton>
                                <ExpandMore
                                    expand={expandedBlogId === blog.id}
                                    onClick={() => handleExpandClick(blog.id)}
                                    aria-expanded={expandedBlogId === blog.id}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expandedBlogId === blog.id} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Mô tả</Typography>
                                    <Typography paragraph>
                                    {blog.description}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default BlogScreen;
