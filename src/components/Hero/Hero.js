import React from 'react';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.root}>
      <h1>Welcome to the Bulletin Board</h1>
      <h2>The biggest classified ads service on the internet</h2>
    </div>
  );
};

export default Hero;
