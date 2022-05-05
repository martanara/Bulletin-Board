import React from 'react';
import { useParams } from 'react-router';
import { getPostById } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const Post = () => {

  const { id } = useParams();
  const post = useSelector(state => getPostById(state, String(id)));
  const user = useSelector(state => getUser(state));

  let button;

  if(user === 'admin' || user === 'loggedUser'){
    button = <Link to={`/post/${post.id}/edit`}><Button variant="text">Edit</Button></Link>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={post.title}
      />
      <CardMedia
        component="img"
        height="250"
        image={`/images/` + post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="caption" gutterBottom display="block">
          Published: {post.publishedDate}
        </Typography>
        <Typography variant="caption" gutterBottom display="block">
          Edited: {post.editedDate}
        </Typography>
        <Typography variant="body2">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions>
        {button}
      </CardActions>
    </Card>
  );
};

export default Post;
