import React from 'react';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AllPosts = () => {

  const posts = useSelector(state => getAll(state));

  return (
    <Grid container spacing={4}>
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <Link to={`/post/${post.id}`}><Button variant="outlined">{post.title}</Button></Link>
          </li>
        )}
      </ul>
    </Grid>
  );
};

export default AllPosts;

