import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { updateUser } from '../../redux/usersRedux';
import { getUser } from '../../redux/usersRedux';

import { Link } from 'react-router-dom';

import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CommonButton from '../CommonButton/CommonButton';

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

  const user = useSelector(state => getUser(state));

  const [userRole, setUserRole] = useState('guest');

  const handleChange = (event) => {
    const user = {
      name: 'Logged User',
      email: 'logged@user.com',
      role: event.target.value,
    };
    dispatch(updateUser(user));
    setUserRole(event.target.value);
  };

  const responseGoogle = (res) => {
    const { email, name } = res.profileObj;
    const user = { name, email, role: 'loggedUser'};
    dispatch(updateUser(user));
    setUserRole('loggedUser');
  };

  const logout = () => {
    const user = {
      role: 'guest',
      email: 'gues@gues.com',
      name: 'Guest',
    };
    dispatch(updateUser(user));
    setUserRole('loggedUser');
  };

  const userButtons = () => user.role === 'admin' || user.role === 'loggedUser'
    ?
    <div className={styles.linkDiv}>
      <Link to={`/myposts`} className={styles.link}>My posts</Link>
      <Link to={`/post/add`} className={styles.link}>Add Post</Link>
    </div>
    : null;

  return (
    <div className={styles.root}>
      <div>
        <Link to={`/`} className={styles.link}><h1>Bulletin Board</h1></Link>
      </div>
      <div className={styles.buttons}>
        <div className={styles.linkDiv}>
          <Link to={`/allposts`} className={styles.link}>All posts</Link>
        </div>
        {userButtons()}
        <div className={styles.googleButtons}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            className={styles.googleButtons}
          ></GoogleLogin>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>
        </div>
        <FormControl classes={{
          root: classes.whiteColor,
        }}>
          <InputLabel id="role-select-label" classes={{ root: classes.whiteColor }}>Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={userRole}
            onChange={handleChange}
            classes={{
              root: classes.whiteColor,
              icon: classes.whiteColor,
              select: classes.underline,
            }}
          >
            <MenuItem value={'guest'}>Guest</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'loggedUser'}>LoggedUser</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Header;
// root,select,filled,outlined,selectMenu,disabled,icon,iconOpen,iconFilled,iconOutlined,nativeInput.
