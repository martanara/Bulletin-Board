import React from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/usersRedux';

import { Select, MenuItem } from '@material-ui/core';

import CommonButton from '../../common/CommonButton';
import OutlinedButton from '../../common/OutlinedButton';

import styles from './Header.module.scss';


const Header = () => {

  const dispatch = useDispatch();

  const [role, setRole] = useState('guest');

  const handleChange = (event) => {
    dispatch(addUser(event.target.value));
    setRole(event.target.value);
  };

  return (
    <div className={styles.navbar}>
      <div>
        <Link to={`/`} className={styles.link}><h1>Bulletin Board</h1></Link>
      </div>
      <div className={styles.navlinks}>
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
        <Link to={`/`} className={styles.link}><CommonButton>All posts</CommonButton></Link>
        <Link to={`/myposts`} className={styles.link}><CommonButton>My posts</CommonButton></Link>
        <a href="https://www.google.pl/" className={styles.link}><OutlinedButton>Login with Google</OutlinedButton></a>
      </div>
    </div>
  );
};

export default Header;

