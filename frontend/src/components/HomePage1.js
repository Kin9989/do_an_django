import * as React from 'react';
import { Grid, Button } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from "react-router-dom";

import "./homepage1.css"

export default function FullWidthGrid() {
    return (
        <Grid container>
            <Grid item xs={12} md={6}>
                <div style={{ backgroundColor: 'navy', height: '800px' }}>
                    <div className='background-HP1'></div>
                    <div className='content11111'>
                        <h1 style={{ color: "white" }}>Thiết kế chuẩn gu <br></br>công ty Việt Thành</h1>
                        <Link to="/">
                            <Button style={{ color: "white" }} variant="text" startIcon={<KeyboardDoubleArrowRightIcon />}>
                                Tìm hiểu thêm
                            </Button>
                        </Link>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div style={{ backgroundColor: 'navy', height: '800px' }}>
                    <div className='background-HP2'></div>
                    <div className='content11111'>
                        <h1 style={{ color: "white" }}>Giới thiệu về <br></br>công ty Việt Thành</h1>
                        <Link to="/">
                            <Button style={{ color: "white" }} variant="text" startIcon={<KeyboardDoubleArrowRightIcon />}>
                                Tìm hiểu thêm
                            </Button>
                        </Link>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
