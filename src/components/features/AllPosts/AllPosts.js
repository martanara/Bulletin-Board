import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAll } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/usersRedux';

import { Grid, Box, Button } from '@material-ui/core/';

import SmallCard from '../../common/SmallCard/SmallCard';

const AllPosts = () => {
  const posts = useSelector(state => getAll(state));
  const user = useSelector(state => getUser(state));

  const buttonElement = () => user === 'admin' || user === 'loggedUser'
    ? <Link to={`/post/add`}><Button variant="text">Add Post</Button></Link>
    : null;

  return (
    <Box sx={{ width: '80%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}><h2>All posts:</h2></Grid>
        {posts.map(post => (
          <Grid item xs={6} md={4} key={post.id}>
            <SmallCard
              id={post.id}
              title={post.title}
              description={post.description}
              publishedDate={post.publishedDate}
              editedDate={post.editedDate}
              email={post.email}
              status={post.status}
              image={post.image}
              price={post.price}
              phoneNumber={post.phoneNumber}
              city={post.city}
            />
          </Grid>
        ))}
      </Grid>
      {buttonElement()}
    </Box>
  );
};

export default AllPosts;


