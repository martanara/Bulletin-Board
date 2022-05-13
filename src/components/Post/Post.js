import React from 'react';
import { useParams } from 'react-router';
import { getPostById, removePostRequest } from '../../redux/postsRedux';
import { getLoggedUser } from '../../redux/usersRedux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Post.module.scss';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import OutlinedButton from '../OutlinedButton/OutlinedButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import utils from '../../utils';
import Container from '@material-ui/core/Container';

const Post = () => {
  const { id } = useParams();
  const post = useSelector(state => getPostById(state, id));
  const loggedInUser = useSelector(state => getLoggedUser(state));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removePost = () => {
    dispatch(removePostRequest(id));
    navigate('/');
  };

  const editButton  = () => loggedInUser.email === post.email
    ?
    <div className={styles.editButton}>
      <Link to={`/post/${id}/edit`} className={styles.link}><OutlinedButton color='#ac7871' border='solid 2px #ac7871'>Edit Post</OutlinedButton></Link>
      <OutlinedButton color='#ac7871' border='solid 2px #ac7871' onClick={() => removePost()}>Remove Post</OutlinedButton>
    </div>
    : null;

  return (
    <Container>
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
              <p><span>email:</span> {post.email}</p>
              <p><span>phone number:</span> {post.phone}</p>
            </div>
            <div className={styles.dates}>
              <p>Published:{utils.dateToStr(post.created)} {post.updated && (<span>Edited:{utils.dateToStr(post.updated)}</span>)}</p>
            </div>
            {post.status === 'draft' && (<p>This post is a draft! Edit to publish.</p>)}
            {editButton()}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Post;
