import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';

export default function Row(props) {
  const { row } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    link: {
      color: '#58a6ff',
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content',
      '& > svg': {
        marginRight: 4,
      },
      '&:hover': {
        textDecoration: 'underline',
      }
    },
    boxDesc: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    description: {
      fontSize: '.7rem',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row" width={150}>
          <a href="https://nt.digital/" target="_blank" rel="noreferrer" className={classes.link}>
            <LinkIcon /> 
            {row.full_name || 'undefined'}
          </a>
        </TableCell>
        <TableCell align="right">{row.language}</TableCell>
        <TableCell align="right">{row.stargazers_count}</TableCell>
        <TableCell align="right">{row.forks_count}</TableCell>
        <TableCell align="right">{new Date(row.pushed_at).toLocaleDateString('pt-br')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.boxDesc} colSpan={6}>
          <Box margin={1}>
            <Typography variant="caption" component="div" className={classes.description}>
              {row.description || ''}
            </Typography>
            <Typography variant="caption" component="div" className={classes.description}>
              {`Stars: ${row.stargazers_count} - Forks: ${row.forks_count} - Última Atualização: ${new Date(row.pushed_at).toLocaleDateString('pt-br')}`}
            </Typography>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
