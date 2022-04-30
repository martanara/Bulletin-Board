import React from 'react';
import styles from './Homepage.module.scss';
import AllPosts from '../../features/AllPosts/AllPosts';

const Homepage = () => {
  return (
    <div className={styles.root}>
      <h2>Homepage</h2>
      <AllPosts/>
    </div>
  );
};

export default Homepage;
