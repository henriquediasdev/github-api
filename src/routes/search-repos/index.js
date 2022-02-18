import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import languages from 'mock/languages.json'; // all languages available on github
import MySelect from 'components/MySelect';
import LoadingIndicator from 'components/LoadingIndicator';
import MyTablePagination from 'components/MyTablePagination';
import { useAppValue, useDispatchSetAppValue } from 'redux/hooks/app';
import MyTableContainer from 'components/MyTableContainer';
import MyTextField from 'components/MyTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  inst: {
    marginTop: 10,
    textAlign: 'center',
    '& > h6': {
      marginTop: 4,
      marginBottom: 0,
      [theme.breakpoints.down(600)]: {
        display: 'none',
      }
    },
  },
  controllers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 10,
    [theme.breakpoints.down(600)]: {
      width: '90%',
      flexDirection: 'column',
    }
  },
  inlineInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.up(600)]: {
      width: '60%',
    },
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column',
    }
  },
  toolbar: {
    flexDirection: 'row',
    [theme.breakpoints.down(600)]: {
      flexDirection: 'column',
    }
  }
}));


export default function SearchRepos() {
  const classes = useStyles();

  const loading = useAppValue('loading');
  const setSearch = useDispatchSetAppValue('search');
  const language = useAppValue('language');
  const setLanguage = useDispatchSetAppValue('language');
  const setUser = useDispatchSetAppValue('user');

  return (
    <div className={classes.root}>
      <div className={classes.inst}>
        <h4>GitHub API</h4>
        <h6>Busque repositórios por nome, usuário, organização e/ou linguagem.</h6>
        <h6>As ordenações possíveis são Estrelas, Bifurcações, Atualização e padrão.</h6>
      </div>
      <div className={classes.controllers}>
        <div className={classes.inlineInputs}>
          <MyTextField
            onChange={setSearch}
            placeholder="Buscar"
          />
          <MyTextField
            onChange={setUser}
            placeholder="Usuário/Organização"
          />
        </div>
        <MySelect
          placeholder="Linguagem"
          hasEmpty={true}
          onChange={setLanguage}
          options={languages}
          value={language}
        />
      </div>
      <LoadingIndicator display={loading}/>
      <MyTableContainer />
      <MyTablePagination />
    </div>
  );
};