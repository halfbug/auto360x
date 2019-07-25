import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import { addNews } from '../../../store/actions/newsActions'
import swal from 'sweetalert';
import Axios from 'axios';

class AddNews extends Component {
    state = {
        title: '',
        content: '',
        post_date: '2017-05-24',
        status: 'Draft',
        author: '',
        update_at: '2017-05-24',
        image: '',
        imageType: '',
        imageSize: 0,
        news_image: null,
    }

    static propTypes = {
        news: PropTypes.object.isRequired,
        addNews: PropTypes.func.isRequired
    };

    handleChange = (event) => {
        this.setState(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log("status is ", this.state.status)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("text changed")
        // console.log(this.state.start_date)
        // console.log(moment( this.state.start_date).format("YYYY-MM-DD"))
        // console.log(this.state.end_date)
        // console.log(moment( this.state.end_date).format("YYYY-MM-DD"))
    };
    componentDidMount() {
        console.log(this.state.imageType)
    }

    fileSelectedHandler = e => {
        this.setState({
            news_image: e.target.files[0],
            imageSize: e.target.files[0].size,
            imageType: e.target.files[0].type
        })
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
        console.log(e.target.id)
    }

    onSubmit = e => {
        e.preventDefault();
        if ((this.state.imageType) !== ('image/jpeg' || 'image/jpg' || 'image/png')) {
            swal("This is not a supported image format!")
        }
        else if (this.state.imageSize > 1000000) {
            swal("File size is too large, please pick a smaller file!")
        }

        else {
            const fd = new FormData()
            fd.append('image', this.state.news_image, this.state.news_image.name)

            Axios.post('http://localhost:5000/api/storage', fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res, e) => {
                console.log(res)
                console.log("pre setState id : " + res.data[0].public_id)
                console.log("finished Progress : " + res.data[0].url)

                this.setState({
                    image: res.data[0].url
                })
                console.log("post setState image id : " + this.state.image)

                const newNews = {
                    title: this.state.title,
                    content: this.state.content,
                    post_date: moment(this.state.post_date).format("YYYY-MM-DD"),
                    status: this.state.status,
                    image: this.state.image,
                    author: this.state.author,
                    update_at: moment(this.state.update_at).format("YYYY-MM-DD")
                };

                // Add item via addItem action
                this.props.addNews(newNews);

                // this.setState({
                //     title: '',
                //     content: '',
                //     post_date: '2017-05-24',
                //     status: '',
                //     image: '',
                //     author: '',
                //     update_at: '2017-05-24'
                // })
                //window.location.reload()
                // this.forceUpdate()
                console.log("news added", this.state)

                //        loadImg(target, res.data[0].url)
                //   toggleProgress(target, "none")
                //   values[target] = res.data[0].public_id;
                // props.handleChange()
            })
                .catch(err => {
                    swal("Error adding news!")
                    console.log(err)
                })
        }
    };


    render() {
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                    Add News
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
                                id="content"
                                name="content"
                                label="Content"
                                multiline
                                rowsMax="4"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="post_date"
                                label="Post date"
                                type="date"
                                name="post_date"
                                value={this.state.post_date}
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="update_at"
                                label="Update At"
                                type="date"
                                name="update_at"
                                value={this.state.update_at}
                                onChange={this.onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="author"
                                name="author"
                                label="Author"
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <InputLabel htmlFor="status-simple">Status</InputLabel>
                                <Select
                                    required
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    inputProps={{
                                        name: 'status',
                                        id: 'status-simple',
                                    }}
                                >
                                    <MenuItem value={"Draft"}>Draft</MenuItem>
                                    <MenuItem value={"Published"}>Published</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography
                                component="h4"
                                variant="subtitle1"
                                color="inherit"

                            >
                                Upload Photo
                            </Typography>
                            <input
                                 accept="image/*"
                                type="file"
                                id="newsimage"
                                onChange={this.fileSelectedHandler}
                            //ref={fileInput => this.fileInput = fileInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            {/* <input
                                accept="image/*"
                                id="news_image"
                                type="file"
                                onChange={this.handleImageUpload}
                            /> */}

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/* {
                                ((this.state.imageType !== 'image/png') || (this.state.imageType !== 'image/jpeg') || (this.state.imageType !== 'image/jpg')) ? 
                                <UncontrolledAlert color="danger">Please choose correct file type!</UncontrolledAlert> : null
                            } */}
                            <label htmlFor="outlined-button">
                                <Button type="submit" variant="outlined" >
                                    Add News <AddIcon />
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                </form>
                <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={() => {this.props.history.push('/admin/viewNews')}}>
                        Go back
                    </Button>
                </Grid>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
    news: state.news,
})

export default connect(mapStateToProps, { addNews })(AddNews)