import React from 'react';
import PostsView from '../PostsView/PostsView';
import { useSelector } from 'react-redux';
import { getAllPublished } from '../../redux/postsRedux';
import Container from '@material-ui/core/Container';

const AllPosts = () => {
  const posts = useSelector(state => getAllPublished(state));

  return (
    <Container>
      <PostsView posts={posts}/>
    </Container>
  );
};

export default AllPosts;


