import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';
import Row from 'components/Row';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAppValue, useDispatchSetAppValue } from 'redux/hooks/app';
import { useDispatchGet } from 'redux/hooks/fetch';

export default function MyTableContainer(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      '& > *': {
        borderBottom: 'unset',
      },
    },
    list: {
      display: 'flex',
      maxHeight: '60vh',
      flexDirection: 'column',
      marginBottom: 10,
      width: '98%',
    },
  }));

  const get = useDispatchGet();
  const classes = useStyles();

  const setLoading = useDispatchSetAppValue('loading');
  const search = useAppValue('search');
  const language = useAppValue('language');
  const user = useAppValue('user'); // search by user/organization
  const page = useAppValue('page');
  const setPage = useDispatchSetAppValue('page');
  const setTotalPages = useDispatchSetAppValue('totalPages');
  const perPage = useAppValue('perPage');
  const setRepos = useDispatchSetAppValue('repos');

  const sort = useAppValue('sort');
  const setSort = useDispatchSetAppValue('sort');
  const order = useAppValue('order');
  const setOrder = useDispatchSetAppValue('order');
  const repos = useAppValue('repos');

  useEffect(() => {
    if (!!language && !!search) setRepos(null);
    if (sort === 'stars') return;
    if (page > 0) return;
    // github api requires at least one search parameter 
    if (search !== "" || language !== "" || user !== "") {
      setLoading(true);
      let url = '/search/repositories?q=';
      if (search !== "") {
        url += `${search}`;
      }
      if (language !== "") {
        let lastChar = url[url.length - 1];
        url += lastChar !== '=' ? '+' : ''; // concat get params
        url += `language:${language}`;
      }
      if (user !== "") {
        let lastChar = url[url.length - 1];
        url += lastChar !== '=' ? '+' : ''; // concat get params
        url += `user:${user}`;
      }
      url += `&page=${page + 1}`;
      url += `&per_page=${20}`; // perPage
      url += `&sort=${sort}`;
      url += `&order=${order}`;
      get(url)
        .then((res) => {
          console.log(res);
          setRepos([])
          setRepos(res.items)
          setTotalPages(Math.ceil(res.total_count / 20)); // perPage
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          // catch errors
          if (err.toString().includes("first 1000"))
            alert("Só é possível listar os primeiros 1000 resultados, aprimore seus filtros");
          else if (err.toString().includes("rate limit exceeded"))
            alert("Muitas requisições, aguarde um tempo");
        })
    }
  }, [get, language, user, order, search, page, perPage, sort, setLoading, setRepos, setTotalPages]);

  const handleSort = (column) => {
    if (sort === column) {
      if (order === 'asc') {
        setSort('best-match');
        setOrder('desc');
      } else {
        setOrder('asc')
      }
    } else {
      setSort(column);
      setOrder('desc');
    }
  }

  useEffect(() => {
    setPage(0);
  }, [search, user, language, setPage]);
  
  return (
    <Paper className={classes.list}>
      <TableContainer component={Paper}>
        <Table stickyHeader size="medium" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                Repositório
              </TableCell>
              <TableCell align="right">Lingagem</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sort === 'stars'}
                  direction={sort === 'stars' ? order : 'desc'}
                  onClick={() => handleSort('stars')}
                >
                  Estrelas
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sort === 'forks'}
                  direction={sort === 'forks' ? order : 'desc'}
                  // onClick={() => handleSort('forks')}
                >
                  Bifurcações
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={sort === 'updated'}
                  direction={sort === 'updated' ? order : 'desc'}
                  onClick={() => handleSort('updated')}
                >
                  Atualização
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos.map((row) => (
              <Row key={row.full_name} row={row} />
            ))}
            {repos.length > 1 && <Row key={'undefined'} row={{}} />}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
