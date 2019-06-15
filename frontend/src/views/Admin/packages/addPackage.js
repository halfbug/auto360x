import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPackage } from '../../../store/actions/packageActions'

class AddPackage extends Component {
  state = {
    checked: false,
    title: '',
    price: '',
    start_date: null,
    end_date: null,
    description: ''
  }

  static propTypes = {
    pkg: PropTypes.object.isRequired,
    addPackage: PropTypes.func.isRequired
  };

  // componentDidMount(){
  //   console.log(this.state.checked)
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
    console.log(!this.state.checked)
  };

  onSubmit = e => {
    e.preventDefault();

    const newPackage = {
      checked: this.state.checked,
      title: this.state.title,
      price: this.state.price,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      description: this.state.description
    };

    // Add item via addItem action
    this.props.addPackage(newPackage);
  };

  render() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Add Package
        </Typography>
        <form onSubmit={this.onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form noValidate>
              <TextField
                id="start_date"
                label="Start date"
                type="date"
                defaultValue="2017-05-24"
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <form noValidate>
              <TextField
                id="end_date"
                label="End date"
                type="date"
                defaultValue="2017-06-27"
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              onChange={this.onChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={this.state.checked} 
                    onChange={this.handleChange('checked')} 
                    value="checked" 
                  />
                }
                label="Is active"
                labelPlacement="start"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={12}>
            <label htmlFor="outlined-button">
              <Button variant="outlined" component="span">
                Add Package <AddIcon />
              </Button>
            </label>
           </Grid>
        </Grid>
        </form>
      </Fragment>
    );
  }

}

const mapStateToProps = (state) => ({
  pkg: state.pkg
})

export default connect(mapStateToProps, { addPackage })(AddPackage)