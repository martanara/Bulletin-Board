import React from 'react';

import { useParams } from 'react-router';

import { useNavigate, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { updatePostRequest } from '../../redux/postsRedux';
import { getPostById } from '../../redux/postsRedux';

import PostForm from '../PostForm/PostForm';

import styles from './PostEdit.module.scss';

const PostEdit = () => {
  const { id } = useParams();
  const postData = useSelector(state => getPostById(state, id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = post => {
    dispatch(updatePostRequest(post, id));
    navigate('/myposts');
  };

  if (!postData) return <Navigate to='/' />;
  return (
    <div className={styles.root}>
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
    </div>
  );
};

export default PostEdit;


