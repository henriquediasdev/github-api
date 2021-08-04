import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 10,
    width: '100%',
  },
}));

export default function LoadingIndicator(props) {
  const { display } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress hidden={!display} />
    </div>
  );
};

LoadingIndicator.propTypes = {
  display: PropTypes.bool,
};