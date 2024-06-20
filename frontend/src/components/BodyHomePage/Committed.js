
import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

/* REACT-BOOTSTRAP */
// import { Container, Row, Col } from "react-bootstrap";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function Footer() {
    return (
        <div>



            <Grid container spacing={2} style={{ height: '190px' }}>
                <Grid xs={3} style={{ height: '200px' }}>

                    <Item style={{ letterSpacing: '3px', color: 'black' }}>
                        <i class="fa-solid fa-credit-card  fa-2xl"
                            style={{ color: 'black', fontSize: '50px', height: '40px', margin: '50px' }}></i><br></br>
                        THANH TOÁN DỄ DÀNG VÀ<br></br> BẢO MẬT
                    </Item>
                </Grid>

                <Grid xs={3} style={{ height: '200px' }}>
                    <Item style={{ letterSpacing: '3px', color: 'black' }}>
                        <i class="fa-solid fa-truck-fast  fa-2xl"
                            style={{ color: 'black', fontSize: '50px', height: '40px', margin: '50px' }}></i><br></br>
                        GIAO HÀNG ĐẢM BẢO <br></br>TOÀN QUỐC
                    </Item>
                </Grid>

                <Grid xs={3} style={{ height: '200px' }}>
                    <Item style={{ letterSpacing: '3px', color: 'black' }}>
                        <i class="fa-solid fa-phone  fa-2xl"
                            style={{ color: 'black', fontSize: '50px', height: '40px', margin: '50px' }}></i><br></br>
                        HOTLINE 0914938844 <br></br> (10:00 - 19:00)
                    </Item>
                </Grid>

                <Grid xs={3} style={{ height: '200px' }}>
                    <Item style={{ letterSpacing: '3px', color: 'black' }}>
                        <i class="fa-solid fa-check-double  fa-2xl"
                            style={{ color: 'black', fontSize: '50px', height: '40px', margin: '50px' }}></i><br></br>
                        CAM KẾT SẢN PHẨM <br></br>CHÍNH HÃNG
                    </Item>
                </Grid>

            </Grid>
        </div>

    );
}

export default Footer;
