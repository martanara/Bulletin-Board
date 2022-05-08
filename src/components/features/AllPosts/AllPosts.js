import React from 'react';
import PostsView from '../PostsView/PostsView';
import { useSelector } from 'react-redux';
import { getAllPublished } from '../../../redux/postsRedux';

const AllPosts = () => {
  const posts = useSelector(state => getAllPublished(state));

  return (
    <PostsView posts={posts}/>
  );
};

export default AllPosts;


