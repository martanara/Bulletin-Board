import React from 'react';
import styles from './Homepage.module.scss';
import AllPosts from '../../features/AllPosts/AllPosts';

const Homepage = () => {
  return (
    <div className={styles.root}>
      <AllPosts/>
    </div>
  );
};

export default Homepage;
