import React from 'react';

import { useSelector } from 'react-redux';

import { getIsLoading } from '../../redux/postsRedux';

import LatestPosts from '../LatestPosts/LatestPosts';
import Hero from '../Hero/Hero';
import Spinner from '../Spinner/Spinner';

import Container from '@material-ui/core/Container';

import styles from './Homepage.module.scss';

const Homepage = () => {
  const load = useSelector(state => getIsLoading(state));

  const isLoading = () => !load.active ? (<LatestPosts />) :
    (<div className={styles.spinner}><Spinner /></div>);

  return (
    <div className={styles.root}>
      <Hero/>
      <Container>
        <div className={styles.content}>
          {isLoading()}
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
