import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container  direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={7} md={9} lg={10}>
            <Typography variant="h6" color="inherit">
                Bulletin Board
            </Typography>
          </Grid>
          <Grid item xs={5} md={3} lg={2}>
            <Button href="https://www.google.pl/" color="inherit" variant="outlined">Login with Google</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

