import React from 'react';
import { useParams } from 'react-router';
import { getPostById } from '../../../redux/postsRedux';
import { useSelector } from 'react-redux';
import styles from './Post.module.scss';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import OutlinedButton from '../../common/OutlinedButton/OutlinedButton';
import { getUser } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const post = useSelector(state => getPostById(state, String(id)));

  const user = useSelector(state => getUser(state));

  const editButton  = () => user === 'admin' || user === 'loggedUser'
    ?
    <div className={styles.editButton}>
      <Link to={`/post/${post.id}/edit`} className={styles.link}><OutlinedButton color='#FE6B8B' border='solid 2px #FE6B8B'>Edit Post</OutlinedButton></Link>
    </div>
    : null;

  return (
    <div className={styles.root}>
      <div className={styles.postContainer}>
        <div className={styles.imageContainer}>
          <img alt="post.title" src={post.image ? `/images/` + post.image : 'https://www.freeiconspng.com/uploads/no-image-icon-1.jpg'}/>
        </div>
        <div className={styles.infoContainer}>
          <h1>{post.title}</h1>
          {post.city && (
            <div className={styles.address}>
              <PlaceOutlinedIcon/>
              <h2>{post.city}</h2>
            </div>
          )}
          <div className={styles.description}>
            <p>{post.description}</p>
          </div>
          <div className={styles.price}>
            <p>{post.price} USD</p>
          </div>
          <div className={styles.contactInfo}>
            <h3>Contact info:</h3>
            <p><span>email:</span> {post.email}</p>
            <p><span>phone number:</span> {post.phoneNumber}</p>
          </div>
          <div className={styles.dates}>
            <p>Published:{post.publishedDate} {post.editedDate && (<span>Edited:{post.editedDate}</span>)}</p>
          </div>
          {post.status === 'draft' && (<p>This post is a draft! Edit to publish.</p>)}
          {editButton()}
        </div>
      </div>
    </div>
  );
};

export default Post;
