import React from 'react';
import PostForm from '../../features/PostForm/PostForm';
import { addPost } from '../../../redux/postsRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostAdd = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = post => {
    dispatch(addPost(post));
    navigate('/');
  };

  return (
    <PostForm
      action={handleSubmit}
    />
  );
};

export default PostAdd;
