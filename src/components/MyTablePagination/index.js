import React from 'react';
import { makeStyles, TablePagination } from '@material-ui/core';
import { useAppValue, useDispatchSetAppValue } from 'redux/hooks/app';
import TablePaginationActions from 'components/TablePaginationActions';

export default function MyTablePagination(props) {

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      flexDirection: 'row',
      [theme.breakpoints.down(600)]: {
        flexDirection: 'column',
      }
    }
  }));

  const classes = useStyles();

  const page = useAppValue('page');
  const setPage = useDispatchSetAppValue('page');
  const totalPages = useAppValue('totalPages');
  const perPage = useAppValue('perPage');
  const setPerPage = useDispatchSetAppValue('perPage');
  
  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50, 100]}
      classes={{
        toolbar: classes.toolbar,
      }}
      labelRowsPerPage="Reposiórios por página"
      count={totalPages}
      rowsPerPage={perPage}
      page={page}
      labelDisplayedRows={({ from, to, count }) => (`Exibindo ${from} - ${to} de ${count} ${to >= 1000 ? '*(API Limit: 1000)' : ''}`)}
      onPageChange={(e, page) => setPage(page)}
      onRowsPerPageChange={(e) => setPerPage(e.target.value)}
      ActionsComponent={TablePaginationActions}
    />
  );
}
