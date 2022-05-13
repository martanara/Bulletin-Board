import React from 'react';
import styles from './LatestPosts.module.scss';
import { useSelector } from 'react-redux';
import { getAllPublished } from '../../redux/postsRedux';
import SmallCard from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import CommonButton from '../CommonButton/CommonButton';
import { Grid } from '@material-ui/core/';

const LatestPosts = () => {
  const posts = useSelector(state => getAllPublished(state));
  const latestPosts = posts.slice(0, 3);

  return (
    <div className={styles.root}>
      <h2>Latest posts</h2>
      <Grid container spacing={3}>
        {latestPosts.map(post => (
          <Grid item xs={12} sm={4} key={post._id}>
            <SmallCard
              id={post._id}
              title={post.title}
              text={post.text}
              created={post.created}
              updated={post.updated}
              email={post.email}
              status={post.status}
              image={post.image}
              price={post.price}
              phone={post.phone}
              location={post.location}
            />
          </Grid>
        ))}
      </Grid>

      <Link to={`/allposts`} className={styles.link}><CommonButton>See all</CommonButton></Link>
    </div>
  );
};

export default LatestPosts;
