import React from "react";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const BandCollab = () => {
    return (
        <div className="">

            <Grid container spacing={2} style={{ margin: '20px' }}>
                <Grid item xs={3} >
                    <a href="https://onlinestore.thaicong.com/product-brands/baccarat/" title="Brand-Baccarat">
                        <img style={{ width: "300px" }} src="https://onlinestore.thaicong.com/wp-content/uploads/2020/04/baccarat-logo.jpg" alt="Brand-Baccarat" /></a>

                </Grid>
                <Grid item xs={3} >
                    <a href="https://onlinestore.thaicong.com/product-brands/cire-trvdon/" title="Brand-Trudon">
                        <img style={{ width: "300px" }} src="https://onlinestore.thaicong.com/wp-content/uploads/2020/04/trudon-logo.jpg" alt="Brand-Trudon" /></a>

                </Grid>

                <Grid item xs={3} >
                    <a href="https://onlinestore.thaicong.com/product-brands/arcahorn/" title="Brand-Arcahorn">
                        <img style={{ width: "300px" }} src="https://onlinestore.thaicong.com/wp-content/uploads/2020/04/arcahorn-logo.jpg" alt="Brand-Arcahorn" /></a>
                </Grid>
                <Grid item xs={3} >
                    <a href="https://onlinestore.thaicong.com/product-brands/fustenberg/" title="Brand-Furstenberg">
                        <img style={{ width: "300px" }} src="https://onlinestore.thaicong.com/wp-content/uploads/2020/04/fur-logo.jpg" alt="Brand-Furstenberg" /></a>

                </Grid>
                {/* <Grid item xs={3} >
                    <a href="https://onlinestore.thaicong.com/product-brands/riviere/" title="Brand-Riviere">
                        <img style={{ width: "400px" }} src="https://onlinestore.thaicong.com/wp-content/uploads/2020/04/riviere-logo.jpg" alt="Brand-Riviere" /></a>
                </Grid> */}





            </Grid>

        </div>

    );
}

export default BandCollab;