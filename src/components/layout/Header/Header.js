import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/usersRedux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';

const Header = () => {

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [role, setRole] = useState('guest');

  const handleChange = (event) => {
    dispatch(addUser(event.target.value));
    setRole(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item xs={8}>
            <Link to={`/`}><Button color="inherit">Bulletin Board</Button></Link>
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.formControl}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                onChange={handleChange}
              >
                <MenuItem value={'guest'}>Guest</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
                <MenuItem value={'loggedUser'}>LoggedUser</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Link to={`/myposts`}><Button color="inherit" variant="outlined">My posts</Button></Link>
        </Grid>
        <Grid item xs={2}>
          <Button href="https://www.google.pl/" color="inherit" variant="outlined">Login with Google</Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

