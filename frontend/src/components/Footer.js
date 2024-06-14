
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



      <MDBFooter className='text-center' color='white' bgColor='black'>

        <MDBContainer className='p-4'>
          <section className='mb-4'>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>



          <section className='mb-4'>
            <p>
              CHÚNG TÔI LÀ MỘT THƯƠNG HIỆU GIA ĐÌNH VỚI KINH NGHIỆM GẦN 30 NĂM TRONG NGHỀ VÀ ĐÃ CÙNG NGƯỜI BÌNH DƯƠNG TẠO NÊN NHỮNG KHÔNG GIAN SỐNG, KHÔNG GIAN LÀM VIỆC CHÂN THỰC VỚI NHU CẦU CỦA MÌNH.
            </p>
          </section>

          {/* <section className=''>
            <MDBRow>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white '>Links</h5>

                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Angular
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      React
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Vue
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Laravel
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                      Pricing
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Settings
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Help
                    </a>
                  </p>
                </MDBCol>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 4
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white'>Links</h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 4
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white'>Links</h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 3
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white'>
                      Link 4
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section> */}
        </MDBContainer>
        <hr></hr>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright:
          <a className='text-white' href='https://mdbootstrap.com/'>
            MokaTeam
          </a>
        </div>
      </MDBFooter>
    </div>

  );
}

export default Footer;
