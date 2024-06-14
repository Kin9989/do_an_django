import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Button, Row, Col, ListGroup, Image, Card, Form, Alert } from "react-bootstrap";

/* COMPONENTS */
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { createOrder } from "../actions/orderActions";

/* ACTION TYPES */
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import axios from 'axios';

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, error, success } = orderCreate;

  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS, WE ARE SETTING AN ATTRIBUTE TO OUR CART OBJECT BUT IT WON'T UPDATE OUR STATE, IT'S JUST FOR THIS PAGE
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);

  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  const initialTotalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  // Local state for total price
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  // REDIRECT
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  /* IF ORDER SUCCESSFUL AND WE HAVE ORDER ID, SEND USER TO USERS ACCOUNT TO VIEW THE ORDER */
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);

      // RESET STATE
      dispatch({
        type: ORDER_CREATE_RESET,
      });
    }
  }, [success, history, dispatch, order]);

  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couponError, setCouponError] = useState(null);

  const checkCoupon = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/orders/check_coupon/', { code: couponCode });
      setCouponData(response.data);
      setCouponError(null); // Clear previous error if any
    } catch (error) {
      setCouponData(null);
      setCouponError('Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (couponData) {
      const newTotalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice) -
        Number(couponData.discount)
      ).toFixed(2);
      setTotalPrice(newTotalPrice);
    } else {
      setTotalPrice(initialTotalPrice);
    }
  }, [couponData, cart.itemsPrice, cart.shippingPrice, cart.taxPrice, initialTotalPrice]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Địa chỉ</h2>
              <p>
                <strong>Địa chỉ: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.country}<br />
                <strong>SĐT: </strong>
                {cart.shippingAddress.postalCode},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Phương thức thanh toán</h2>
              <p>
                <strong>Phương thức : </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Chi tiết giỏ hàng</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Không có sản phẩm trong giỏ hàng. <Link to="/">Quay Lại</Link></Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)} =
                          {(item.qty * item.price)}đ
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Chi tiết</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tiền sản phẩm:</Col>
                  <Col>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cart.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tiền ship:</Col>
                  <Col>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cart.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tiền thuế :</Col>
                  <Col>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(cart.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tổng:</Col>
                  <Col>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Form.Group controlId="couponCode">
                  <Form.Label> Mã khuyến mãi</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Vui lòng nhập mã khuyến mãi"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="primary" className="mt-2" onClick={checkCoupon} disabled={loading}>
                    {loading ? 'Checking...' : 'Nhập'}
                  </Button>
                </Form.Group>
                {couponData && (
                  <Alert variant="success" className="mt-2">
                    Giảm: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(couponData.discount)}
                  </Alert>
                )}
                {couponError && (
                  <Alert variant="danger" className="mt-2">
                    {couponError}
                  </Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Đặt hàng
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
