import React from 'react';
import { useSelector } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/usersRedux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AllPosts = () => {

  const posts = useSelector(state => getAll(state));
  //console.log(posts);
  const user = useSelector(state => getUser(state));

  let button;

  if(user === 'admin' || user === 'loggedUser'){
    button = <Link to={`/post/add`}><Button variant="text">Add Post</Button></Link>;
  }

  return (
    <Grid container spacing={4}>
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <Link to={`/post/${post.id}`}><Button variant="outlined">{post.title}</Button></Link>
          </li>
        )}
      </ul>
      {button}
    </Grid>
  );
};

export default AllPosts;

