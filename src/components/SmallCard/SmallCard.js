import React from 'react';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';

import OutlinedButton from '../OutlinedButton/OutlinedButton';

import PropTypes from 'prop-types';

import styles from './SmallCard.module.scss';

import utils from '../../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    paddingBottom: 10,
  },
}));

const SmallCard = (props) => {
  const isDraft = () => props.status === 'draft' ?
    `This is a draft!! Not published yet.` :
    `Published: ${utils.dateToStr(props.created)}`;


  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={2}>
      <CardHeader
        className={classes.header}
        title={props.title}
        subheader={isDraft()}
      />
      <CardMedia
        component="img"
        height="200"
        image={props.image ? props.image : 'https://www.freeiconspng.com/uploads/no-image-icon-1.jpg'}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/post/${props.id}`} className={styles.link}> <OutlinedButton>Show more</OutlinedButton></Link>
      </CardActions>
    </Card>
  );
};

SmallCard.propTypes = {
  title: PropTypes.string.isRequired,
  created: PropTypes.string,
  updated: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default SmallCard;
