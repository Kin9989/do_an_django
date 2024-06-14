import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


// import page 
import UserListScreen from "./UserListScreen";
import UserCreateScreen from "./UserCreate";

import UserEditScreen from "./UserEditScreen";
import ProductListScreen from "./ProductListScreen";
import ProductEditScreen from "./ProductEditScreen";
import ProductCreateScreen from "./ProductCreateScreen";

import CategoryListScreen from "./CategoryListScreen";
import CategoryCreateScreen from "./CategoryCreateScreen";
import CategoryEditScreen from "./CategoryEditScreen";

import OrderListScreen from "./OrderListScreen";
import OrderEditScreen from "./OrderEditScreen";
import DashBoardSreen from "./Dashboardsreen"
import BlogCreateScreen from "./BlogCreateScreen"
import BlogEditScreen from "./BlogEditScreen"
import BlogListScreen from "./BlogListScreen"

import CouponCreateScreen from "./CouponCreateScreen";
import CouponListScreen from "./CouponListScreen";
import CouponEditScreen from "./CouponEditScreen"




import ProductViewComments from "./ProductViewComments";


import MenuIcon from '@mui/icons-material/Menu';

import { HashRouter as Router, Route } from "react-router-dom";

import AdminDashboard from '../components/AdminCom/AdminDashboard';
import AddPost from './PostAdd';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // State for sidebar visibility

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3} md={2}>
                    <MenuIcon onClick={toggleSidebar} /> {/* MenuIcon to toggle sidebar */}
                    <Box sx={{ marginLeft: sidebarCollapsed ? '-164px' : '0', transition: 'margin .3s', }}>
                        <AdminDashboard></AdminDashboard>
                    </Box>
                </Grid>
                <Grid item xs={9} md={10}>

                    <Router>

                        {/* Apply conditional styling to the container based on sidebar visibility */}
                        <Box sx={{ marginLeft: sidebarCollapsed ? '-164px' : '0', transition: 'margin .3s', }}>
                            {/* admin manage category  */}
                            <Route path="/admin/dashboard" component={DashBoardSreen} />
                            <Route path="/admin/categorieslist" component={CategoryListScreen} />
                            <Route path="/admin/category/create" component={CategoryCreateScreen} />
                            <Route path="/admin/category/:id/edit" component={CategoryEditScreen} />

                            <Route path="/admin/user/create" component={UserCreateScreen} />

                            <Route path="/admin/userlist" component={UserListScreen} />
                            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
                            {/* admin manage product  */}
                            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
                            <Route path="/admin/product/create" component={ProductCreateScreen} />
                            <Route path="/admin/productlist" component={ProductListScreen} />

                            {/* admin manage order */}
                            <Route path="/admin/orderlist" component={OrderListScreen} />
                            <Route path="/admin/:id/orderedit" component={OrderEditScreen} />
                            <Route path="/admin/product/:productId/reviews" component={ProductViewComments} />

                            {/* admin manage blog */}
                            {/* <Route path="/admin/blog" component={OrderListScreen} />
                            <Route path="/admin/:id/blog" component={OrderEditScreen} /> */}
                            <Route path="/admin/blog/create" component={BlogCreateScreen} />
                            <Route path="/admin/bloglist/" component={BlogListScreen} />
                            <Route path="/admin/blog/:id/edit" component={BlogEditScreen} />

                            <Route path="/admin/coupon/create" component={CouponCreateScreen} />
                            <Route path="/admin/coupon/list/" component={CouponListScreen} />
                            <Route path="/admin/coupon/:id/edit" component={CouponEditScreen} />




                        </Box>
                    </Router>
                </Grid>
            </Grid>
        </Box>
    );
}
