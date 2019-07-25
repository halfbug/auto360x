import React from 'react';
import PersonalDetail from './Personal'
import CompanyDetail from "./Company"
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  divder: {
    marginTop: 50,
    marginBottom: 50,
    marginRight:0,
    marginLeft:0,
    padding:0,
  },
}));
//function for contact
export default function Contact(props) {
  const {handleChange, values, errors, validator } = props;
  const classes = useStyles();
  // console.log(values.saler_type)
  // validator.purgeFields();
  return (
    
    <React.Fragment>
    <PersonalDetail gutterBottom handleChange={handleChange} values={values} 
    errors={errors} validator={validator} />
    <Divider variant="middle"  className={classes.divder}  />
    {(values.seller_type === "dealer")?
    <CompanyDetail values={values} handleChange={handleChange} errors={errors} validator={validator} />
    :""}
    </React.Fragment>
  );
}