import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default function MySelect(props) {
  const { onChange, options, placeholder, value, hasEmpty } = props;

  return (
    <FormControl>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        style={{ minWidth: 100 }}
      >
        {hasEmpty && (
          <MenuItem value="">{placeholder}</MenuItem>
        )}
        {options.map((element) => (
          element.type === 'group'
          ?
            (<MenuItem key={`group-${element.value}`} disabled={true}>{element.label}</MenuItem>)
          :
            (<MenuItem key={`option-${element.value}`} value={element.value}>{element.label}</MenuItem>)
        ))}
      </Select>
    </FormControl>
  );
};

MySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  hasEmpty: PropTypes.bool,
};

MySelect.defaultProps = {
  placeholder: 'Selecione',
  value: null,
  options: [],
  hasEmpty: true,
};