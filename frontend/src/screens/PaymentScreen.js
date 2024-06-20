import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("offline");

  if (!shippingAddress.address) {
    history.push("./shipping");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const selectedPaymentMethod = e.target.elements.paymentMethod.value;
    setPaymentMethod(selectedPaymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Chọn phương thức thanh toán</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Thanh toán nhận hàng"
              id="offline"
              name="paymentMethod"
              value="offline"
              checked={paymentMethod === "offline"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>


            <Form.Check
              type="radio"
              label="VnPay"
              id="VnPay"
              name="paymentMethod"
              value="VnPay"
              checked={paymentMethod === "VnPay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
