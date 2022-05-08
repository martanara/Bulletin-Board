import React from 'react';
import PostsView from '../PostsView/PostsView';
import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../redux/postsRedux';

const MyPosts = () => {
  const posts = useSelector(state => getAllPosts(state));

  return (
    <PostsView posts={posts}/>
  );
};

export default MyPosts;
