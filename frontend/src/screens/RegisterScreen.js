import React, { useState, useEffect } from "react";
/* REACT ROUTER */
import { Link } from "react-router-dom";
/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";
/* ACTION CREATORS */
import { register } from "../actions/userActions";


const HiddenGridItem = styled(Grid)(({ theme }) => ({
  display: 'block', // Hiển thị phần tử trên mọi kích thước màn hình mặc định
  [theme.breakpoints.down('md')]: {
    display: 'none', // Ẩn phần tử trên màn hình với breakpoint md và nhỏ hơn
  },
}));

function RegisterScreen({ location, history }) {
  /* STATE */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */
  const submitHandler = (e) => {
    e.preventDefault();

    /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp");
    } else if (!name || !email || !password || !confirmPassword) {
      setMessage("Vui lòng điền đầy đủ thông tin");
    } else {
      /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
      dispatch(register(name, email, password));
    }
  };

  return (
    <div style={{
      padding: '340px 10%',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'url("https://64.media.tumblr.com/284c3df93de8da0753ea1c2916819fb6/tumblr_noo2rzUrHn1ruw5mdo1_1280.jpg")',
      backgroundSize: 'cover', /* Chỉnh kích thước hình ảnh để nó phù hợp với phần tử */
      backgroundPosition: 'center', /* Đảm bảo hình ảnh được căn giữa phần tử */
      width: '100%',
    }}>
      <Grid container style={{
        margin: '0px', padding: '0px 0px 0px px', maxWidth: '800px', maxHeight: '650px',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
      }}>
        <Grid item xs={12} md={8}>
          <div style={{ margin: '20px 20px 20px 40px' }}>
            <h1 style={{ letterSpacing: '20px', }}>ĐĂNG KÍ</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  required
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Địa chỉ Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Mật Khẩu</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="passwordConfirm">
                <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                ĐĂNG KÍ
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                Đã có tài khoản?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Đăng nhập
                </Link>
              </Col>
            </Row>
          </div>
        </Grid>
        <Grid item xs={0} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
          <HiddenGridItem>
            <img style={{
              height: '560px',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              boxShadow: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
            }} src={'https://i.pinimg.com/736x/53/fa/3b/53fa3b94e5f01ddccb4ad9fa73456037.jpg'} />
          </HiddenGridItem>
        </Grid>
      </Grid>
    </div>
  );
}

export default RegisterScreen;
