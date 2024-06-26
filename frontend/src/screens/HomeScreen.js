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
import ProductCarousel from "../components/ProductCarousel";
import BandCollab from "../components/BodyHomePage/BardCollab";
import AdProduct from "../components/BodyHomePage/adProduct/AdProduct";
import Committed from "../components/BodyHomePage/Committed";
import OurService from "../components/BodyHomePage/OurService";
import CouponHome from "../components/BodyHomePage/CouponHome";
import BlogHome from "../components/BlogHome"
import HomePage1 from "../components/HomePage1"
import ImgBD from "../components/BodyHomePage/ImgBH"

import { Typography } from '@mui/material';

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";

function HomeScreen({ history }) {
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

  return (
    <div>

      <Caurousel></Caurousel>
      <HomePage1></HomePage1>
      <AdProduct></AdProduct>

      <Container >

        {/* {!keyword && <ProductCarousel />} */}

        <h1>Sản Phẩm mới nhất</h1>

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
      </Container>



      <Container>
        <Typography variant="h4" className="mt-5">
          Mã Khuyến mãi
        </Typography>
        <CouponHome></CouponHome>
        <h1 className="mt-5" >Bài Viết mới nhất</h1>
        <BlogHome></BlogHome>


        <BandCollab></BandCollab>
        <Typography variant="h4" gutterBottom>
          Dịch vụ của chúng tôi
        </Typography>
        <OurService></OurService>
      </Container>
      <Committed></Committed>


    </div >
  );
}

export default HomeScreen;
