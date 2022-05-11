import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='200px'
      bgcolor='#d3dce6'
    >
      <Typography variant="h4" color="inherit">
        The page you&#39;re looking for doesn&#39;t exist
      </Typography>
    </Box>
  );
};


export default NotFound;
