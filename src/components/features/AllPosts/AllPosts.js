import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAll } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/usersRedux';

import { Grid, Box, Button } from '@material-ui/core/';

const AllPosts = () => {
  const posts = useSelector(state => getAll(state));
  const user = useSelector(state => getUser(state));

  const buttonElement = () => user === 'admin' || user === 'loggedUser'
    ? <Link to={`/post/add`}><Button variant="text">Add Post</Button></Link>
    : null;

  return (
    <Box>
      <h2>All posts:</h2>
      <Grid container spacing={4}>
        <ul>
          {
            posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}><Button variant="outlined">{post.title}</Button></Link>
              </li>
            ))
          }
        </ul>
        {buttonElement()}
      </Grid>
    </Box>
  );
};

export default AllPosts;

