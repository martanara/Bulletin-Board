import React from 'react';
import PostForm from '../../features/PostForm/PostForm';
import { updatePost } from '../../../redux/postsRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPostById } from '../../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PostEdit = () => {

  const { id } = useParams();
  const postData = useSelector(state => getPostById(state, parseInt(id)));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = post => {
    dispatch(updatePost({ ...post, id: parseInt(id) }));
    navigate('/');
  };

  if (!postData) return <Navigate to='/' />;
  return (
    <PostForm
      action={handleSubmit}
      actionText={'Edit post'}
      title={postData.title}
      description={postData.description}
      publishedDate={postData.publishedDate}
      editedDate={postData.editedDate}
      email={postData.email}
      status={postData.status}
      image={postData.image}
      price={postData.price}
      phoneNumber={postData.phoneNumber}
      city={postData.city}
    />
  );
};

export default PostEdit;


