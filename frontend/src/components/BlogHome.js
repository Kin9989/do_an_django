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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

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

const SwiperSlider = () => {
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

    const reversedBlogs = blogs.slice().reverse(); // Reverse the blogs array

    return (
        <div className='m-5'>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}

            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 20 },
                }}
            >
                {reversedBlogs.map(blog => (
                    <SwiperSlide key={blog.id}>
                        <Card sx={{ maxWidth: 345 }} className="mb-5">
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
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
