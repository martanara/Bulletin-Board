import React from 'react';

import { useParams } from 'react-router';

import { useNavigate, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { updatePostRequest } from '../../redux/postsRedux';
import { getPostById } from '../../redux/postsRedux';

import PostForm from '../PostForm/PostForm';

const PostEdit = () => {
  const { id } = useParams();
  const postData = useSelector(state => getPostById(state, id));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = post => {
    dispatch(updatePostRequest(post, id));
    navigate('/myposts');
  };

  if (!postData) return <Navigate to='/' />;
  return (
    <PostForm
      action={handleSubmit}
      actionText='edit'
      title={postData.title}
      text={postData.text}
      created={postData.created}
      updated={postData.updated}
      status={postData.status}
      image={postData.image}
      price={postData.price}
      phone={postData.phone}
      location={postData.location}
    />
  );
};

export default PostEdit;


