import React from 'react';
import { useParams } from 'react-router';
import { getPostById, removePostRequest } from '../../../redux/postsRedux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Post.module.scss';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import OutlinedButton from '../../common/OutlinedButton/OutlinedButton';
import { getUser } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const post = useSelector(state => getPostById(state, id));
  const user = useSelector(state => getUser(state));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removePost = () => {
    dispatch(removePostRequest(id));
    navigate('/');
  };

  const editButton  = () => user.role === 'admin' || user.email === post.author
    ?
    <div className={styles.editButton}>
      <Link to={`/post/${id}/edit`} className={styles.link}><OutlinedButton color='#FE6B8B' border='solid 2px #FE6B8B'>Edit Post</OutlinedButton></Link>
      <OutlinedButton color='#FE6B8B' border='solid 2px #FE6B8B' onClick={() => removePost()}>Remove Post</OutlinedButton>
    </div>
    : null;

  return (
    <div className={styles.root}>
      <div className={styles.postContainer}>
        <div className={styles.imageContainer}>
          <img alt={post.title} src={post.image ? `/images/` + post.image : 'https://www.freeiconspng.com/uploads/no-image-icon-1.jpg'}/>
        </div>
        <div className={styles.infoContainer}>
          <h1>{post.title}</h1>
          {post.location && (
            <div className={styles.address}>
              <PlaceOutlinedIcon/>
              <h2>{post.location}</h2>
            </div>
          )}
          <div className={styles.text}>
            <p>{post.text}</p>
          </div>
          <div className={styles.price}>
            <p>{post.price} USD</p>
          </div>
          <div className={styles.contactInfo}>
            <h3>Contact info:</h3>
            <p><span>author:</span> {post.author}</p>
            <p><span>phone number:</span> {post.phone}</p>
          </div>
          <div className={styles.dates}>
            <p>Published:{post.created} {post.updated && (<span>Edited:{post.updated}</span>)}</p>
          </div>
          {post.status === 'draft' && (<p>This post is a draft! Edit to publish.</p>)}
          {editButton()}
        </div>
      </div>
    </div>
  );
};

export default Post;
