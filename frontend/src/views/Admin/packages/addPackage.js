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
import moment from 'moment';
import { addPackage } from '../../../store/actions/packageActions';

class AddPackage extends Component {
  state = {
    checkedA: false,
    title: '',
    price: 0,
    start_date: '2017-05-24',
    end_date: '2018-07-20',
    description: '',
  }

  static propTypes = {
    pkg: PropTypes.object.isRequired,
    addPackage: PropTypes.func.isRequired,
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("text changed")
    // console.log(this.state.start_date)
    // console.log(moment( this.state.start_date).format("YYYY-MM-DD"))
    // console.log(this.state.end_date)
    // console.log(moment( this.state.end_date).format("YYYY-MM-DD"))
  };

  handleChange = name => event => {
   // console.log(this.state.checkedA)
    this.setState({ ...this.state, [name]: event.target.checked });

  };

  onSubmit = e => {
    e.preventDefault();
    const newPackage = {
      is_active: this.state.checkedA,
      title: this.state.title,
      price: this.state.price,
      start_date: moment( this.state.start_date).format("YYYY-MM-DD"),
      end_date: moment( this.state.end_date).format("YYYY-MM-DD"),
      description: this.state.description
    };

    // Add item via addItem action
    this.props.addPackage(newPackage);
    // this.setState({
    //   checkedA: false,
    //   title: '',
    //   price: '',
    //   start_date: '2017-05-24',
    //   end_date: '2018-07-20',
    //   description: '',
    // })
    //window.location.reload()
  // this.forceUpdate()
    //console.log("package added", this.state)

  };
  

  render() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom style={{textAlign: "center"}}>
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
              <TextField
                required
                id="start_date"
                label="Start date"
                type="date"
                name="start_date"
                value={this.state.start_date}
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="end_date"
                label="End date"
                type="date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
                    <Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />
                  }
                  label="Is active"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <label htmlFor="outlined-button">
                <Button type="submit" variant="outlined" >
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
  pkg: state.pkg,
})

export default connect(mapStateToProps, { addPackage })(AddPackage)