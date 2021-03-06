import React from 'react';

import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core/';

import SmallCard from '../SmallCard/SmallCard';

import styles from './PostsView.module.scss';

const PostsView = ({ posts }) => {
  return (
    <div className={styles.root}>
      <Grid container spacing={3}>
        {posts.map(post => (
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
    </div>
  );
};

PostsView.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsView;


