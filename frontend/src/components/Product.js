import React from "react";

/* REACT-BOOTSTRAP */
import { Card } from "react-bootstrap";
/* MUI */
import { styled } from '@mui/material/styles';
import Card1 from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Rating from "./Rating";



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


function Product({ product }) {
  const [expanded, setExpanded] = React.useState(false);
  // console.log(product.image)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    // <Card className="my-3 p-3 rounded">
    //   <Link to={`/product/${product._id}`}>
    //     <Card.Img src={product.image} />
    //   </Link>

    //   <Card.Body>
    //     <Link to={`/product/${product._id}`}>
    //       <Card.Title as="div">
    //         <strong>{product.name}</strong>
    //       </Card.Title>
    //     </Link>

    //     <Card.Text as="div">
    //       <Rating
    //         value={product.rating}
    //         text={`${product.numReviews} reviews`}
    //         color={"#f8e825"}
    //       />
    //     </Card.Text>

    //     <Card.Text as="h3">₹{product.price}</Card.Text>
    //   </Card.Body>
    // </Card>
    <Card sx={{ maxWidth: 345, }} className="my-3 p-3 rounded" >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title={product.price} 
        title={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}

        // subheader="September 14, 2016"
        subheader={<Rating
          value={product.rating}
          text={`${product.numReviews} đánh giá`}
          color={"#f8e825"}
        />}
      />

      <Link to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="full"
          width="full"
          src={product.image}

          alt={product.name}

        />
      </Link>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h4> {product.name}</h4>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>


      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Mô tả:</Typography>

          <Typography paragraph>
            {product.description}
          </Typography>


        </CardContent>
      </Collapse>
    </Card >

  );
}

export default Product;

