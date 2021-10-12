import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SearchContext } from '../context/search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Signup from '../pages/Signup'
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    textDecoration: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const search = useContext(SearchContext);
  const [input, setInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    search.search(input).then((data) => {
      // console.log("data:  ",data)
      // console.log("data.message",data.message)
      console.log("data.documents",data.data.documents)
      // console.log("data.status_code",data.status_code)
      // search.setData(data.results);
      search.setData(data.data.documents);
      // localStorage.setItem('myData', JSON.stringify(data.results));
      localStorage.setItem('myData', JSON.stringify(data.data.documents));
      setInput('');
      history.push('/results');
    });
  };
  
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Button href="/signup" className={classes.title}>
            <Typography variant="h6" noWrap>
              Signup
            </Typography>
          </Button>
          <Link to="/" className={classes.title}>
            <Typography variant="h6" noWrap>
              Any Anime
            </Typography>
          </Link>
          <form className={classes.search} onSubmit={handleSearch}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}