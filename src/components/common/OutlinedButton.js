import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const OutlinedButton = (props) => {

  const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      border: 'solid 2px #ffffff',
      height: 48,
      padding: '0 30px',
      textDecoration: 'none',
      margin: '0 10px',
      boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
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

OutlinedButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default OutlinedButton;
