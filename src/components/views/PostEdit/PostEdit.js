import React from 'react';
import PostForm from '../../features/PostForm/PostForm';
import { updatePostRequest } from '../../../redux/postsRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPostById } from '../../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PostEdit = () => {

  const { id } = useParams();
  const postData = useSelector(state => getPostById(state, String(id)));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = post => {
    dispatch(updatePostRequest({ ...post, id: String(id) }));
    navigate('/');
  };

  if (!postData) return <Navigate to='/' />;
  return (
    <PostForm
      action={handleSubmit}
      title={postData.title}
      text={postData.text}
      created={postData.created}
      updated={postData.updated}
      author={postData.author}
      status={postData.status}
      image={postData.image}
      price={postData.price}
      phone={postData.phone}
      location={postData.location}
    />
  );
};

export default PostEdit;


