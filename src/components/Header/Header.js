import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/usersRedux';
import { getUser } from '../../redux/usersRedux';
import { Link } from 'react-router-dom';
import { Select, MenuItem } from '@material-ui/core';
import CommonButton from '../CommonButton/CommonButton';
import styles from './Header.module.scss';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const Header = () => {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const user = useSelector(state => getUser(state));

  const dispatch = useDispatch();

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
    <div>
      <Link to={`/myposts`} className={styles.link}><CommonButton>My posts</CommonButton></Link>
      <Link to={`/post/add`} className={styles.link}><CommonButton>Add Post</CommonButton></Link>
    </div>
    : null;

  return (
    <div className={styles.root}>
      <div>
        <Link to={`/`} className={styles.link}><h1>Bulletin Board</h1></Link>
      </div>
      <div className={styles.navlinks}>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={userRole}
          onChange={handleChange}
        >
          <MenuItem value={'guest'}>Guest</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'loggedUser'}>LoggedUser</MenuItem>
        </Select>
        <Link to={`/allposts`} className={styles.link}><CommonButton>All posts</CommonButton></Link>
        {userButtons()}
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        ></GoogleLogin>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logout}
        >
        </GoogleLogout>
      </div>
    </div>
  );
};

export default Header;
