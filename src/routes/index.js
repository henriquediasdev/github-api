import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchRepos from './search-repos';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));


export default function Routes() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* no route control needed */}
      <SearchRepos />
    </div>
  );
};