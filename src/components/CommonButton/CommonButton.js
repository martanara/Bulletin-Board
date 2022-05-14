import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';

const CommonButton = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
      borderRadius: 3,
      border: 0,
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: '0 10px',
    },
    label: {
      color: `${theme.palette.common.white}`,
      fontSize: 15,
    },
  }));

  const classes = useStyles();
  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

CommonButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default CommonButton;
