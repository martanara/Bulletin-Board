import React from 'react';
import styles from './Homepage.module.scss';
import LatestPosts from '../LatestPosts/LatestPosts';
import Hero from '../Hero/Hero';
import Container from '@material-ui/core/Container';

const Homepage = () => {
  return (
    <div className={styles.root}>
      <Hero/>
      <Container>
        <LatestPosts/>
      </Container>
    </div>
  );
};

export default Homepage;
