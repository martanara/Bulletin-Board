import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';


import styles from './PostAdd.module.scss';

const PostAdd = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>PostAdd</h2>
    {children}
  </div>
);

PostAdd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostAdd;
