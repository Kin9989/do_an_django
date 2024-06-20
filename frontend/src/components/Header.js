
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from "./BodyHomePage/ImgBaner/logo.png";

import React, { useEffect } from "react";

/* REACT BOOTSTRAP */
import { Navbar, Nav, NavDropdown, } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { logout } from "../actions/userActions";
import { listCategories } from "../actions/categoryActions";
/* COMPONENTS */
import SearchBox from "./SearchBox";

import logo from "../logo.png";

import { useHistory } from "react-router-dom";


function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const categoryList = useSelector((state) => state.categoryList);
  const userLogin = useSelector((state) => state.userLogin);
  const history = useHistory();
  const { userInfo } = userLogin;
  const { loading, error, categories } = categoryList;
  /* HANDLER */
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleCategorySelect = (categoryId) => {
    // Điều hướng người dùng đến màn hình hiển thị sản phẩm của danh mục đó
    history.push(`/category/${categoryId}/products`);
  };
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Button size="small">home</Button> */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}> 
        <img style={{ width: "80px" , height:"80px", borderRadius: "50%" , marginRight:"10px"}}  src={Logo} alt="logo"></img>
        </Box>
      
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          onClick={() => history.push("/")}
        >
          
          VIệt Thành
         

          
        </Typography>
        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
{userInfo ? (
                <div></div>
              ) : (
                <Button variant="outlined" size="small"    href="#/register" >
          đăng kí
        </Button>
              )}
        
        {userInfo ? (
                <div></div>
              ) : (
          <Button variant="outlined" size="small" sx={{ ml: 1 }} href="#/login" >
          đăng nhập
        </Button>
              )}
        
        
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto', height:"10px"}}
      >
         <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: "60px",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'hsla(220, 60%, 99%, 0.6)'
                : 'hsla(220, 0%, 0%, 0.7)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
                : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >


            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              
              
              <Button
                variant="text"
                color="info"
                size="small"
                
                href="#/contact"
              >
                LIÊN HỆ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('pricing')}
                href="#/blogs"
              >
                BÀI VIẾT
              </Button>

              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => scrollToSection('features')}
                href="#/products"
              >
                SẢN PHẨM
              </Button>
              <Button variant="text" color="info" size="small">
                    <LinkContainer to="">
                      <NavDropdown title={<span style={{ color: '#0288d1' }}>DANH MỤC</span>} id="basic-nav-dropdown">
                        {loading ? (
                          <NavDropdown.Item>Loading...</NavDropdown.Item>
                        ) : error ? (
                          <NavDropdown.Item>Error! Không thể tải danh mục.</NavDropdown.Item>
                        ) : (
                          categories.map((category) => (
                            <NavDropdown.Item key={category.id} onClick={() => handleCategorySelect(category.id)} style={{ color: 'blue' }}>
                              {category.name}
                            </NavDropdown.Item>
                          ))
                        )}
                      </NavDropdown>
                    </LinkContainer>
              </Button>
              
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
            <LinkContainer to="/cart">
                    <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> 
                    </Nav.Link>
            </LinkContainer>


                           {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.isAdmin && (
                  <LinkContainer  to="/admin/dashboard">
                    <NavDropdown.Item>

                    <i className="fas fa-user"></i> Quản lý web
                    </NavDropdown.Item>
                  </LinkContainer>
      )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Đăng xuất
                  </NavDropdown.Item>

                  {/* <NavDropdown.Item >
                 
                <LinkContainer to="/admin/dashboard">
                  <Nav.Link>
                   
                  </Nav.Link>
                </LinkContainer>
                
        
                  </NavDropdown.Item> */}

                
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

             
            
              


          </Box>
          
          
          
          
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                
         

              

                <MenuItem onClick={() => scrollToSection('features')}  href="#/contact">
                LIÊN HỆ
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('testimonials')}     href="#/blogs">
                BÀI VIẾT
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('highlights')}  href="#/products">
                SẢN PHẨM
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>
               
                    <LinkContainer to="">
                      <NavDropdown title={<span style={{ color: '#0288d1' }}>DANH MỤC</span>} id="basic-nav-dropdown">
                        {loading ? (
                          <NavDropdown.Item>Loading...</NavDropdown.Item>
                        ) : error ? (
                          <NavDropdown.Item>Error! Không thể tải danh mục.</NavDropdown.Item>
                        ) : (
                          categories.map((category) => (
                            <NavDropdown.Item key={category.id} onClick={() => handleCategorySelect(category.id)} style={{ color: 'blue' }}>
                              {category.name}
                            </NavDropdown.Item>
                          ))
                        )}
                      </NavDropdown>
                    </LinkContainer>
              

              
                </MenuItem>
                
                <MenuItem fullWidth>
                {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
                </MenuItem>

                <MenuItem fullWidth>
                {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/admin/dashboard">
                  <Nav.Link>
                    <i className="fas fa-user"></i> ADMIN
                  </Nav.Link>
                </LinkContainer>
                
              )}
                </MenuItem>

                
                <MenuItem>
                  <LinkContainer to="/cart">
                    <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> GIỎ HÀNG
                    </Nav.Link>
                  </LinkContainer>

                

              
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;

// import React, { useEffect } from "react";
// import AppBar from '@mui/material/AppBar';
// /* REACT BOOTSTRAP */
// import { Navbar, Nav, Container, NavDropdown, } from "react-bootstrap";

// /* REACT ROUTER BOOTSTRAP */
// import { LinkContainer } from "react-router-bootstrap";

// /* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

// /* ACTION CREATORS */
// import { logout } from "../actions/userActions";
// import { listCategories } from "../actions/categoryActions";
// /* COMPONENTS */
// import SearchBox from "./SearchBox";

// import logo from "../logo.png";

// import { useHistory } from "react-router-dom";


// function Header() {
//   /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
//   const categoryList = useSelector((state) => state.categoryList);
//   const userLogin = useSelector((state) => state.userLogin);
//   const history = useHistory();
//   const { userInfo } = userLogin;
//   const { loading, error, categories } = categoryList;
//   /* HANDLER */
//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   useEffect(() => {
//     dispatch(listCategories());
//   }, [dispatch]);

//   const handleCategorySelect = (categoryId) => {
//     // Điều hướng người dùng đến màn hình hiển thị sản phẩm của danh mục đó
//     history.push(`/category/${categoryId}/products`);
//   };
//   return (
//     <header >
//       {/* <AppBar
//       // position="fixed"
//       // sx={{
//       //   boxShadow: 0,
//       //   bgcolor: 'transparent',
//       //   backgroundImage: 'none',
//       //   mt: 0,
//       // }}
//       >
       
//       </AppBar> */}
//       <Navbar bg="" variant="" expand="sm" collapseOnSelect style={{ height: '69px' }}>
//         <Container>



//           <Navbar.Toggle aria-controls="navbarScroll" />

//           <Navbar.Collapse id="navbarScroll">
//             <LinkContainer to="/">
//               <Navbar.Brand>
//                 {/* <img alt=" Logo web" /> */} VIỆT THÀNH
//               </Navbar.Brand>
//             </LinkContainer>

//             <LinkContainer to="/">
//               <Nav.Link>
//                 TRANG CHỦ
//               </Nav.Link>
//             </LinkContainer>

//             <LinkContainer to="/login">
//               <Nav.Link>
//                 GIỚI THIỆU
//               </Nav.Link>
//             </LinkContainer>

//             <LinkContainer to="">
//               <NavDropdown title="DANH MỤC" id="basic-nav-dropdown">
//                 {loading ? (
//                   <NavDropdown.Item>Loading...</NavDropdown.Item>
//                 ) : error ? (
//                   <NavDropdown.Item>Error! Không thể tải danh mục.</NavDropdown.Item>
//                 ) : (
//                   categories.map((category) => (
//                     <NavDropdown.Item key={category.id} onClick={() => handleCategorySelect(category.id)}>
//                       {category.name}
//                     </NavDropdown.Item>
//                   ))
//                 )}
//               </NavDropdown>
//             </LinkContainer>

//             <Nav
//               className="ms-auto my-2 my-lg-0"
//               style={{ maxHeight: "100px" }}
//               navbarScroll
//             ><SearchBox />
//               <LinkContainer to="/cart">
//                 <Nav.Link>
//                   <i className="fas fa-shopping-cart"></i> GIỎ HÀNG
//                 </Nav.Link>
//               </LinkContainer>

//               {userInfo ? (
//                 <NavDropdown title={userInfo.name} id="username">
//                   <LinkContainer to="/profile">
//                     <NavDropdown.Item>Profile</NavDropdown.Item>
//                   </LinkContainer>

//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <i className="fas fa-user"></i> Login
//                   </Nav.Link>
//                 </LinkContainer>
//               )}

//               {userInfo && userInfo.isAdmin && (
//                 <LinkContainer to="/admin">
//                   <Nav.Link>
//                     <i className="fas fa-user"></i> ADMIN
//                   </Nav.Link>
//                 </LinkContainer>
//                 // <NavDropdown title="Admin" id="adminmenu">
//                 //   <LinkContainer to="/admin/userlist">
//                 //     <NavDropdown.Item>Users</NavDropdown.Item>
//                 //   </LinkContainer>

//                 //   <LinkContainer to="/admin/category/create">
//                 //     <NavDropdown.Item>Categories</NavDropdown.Item>
//                 //   </LinkContainer>

//                 //   <LinkContainer to="/admin/productlist">
//                 //     <NavDropdown.Item>Products</NavDropdown.Item>
//                 //   </LinkContainer>

//                 //   <LinkContainer to="/admin/orderlist">
//                 //     <NavDropdown.Item>Orders</NavDropdown.Item>
//                 //   </LinkContainer>
//                 // </NavDropdown>
//               )}
//             </Nav>

//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//     </header>
//   );
// }

// export default Header;
