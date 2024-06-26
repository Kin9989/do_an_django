
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



      <MDBFooter className='' color='white' bgColor='black'>

        <MDBContainer className='p-4 '>
          <section className='mb-4 text-center'>
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

          <section className='mb-4 text-center'>
            <p>
              CHÚNG TÔI LÀ MỘT THƯƠNG HIỆU GIA ĐÌNH VỚI KINH NGHIỆM GẦN 30 NĂM TRONG NGHỀ VÀ ĐÃ CÙNG NGƯỜI BÌNH DƯƠNG TẠO NÊN NHỮNG KHÔNG GIAN SỐNG, KHÔNG GIAN LÀM VIỆC CHÂN THỰC VỚI NHU CẦU CỦA MÌNH.
            </p>
          </section>

          <section className=''>
            <MDBRow>

              <MDBCol lg='6' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white'>Liên hệ</h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Showroom : 160/63 Phan Huy Ich  P.15 / Q.Gò Vấp
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Kho : 160/63 Phan Huy Ich  P.15 / Q.Gò Vấp
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Hotline: 0989 999 999
                    </a>
                  </li>
                  <li>
                    <a href='mailto:kinranx@gmail.com' className='text-white' style={{ textDecoration: 'none' }}>
                      Email: kinranx@gmail.com
                    </a>
                  </li>
                </ul>
              </MDBCol>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white'>Hỗ trợ khách hàng</h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Chính sách đổi trả
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Chính sách bảo mật
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Điều khoản dịch vụ
                    </a>
                  </li>
                  
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase text-white'>Sản phẩm</h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Danh sách loại sản phẩm
                    </a>
                  </li>
                  <li>
                    <a href='#!' className='text-white' style={{ textDecoration: 'none' }}>
                      Tất các sản phẩm
                    </a>
                  </li>

                </ul>
              </MDBCol>
            </MDBRow>
          </section>
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
