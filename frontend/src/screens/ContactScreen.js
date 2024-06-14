import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function AlertMessage() {
    return (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
        </Alert>
    );
}
const ContactScreen = () => {
    const form = useRef();
    const HiddenGridItem = styled(Grid)(({ theme }) => ({
        display: 'block', // Hiển thị phần tử trên mọi kích thước màn hình mặc định
        [theme.breakpoints.down('md')]: {
            display: 'none', // Ẩn phần tử trên màn hình với breakpoint md và nhỏ hơn
        },
    }));
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_xb8el9s', 'template_regchy9', form.current, 'W0NGy815UrjjUenUB')
            .then(
                (result) => {
                    console.log('Thành công!', result.text);
                },
                (error) => {
                    console.log('Thất bại...', error.text);
                }
            );
    };

    return (

        <div style={{
            padding: '340px 10%',
            height: '800px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            background: 'url("https://phongkhachdep.org/wp-content/uploads/2021/09/Phong-ca%CC%81ch-no%CC%A3%CC%82i-tha%CC%82%CC%81t-co%CC%82%CC%89-die%CC%82%CC%89n.jpeg")',
            backgroundSize: 'cover', /* Chỉnh kích thước hình ảnh để nó phù hợp với phần tử */
            backgroundPosition: 'center' /* Đảm bảo hình ảnh được căn giữa phần tử */
        }}>
            <Grid container style={{
                margin: '0px', padding: '0px 0px 0px px', minWidth: '800px',
                borderRadius: '20px',
                backgroundColor: 'white',
                boxShadow: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',

            }} >

                <Grid item xs={12} md={6}>
                    <div className='mx-5 my-5'>
                        <h1> Thông tin của chúng tôi</h1>
                        <div>


                            <Grid container spacing={2} columns={12}  >
                                <Grid xs={1} lg={1} className="">
                                    <HomeOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid xs={12} lg={8}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Địa chỉ</span><br />
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={12}  >
                                <Grid xs={1} lg={1} className="">
                                    <PhoneAndroidIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={8}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Sđt</span><br />
                                    <a style={{ fontSize: '18px' }} tel="079 2826 567">079 2826 567 </a>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={12}  >
                                <Grid xs={1} lg={1} className="">
                                    <EmailIcon fontSize="large" />
                                </Grid>
                                <Grid xs={8} lg={8}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Email</span><br />
                                    <a style={{ fontSize: '18px' }} href="mailto:kinranx@gmail.com">kinranx@gmail.com</a>
                                </Grid>
                            </Grid>
                            {/* <Grid container spacing={2} columns={12}  >
                                <Grid xs={1} lg={1} className="">
                                    <FacebookIcon fontSize="large" />
                                </Grid>
                                <Grid xs={8} lg={8}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Fanpage</span><br />
                                    <a href="https://www.facebook.com/thietkedankaraoke" style={{ fontSize: '18px' }} rel="noopener noreferrer" target="_blank">https://www.facebook.com/thietkedankaraoke</a>

                                </Grid>
                            </Grid> */}
                        </div>
                    </div>


                </Grid>
                <Grid item xs={12} md={6}>


                    <Box component="form" ref={form} noValidate onSubmit={sendEmail} sx={{ ml: 5, mt: 5 }}>
                        <h1 style={{}}>Phản hồi</h1>
                        <FormControl defaultValue="" required className='mt-2'>
                            <Label>Tên</Label>
                            <StyledInput placeholder="Nhập tên của bạn" name="user_name" />
                            <HelperText />
                        </FormControl>
                        <FormControl defaultValue="" required className='mt-2'>
                            <Label>Email</Label>
                            <StyledInput placeholder="Nhập email của bạn" name="user_email" />
                            <HelperText />
                        </FormControl>
                        <FormControl defaultValue="" required className='mt-2'>
                            <Label>Số điện thoại</Label>
                            <StyledInput placeholder="Nhập số điện thoại của bạn" name="phone" />
                            <HelperText />
                        </FormControl>

                        <FormControl defaultValue="" required className='mt-2'>
                            <Label>Tin nhắn</Label>

                            <TextareaAutosize placeholder="Nhập tin nhắn của bạn" name="message" />
                            <HelperText />
                        </FormControl>

                        <Button
                            type="submit"

                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Gửi
                        </Button>
                    </Box>

                </Grid>



            </Grid>
        </div>
    );
};

const StyledInput = styled(Input)(
    ({ theme }) => `
  .${inputClasses.input} {
    width: 300px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 300px;
   

    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);


const Label = styled(({ children, className }) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return <p>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
        <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
            {children}
            {required ? ' *' : ''}
        </p>
    );
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>Trường này là bắt buộc.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

export default ContactScreen;
