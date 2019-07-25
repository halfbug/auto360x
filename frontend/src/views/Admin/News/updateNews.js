import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment'
import swal from 'sweetalert';
import Axios from 'axios';
import { updateNews } from '../../../store/actions/newsActions'

class UpdateNews extends Component {
    state = {
        title: '',
        content: '',
        post_date: '2017-05-24',
        status: '',
        author: '',
        update_at: '2017-05-24',
        image: '',
        imageType: '',
        imageSize: 0,
        news_image: null,
        is_image_uploaded: false
    }

    static propTypes = {
        news: PropTypes.object.isRequired,
        updateNews: PropTypes.func.isRequired
    }

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

    componentWillMount(){
        const { news } = this.props.history.location.state
            this.setState({
                title: news.title,
                content: news.content,
                post_date: moment(news.post_date).format("YYYY-MM-DD"),
                status: news.status,
                author: news.author,
                update_at: moment(news.update_at).format("YYYY-MM-DD"),
                image: news.image
            })
          //  console.log("pre update", this.state.i)
      }

    fileSelectedHandler = e => {
        this.setState({
            news_image: e.target.files[0],
            imageSize: e.target.files[0].size,
            imageType: e.target.files[0].type,
            is_image_uploaded: true
        })
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)
        console.log(e.target.files[0].size)
        console.log(e.target.files[0].type)
        console.log(e.target.id)
    }

    onSubmit = e => {
        e.preventDefault();
        const id = this.props.history.location.state.news._id
        
      if(this.state.is_image_uploaded){
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

                const updatedNews = {
                    title: this.state.title,
                    content: this.state.content,
                    post_date: moment(this.state.post_date).format("YYYY-MM-DD"),
                    status: this.state.status,
                    image: this.state.image,
                    author: this.state.author,
                    update_at: moment(this.state.update_at).format("YYYY-MM-DD")
                };

                // Update news via updateNews action
                this.props.updateNews(id, updatedNews);
                console.log("news updated", this.state)
            })
                .catch(err => {
                    swal("Error adding news!")
                    console.log(err)
                })
        }
      }
      else{
        const updatedNews = {
            title: this.state.title,
            content: this.state.content,
            post_date: moment(this.state.post_date).format("YYYY-MM-DD"),
            status: this.state.status,
            image: this.state.image,
            author: this.state.author,
            update_at: moment(this.state.update_at).format("YYYY-MM-DD")
        };

        // Update news via updateNews action
        this.props.updateNews(id, updatedNews);
      }
    }

    render() {
      // console.log(this.props.history.location.state)
       //const {news} = this.props.history.location.state
       const { title, content, post_date, status, author, update_at, image } = this.state
         console.log(this.state)
        return (
            <Fragment>
                <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
                    Update News
                </Typography>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="title"
                                name="title"
                                label="Title"
                                defaultValue={title}
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
                                defaultValue={content}
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
                                value={post_date}
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
                                value={update_at}
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
                                defaultValue={author}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormGroup>
                                <InputLabel htmlFor="status-simple">Status</InputLabel>
                                <Select
                                    required
                                    value={status}
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
                                 Photo
                            </Typography>
                            <div style={{width: "200px", height: "200px", marginBottom: "10px"}}>
                                <img src={image} style={{width: "100%", height: "100%"}}/>
                            </div>
                            <Typography
                                component="h4"
                                variant="subtitle1"
                                color="inherit"
                            >
                                Update Photo
                            </Typography>
                            <input
                                accept="image/*"
                                type="file"
                                id="newsimage"
                                onChange={this.fileSelectedHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label htmlFor="outlined-button">
                                <Button type="submit" variant="outlined" >
                                    Update 
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
    news: state.news
})

export default connect(mapStateToProps, { updateNews })(UpdateNews);