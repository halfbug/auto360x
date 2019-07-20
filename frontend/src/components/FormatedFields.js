import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

 function FormatPrice(props) {
    const { inputRef, onChange, ...other } = props;
//   console.log(other)
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value, 
              id:other.id,
            },
          });
        }}
        id="price"
        thousandSeparator
        prefix="$"
      />
    );
  }
  
  FormatPrice.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  function FormatZipCode(props) {
    const { inputRef, onChange, ...other } = props;
//   console.log(other)
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value, 
              id:other.id,
            },
          });
        }}
       
        format="#####"
      />
    );
  }

  export {FormatPrice, FormatZipCode }