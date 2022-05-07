import React from 'react';
import { useSelector } from 'react-redux';

import { getAllPublished } from '../../../redux/postsRedux';

import { Grid } from '@material-ui/core/';

import SmallCard from '../../common/SmallCard/SmallCard';

import styles from './AllPosts.module.scss';

const AllPosts = () => {
  const posts = useSelector(state => getAllPublished(state));

  return (
    <div className={styles.root}>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item xs={6} md={4} key={post._id}>
            <SmallCard
              id={post._id}
              title={post.title}
              text={post.text}
              created={post.created}
              updated={post.updated}
              author={post.author}
              status={post.status}
              image={post.image}
              price={post.price}
              phone={post.phone}
              location={post.location}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllPosts;


