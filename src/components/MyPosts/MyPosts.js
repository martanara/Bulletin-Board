import React from 'react';
import PostsView from '../PostsView/PostsView';
import { useSelector } from 'react-redux';
import { getMyPosts } from '../../redux/postsRedux';
import { getUser } from '../../redux/usersRedux';
import Container from '@material-ui/core/Container';

const MyPosts = () => {
  const user = useSelector(state => getUser(state));
  const posts = useSelector(state => getMyPosts(state, user));

  return (
    <Container>
      <PostsView posts={posts}/>
    </Container>
  );
};

export default MyPosts;
