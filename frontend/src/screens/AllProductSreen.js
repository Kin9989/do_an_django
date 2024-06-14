import React, { useEffect } from "react";
import Caurousel from "../components/BodyHomePage/Caurousel"
/* REACT-BOOTSTRAP */
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
/* COMPONENTS */
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../components/SearchBox";
/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function AllProductSreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, loading, error } = productList;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  let keyword =
    history.location
      .search; /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100px;
`;

  const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
  return (


    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>

        <Grid item xs={12} md={8} >
          {/* <SearchBox ></SearchBox> */}
        </Grid>
        <Grid item xs={12} md={4} >
          <SearchBox ></SearchBox>
        </Grid>

        {/* <Grid item xs={6} md={2}>

        </Grid> */}
        <Grid item xs={12} md={12}>
          <Item>  <Container >
            {/* {!keyword && <ProductCarousel />} */}

            <h1>Tất cả sản phẩm</h1>

            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div>
                <Row>
                  {products.map((product) => {
                    return (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                        <Product product={product} />
                      </Col>
                    );
                  })}
                </Row>

                <Paginate page={page} pages={pages} keyword={keyword} />
              </div>
            )}
          </Container></Item>
        </Grid>


      </Grid>

      {/* <StyledSwiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
      >
        <StyledSwiperSlide><Item></StyledSwiperSlide>
        <StyledSwiperSlide>Slide 2</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 3</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 4</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 5</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 6</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 7</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 8</StyledSwiperSlide>
        <StyledSwiperSlide>Slide 9</StyledSwiperSlide>
      </StyledSwiper> */}
    </Box>




  );
}

export default AllProductSreen;


