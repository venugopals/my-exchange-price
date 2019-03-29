import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';


const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20
  },
  grow: {
    flexGrow: 1,
    textAlign: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textColor: {
    color: '#FFFFFF'
  }
};

function footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
                 All Rights Reserved -2019
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(footer);