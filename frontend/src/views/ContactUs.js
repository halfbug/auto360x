import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha'
import swal from 'sweetalert'
import { addClientQueries } from '../store/actions/clientQueryActions';

class ContactUs extends Component {
    state = {
        request_type: '',
        dealership_name: '',
        first_name: '',
        last_name: '',
        phone: 0,
        email: '',
        subject: '',
        message: '',
        isVerified: false
    }

    static propTypes = {
        query: PropTypes.object.isRequired,
        addClientQueries: PropTypes.func.isRequired,
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("text changed")
    }

    recaptchaLoaded = () => {
        console.log("recaptcha loaded!")
    }

    handleChange = (event) => {
        this.setState(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log("request type is ", this.state.request_type)
    }

    verifyCallback = (response) => {
        if(response){
            this.setState({
                isVerified: true
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.state.isVerified){
            const newClientQuery = {
                request_type: this.state.request_type,
                dealership_name: this.state.dealership_name,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                email: this.state.email,
                subject: this.state.subject,
                message: this.state.message
            };
    
            // Add query via addQuery action
            this.props.addClientQueries(newClientQuery)
            //window.location.reload()
        }
        else{
            swal("Please verify that you are a human!")
        }

    };

    render() {
        return (
            <Fragment>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={10}>
                        <Paper style={{ textAlign: 'left' }}>
                            <CssBaseline />
                            <Container maxWidth="sm">
                                <Typography component="div" style={{ paddingBottom: '20vh' }} >
                                    <Typography color="textSecondary" variant="h5" gutterBottom style={{ paddingTop: "30px", fontWeight: "bold", textAlign: "center", }}>
                                        Dealer Support Request
                                    </Typography>
                                    <Typography color="textSecondary" variant="h6" gutterBottom style={{ paddingTop: "30px", fontWeight: "bold" }}>
                                        Dealer Questions and Concerns
                                    </Typography>
                                    <Typography variant="body2" gutterBottom >
                                        Please fill out the form below, or call (800) 227-4878 (9am - 5pm Eastern, M-F)
                                    </Typography>
                                    <form onSubmit={this.onSubmit}>
                                        <FormGroup style={{ width: "50%", marginTop: "30px" }}>
                                            <InputLabel htmlFor="request_type">Support request type</InputLabel>
                                            <Select
                                                required
                                                name="request_type"
                                                id="request_type"
                                                variant="outlined"
                                                value={this.state.request_type}
                                                onChange={this.handleChange}
                                                input={<Input name="request_type" id="request_type" />}
                                            >
                                                <MenuItem value={"Problem"}>Problem</MenuItem>
                                                <MenuItem value={"Feature Request"}>Feature Request</MenuItem>
                                                <MenuItem value={"Question"}>Question</MenuItem>
                                                <MenuItem value={"Billing Problem"}>Billing Problem</MenuItem>
                                                <MenuItem value={"Billing Owner Sync"}>Billing Owner Sync</MenuItem>
                                            </Select>
                                        </FormGroup>

                                        <TextField
                                            required
                                            id="dealership_name"
                                            label="Dealership Name"
                                            name="dealership_name"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "15px" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="first_name"
                                            label="First Name"
                                            name="first_name"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "12px" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="last_name"
                                            label="Last Name"
                                            name="last_name"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "12px" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "12px" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            helperText="Your contact info is safe with us."
                                            onChange={this.onChange}
                                            type="email"
                                            autoComplete="email"
                                            margin="normal"
                                            variant="outlined"
                                            style={{ marginTop: "12px", width: "50%" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="subject"
                                            label="Subject"
                                            name="subject"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "12px" }}
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="message"
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows="4"
                                            margin="normal"
                                            variant="outlined"
                                            onChange={this.onChange}
                                            style={{ marginTop: "12px" }}
                                            fullWidth
                                        />
                                        <Recaptcha
                                            sitekey="6LeZyq0UAAAAAGroCkcmS-0q1B3fuLb1HN5XtVmU"
                                            render="explicit"
                                            onloadCallback={this.recaptchaLoaded}
                                            verifyCallback={this.verifyCallback}
                                        />
                                        <label htmlFor="outlined-button">
                                            <Button type="submit" color="primary" variant="contained" style={{ marginTop: "10px" }}>Submit</Button>
                                        </label>
                                    </form>
                                </Typography>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    query: state.clientQuery,
})

export default connect(mapStateToProps, { addClientQueries })(ContactUs)