import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Container from '@material-ui/core/Container';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => {

  return (
    <div className={styles.root}>
      <Header/>
      <Container>
        {children}
      </Container>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
