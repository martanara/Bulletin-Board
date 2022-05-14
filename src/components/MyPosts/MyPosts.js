import React from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getMyPosts } from '../../redux/postsRedux';
import { getLoggedUser } from '../../redux/usersRedux';

import PostsView from '../PostsView/PostsView';
import CommonButton from '../CommonButton/CommonButton';

import Container from '@material-ui/core/Container';

import styles from './MyPosts.module.scss';

const MyPosts = () => {
  const loggedInUser = useSelector(state => getLoggedUser(state));
  const posts = useSelector(state => getMyPosts(state, loggedInUser.email));

  const welcomeMessage = () => loggedInUser.name ?
    (
      <div>
        <h2>Welcome back {loggedInUser.name}!</h2>
        <h3>You can now add and edit your posts below</h3>
      </div>
    )
    :
    (
      <div>
        <h2>Welcome to Bulletin Board!</h2>
        <h3>Log in with Google or select a role from the dropdown menu in the navigation bar to add and edit posts</h3>
      </div>
    );

  const postAddButton = () => loggedInUser.name &&
    <div className={styles.addButton}>
      <Link to={`/post/add`} className={styles.link}><CommonButton>Add Post</CommonButton></Link>
    </div>;

  return (
    <Container className={styles.root}>
      <div className={styles.welcome}>
        {welcomeMessage()}
        {postAddButton()}
      </div>
      <PostsView posts={posts}/>
    </Container>
  );
};

export default MyPosts;
