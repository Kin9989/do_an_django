import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* REACT ROUTER DOM */
import { useHistory } from "react-router-dom";
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
function SearchBox() {
  /* STATE */
  const [keyword, setKeyword] = useState("");

  let history =
    useHistory(); /* CAN'T DIRECTLY USE HISTORY AS IT'S NOT AN ACTUAL PAGE SO CAN'T DESTRUCTURE PROPS */

  /* HANDLER */
  const submitHandler = (e) => {
    e.preventDefault();

    // WHEN USER HITS SUBMIT, REDIRECT TO HOME PAGE TO SEE PRODUCTS AND APPEND ?keyword=...IN URL
    if (keyword) {
      history.push(`/products/?keyword=${keyword}&page=1`);
    } else {
      // IF WE HIT SUBMIT WITHOUT KEYWORD, WE DON'T WANT THE USER TO GET REDIRECTED IN THAT CASE RATHER STAY ON WHATEVER PAGE HE WAS
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">

      <Search >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          type="text"
          name="q"
          placeholder="Tìm kiếm SP "
          onChange={(e) => setKeyword(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Form>
    // <Form onSubmit={submitHandler} className="d-flex">
    //   <Form.Control
    //     type="text"
    //     name="q"
    //     onChange={(e) => setKeyword(e.target.value)}
    //     className="mr-sm-2 ml-sm-5"
    //   ></Form.Control>

    //   <Button type="submit" variant="outline-success" className="p-2 mx-sm-2">
    //     Search
    //   </Button>
    // </Form>
  );
}

export default SearchBox;
