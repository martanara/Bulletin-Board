import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { getLoggedUser, addUserRequest, loginUser, logoutUser } from '../../redux/usersRedux';

import { Link } from 'react-router-dom';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

import styles from './Header.module.scss';

const useStyles = makeStyles((theme) => ({
  whiteColor: {
    color: theme.palette.common.white,
  },
  selectMenu: {
    color: theme.palette.common.white,
  },
  label: {
    color: theme.palette.common.white,
  },
  underline: {
    borderBottom: `2px solid ${theme.palette.common.white}`,
  },
}));

const Header = () => {
  const classes = useStyles();

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector(state => getLoggedUser(state));

  const [role, setRole] = useState('guest');


  useEffect(() => {
    if(role === 'loggedUser'){
      const user = {
        name: 'Logged User',
        email: 'loggedUser@example.com',
        role: 'loggedUser',
      };
      dispatch(loginUser(user));
      navigate('/myposts');
    } else {
      dispatch(logoutUser());
      navigate('/');
    }
  // eslint-disable-next-line
  }, [role]);


  const loginGoogle = (res) => {
    const { email, name } = res.profileObj;
    const user = { name, email, role: 'googleUser'};
    dispatch(addUserRequest(user));
    dispatch(loginUser(user));
    navigate('/myposts');
  };

  const responseGoogle = (res) => {
    console.log(res);
  };

  const logoutGoogle = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const loginGoogleButton = () => !loggedInUser.role ?
    (
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={loginGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        className={styles.navItem}
      ></GoogleLogin>
    )
    : null;

  const loginSelect = () => !loggedInUser.role || loggedInUser.role !== 'googleUser' ?
    (
      <FormControl classes={{ root: classes.whiteColor}} className={styles.navSelect}>
        <InputLabel id="role-select-label" classes={{ root: classes.whiteColor }}>Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={role}
          onChange={e => setRole(e.target.value)}
          classes={{
            root: classes.whiteColor,
            icon: classes.whiteColor,
            select: classes.underline,
          }}
        >
          <MenuItem value={'guest'}>Guest</MenuItem>
          <MenuItem value={'loggedUser'}>LoggedUser</MenuItem>
        </Select>
      </FormControl>
    )
    : null;

  const logoutGoogleButton = () => loggedInUser.role === 'googleUser' ?
    (
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={logoutGoogle}
        className={styles.navItem}
      >
      </GoogleLogout>
    )
    : null;

  return (
    <div className={styles.root}>
      <Link to={`/`} className={styles.headerLink}><h1>Bulletin Board</h1></Link>
      <div className={styles.navlinks}>
        <Link to={`/allposts`} className={styles.link}>All posts</Link>
        <Link to={`/myposts`} className={styles.link}>My posts</Link>
        {loginGoogleButton()}
        {logoutGoogleButton()}
        {loginSelect()}
      </div>
    </div>
  );
};

export default Header;
