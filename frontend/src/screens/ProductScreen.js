import React, { useEffect, useState } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

/* COMPONENTS */
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Contact from "./ContactScreen"
/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen({ match, history }) {
  /* STATE */
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProdcutReview,
  } = productReviewCreate;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  useEffect(() => {
    // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  /* HANDLERS */
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createProductReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Quay Lại
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} đánh giá`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>Giá:

                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                </ListGroup.Item>

                <ListGroup.Item>
                  Mô tả: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Giá:</Col>
                      <Col>



                        <strong>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Trạng thái:</Col>
                      <Col>
                        {product.countInStock > 0 ? "Còn hàng" : "hết hàng"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Số lượng </Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}


                  <ListGroup.Item>
                    <Row>
                      <Col>Liên hệ</Col>
                      <Col>
                        <Link to="/contact">Liện hệ nếu cần sự giúp đỡ từ chúng tôi</Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="w-100"
                      disabled={product.countInStock === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Thêm Vào vỏ hàng
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>


          </Row>

          <Row>
            <Col md={6}>
              <h4 className="mt-3">Đánh giá</h4>

              {product.reviews.length === 0 && (
                <Message variant="info">Sp chưa được đánh giá</Message>
              )}

              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} color="f8e825" />

                    <p>{review.createdAt.substring(0, 10)}</p>

                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h4>Đánh giá sản phẩm</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Review Submitted</Message>
                  )}
                  {errorProdcutReview && (
                    <Message variant="danger">{errorProdcutReview}</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Đánh giá</Form.Label>

                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Chon...</option>
                          <option value="1">1 - Tệ</option>
                          <option value="2">2 - Ổn</option>
                          <option value="3">3 - Tạm chấp nhất</option>
                          <option value="4">4 - Tốt</option>
                          <option value="5">5 - Tuyệt Vời</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Viết đánh giá</Form.Label>

                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>

                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        className="my-3"
                      >
                        Gửi
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Vui Lòng <Link to="/login">Đăng nhập</Link> để đánh giá.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
