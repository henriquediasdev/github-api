import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function MyTextField(props) {
  const { onChange, placeholder } = props;

  const [aux, setAux] = useState("");

  // wait stop typing
  useEffect(() => {
    let timeout = setTimeout(() => {
      onChange(aux);
    }, 500);
    return () => {
      clearTimeout(timeout);
    }
  }, [aux, onChange]);

  return (
    <TextField
      label={placeholder}
      value={aux}
      onChange={(e) => setAux(e.target.value)}
    />
  );
};

MyTextField.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
