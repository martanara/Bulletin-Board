import React from 'react';

import { useSelector } from 'react-redux';

import PostsView from '../PostsView/PostsView';
import { getAllPublished } from '../../redux/postsRedux';

import Container from '@material-ui/core/Container';

import styles from './AllPosts.module.scss';

const AllPosts = () => {
  const posts = useSelector(state => getAllPublished(state));

  return (
    <Container className={styles.root}>
      <PostsView posts={posts}/>
    </Container>
  );
};

export default AllPosts;


