import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const CommonButton = (props) => {

  const useStyles = makeStyles({
    root: {
      background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
      borderRadius: 3,
      border: 0,
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: '0 10px',
    },
    label: {
      color: '#ffffff',
      fontSize: 15,
    },
  });

  const classes = useStyles();
  return (
    <Button
      classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }}
    >
      {props.children}
    </Button>
  );
};

CommonButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CommonButton;
