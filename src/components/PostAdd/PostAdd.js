import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addPostRequest } from '../../redux/postsRedux';

import PostForm from '../PostForm/PostForm';

const PostAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = post => {
    dispatch(addPostRequest(post));
    navigate('/myposts');
  };

  return (
    <PostForm
      action={handleSubmit}
      actionText='add'
    />
  );
};

export default PostAdd;
