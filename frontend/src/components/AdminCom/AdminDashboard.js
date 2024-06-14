import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import CategoryIcon from '@mui/icons-material/Category';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BookIcon from '@mui/icons-material/Book';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
function AdminDashboard() {
    // Dữ liệu cho các tab
    const data = [
        { label: 'Danh Mục', icon: <CategoryIcon />, link: '#/admin/categorieslist' },
        { label: 'Sản Phẩm', icon: <ChairAltIcon />, link: '#/admin/productlist' },
        { label: 'Thông kê', icon: <AssessmentIcon />, link: '#/admin/dashboard' },
        { label: 'Đơn Hàng', icon: <EventNoteIcon />, link: '#/admin/orderlist' },
        { label: 'Người Dùng', icon: <ManageAccountsIcon />, link: '#/admin/userlist' },
        { label: 'Blog', icon: <BookIcon />, link: '#/admin/bloglist' },
        { label: 'Khuyến Mãi ', icon: <ConfirmationNumberIcon />, link: '#/admin/coupon/list/' },



    ];

    return (
        <div>
            <Box

                role="presentation"

            >
                <List style={{ maxheight: '10px' }}>
                    {data.map((tab, index) => (
                        <ListItem key={tab.label} disablePadding>
                            <ListItemButton component="a" href={tab.link}>
                                <ListItemIcon>
                                    {tab.icon}
                                </ListItemIcon>
                                <ListItemText primary={tab.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

            </Box>
        </div>
    );
}
export default AdminDashboard;
