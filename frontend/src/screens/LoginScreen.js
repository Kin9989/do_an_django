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
import { login } from "../actions/userActions";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HiddenGridItem = styled(Grid)(({ theme }) => ({
  display: 'block', // Hiển thị phần tử trên mọi kích thước màn hình mặc định
  [theme.breakpoints.down('md')]: {
    display: 'none', // Ẩn phần tử trên màn hình với breakpoint md và nhỏ hơn
  },
}));

function LoginScreen({ location, history }) {
  /* STATE */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // Trạng thái để lưu thông báo lỗi

  const dispatch = useDispatch();

  /* SETTING UP REDIRECT */
  const redirect = location.search ? location.search.split("=")[1] : "/";

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  /* HANDLERS */
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password && !email) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
    }
    if (!password) {
      setMessage("Vui lòng nhập  mật khẩu");
    }
    else if (!email) {
      setMessage("Vui lòng nhập địa chỉ email ");
    }
    else {
      setMessage(null);
      /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR LOGIN */
      dispatch(login(email, password));
    }
  };

  return (
    <div style={{
      padding: '340px 10%',
      height: '600px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'url("https://phongkhachdep.org/wp-content/uploads/2021/09/Phong-ca%CC%81ch-no%CC%A3%CC%82i-tha%CC%82%CC%81t-co%CC%82%CC%89-die%CC%82%CC%89n.jpeg")',
      backgroundSize: 'cover', /* Chỉnh kích thước hình ảnh để nó phù hợp với phần tử */
      backgroundPosition: 'center' /* Đảm bảo hình ảnh được căn giữa phần tử */
    }}>
      <Grid container style={{
        margin: '0px', padding: '0px 0px 0px px', maxWidth: '800px',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
      }}>
        <Grid item xs={12} md={7}>
          <h1 style={{ display: 'flex', justifyContent: "center" }}>Đăng nhập</h1>
          <FormContainer>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"

                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Mật Khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"

                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Đăng nhập
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                {/* ?{" "} */}
                <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                  Đăng kí tài khoản
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Grid>
        <Grid item xs={0} md={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', }}>
          <HiddenGridItem>
            <img style={{
              height: '400px',
              borderTopRightRadius: '21px',
              borderBottomRightRadius: '20px',
              boxShadow: 'rgba(17, 17, 26, 0.1) 0px 1px 0px',
            }} src={'https://i.pinimg.com/564x/33/27/03/332703300c2d20dbb0fcd2fbb8188ec2.jpg'} />
          </HiddenGridItem>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginScreen;
