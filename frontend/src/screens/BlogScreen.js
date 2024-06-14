import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Import Grid from Material-UI
import { Link } from "react-router-dom";
import BannerBlog from "../components/BodyHomePage/ImgBaner/BANNERBLOG.jpg";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                                title={blog.title}
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
                                    {blog.description}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
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
                                    <Typography paragraph>Chi tiết</Typography>
                                    <Typography paragraph>
                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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
