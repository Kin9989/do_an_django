/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header";


import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import AdminPage from "./screens/AdminPage";


import CategoryListScreen from "./screens/CategoryListScreen";
import CategoryCreateScreen from "./screens/CategoryCreateScreen";

import CategoryByProductScreen from "./screens/CategoryByProductScreen";

import AllProductSreen from "./screens/AllProductSreen"

import OrderListScreen from "./screens/OrderListScreen";
import ContactScreen from "./screens/ContactScreen";
import BlogScreen from "./screens/BlogScreen";


import ResetPasswordConfirmSreen from "./screens/ResetPasswordConfirmSreen"
import ResetPasswordScreen from "./screens/ResetPasswordScreen"

// payment
import PaymentForm from "./screens/Payment/payment";
import PaymaentReturn from "./screens/Payment/PaymaentReturn"



import Caurousel from "../src/components/BodyHomePage/Caurousel";
// import Abc from "../src/screens/abc"
/* REACT ROUTER */
import { HashRouter as Router, Route } from "react-router-dom";
import BlogDetailScreen from "./screens/BlogDetailScreen";

function App() {
  return (
    <Router>
      <Header />
      {/* <Caurousel></Caurousel> */}
      {/* <Headera /> */}


      <Route exact path="/" component={HomeScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/contact" component={ContactScreen} />
      <Route path="/blogs" component={BlogScreen} />
      <Route path="/bl/:id" render={({ match }) => <BlogDetailScreen id={match.params.id} />} />




      <Route path="/reset_password" component={ResetPasswordScreen} />
      <Route path="/comfirm_password" component={ResetPasswordConfirmSreen} />

      <Route path="/register" component={RegisterScreen} />

      <Route path="/profile" component={ProfileScreen} />

      <Route path="/shipping" component={ShippingScreen} />

      <Route path="/payment" component={PaymentScreen} />

      <Route path="/placeorder" component={PlaceOrderScreen} />

      <Route path="/order/:id" component={OrderScreen} />


      <Route path="/products" component={AllProductSreen} />

      <Route path="/product/:id" component={ProductScreen} />


      <Route path="/cart/:id?" component={CartScreen} />


      <Route path="/admin" component={AdminPage} />

      <Route path="/category/:id/products" component={CategoryByProductScreen} />

      {/* Payment  */}
      <Route path="/pay/:id/paymentform" component={PaymentForm} />
      <Route path="/pay/success" component={PaymaentReturn} />





      {/* <Route path="/admin/userlist" component={UserListScreen} />
      <Route path="/admin/user/:id/edit" component={UserEditScreen} /> */}

      {/* admin manage product  */}
      {/* <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
      <Route path="/admin/product/create" component={ProductCreateScreen} />
      <Route path="/admin/productlist" component={ProductListScreen} /> */}


      {/* admin manage category  */}
      {/* <Route path="/admin/categorieslist" component={CategoryListScreen} />
      <Route path="/admin/category/create" component={CategoryCreateScreen} /> */}
      {/* <Route path="/admin/category/:id/edit" component={CategoryCreateScreen} /> */}


      {/* admin manage oder */}
      {/* <Route path="/admin/orderlist" component={OrderListScreen} /> */}





      {/* </main> */}
      {/* </Container> */}
      <Footer />
    </Router>
  );
}

export default App;
