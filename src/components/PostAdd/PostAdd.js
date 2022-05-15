import React from 'react';

import { Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { getLoggedUser} from '../../redux/usersRedux';
import { addPostRequest } from '../../redux/postsRedux';

import PostForm from '../PostForm/PostForm';

import styles from './PostAdd.module.scss';

const PostAdd = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => getLoggedUser(state));

  const handleSubmit = post => {
    dispatch(addPostRequest(post));
  };

  if (!loggedInUser) return <Navigate to='/' />;
  return (
    <div className={styles.root}>
      <PostForm
        action={handleSubmit}
        actionText='add'
      />
    </div>
  );
};

export default PostAdd;
