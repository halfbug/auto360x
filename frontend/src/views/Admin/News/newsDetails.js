import React, { Component, Fragment } from 'react';
import { Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateNews } from '../../../store/actions/newsActions';

class NewsDetails extends Component {

    static propTypes = {
        updateNews: PropTypes.func.isRequired,
    };

    
    onEditClick = (index, news) => {
        this.props.history.push({pathname: '/admin/updateNews', state: {index, news} })
    }

    render() {
        console.log(this.props.history.location.state.index)
        console.log(this.props.history.location.state.news)
        const  index  = this.props.history.location.state.index
        const { news } = this.props.history.location.state
        return (
            <Fragment>
                <Paper>
                    <Card>
                        <CardActionArea>
                            <center>
                                <div style={{width: "50%", height: "50%", marginBottom: "10px"}}>
                                    <img src={news.image} style={{width: "100%", height: "100%"}}/>
                                </div>
                            </center>
                            {/* <CardMedia
                                //component="img"
                                alt={news.title}
                                style={{height: 0, paddingTop: '56.25%',}}
                                image={news.image}
                                title={news.title}
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {news.title}
                                </Typography>
                                <Typography gutterBottom  >
                                    {news.content}
                                </Typography>
                                <Typography color="textSecondary"  style={{fontStyle: "italic"}}>
                                   Author: {news.author}
                                </Typography>
                                <Typography color="textSecondary" style={{fontStyle: "italic"}}>
                                    Status: {news.status}
                                </Typography>
                                <Typography  variant="body2" color="textSecondary" component="p" style={{textAlign: "right"}}>
                                   Created on: {moment(news.create_at).format("YYYY-MM-DD")} , 
                                   Posted on:{moment(news.post_date).format("YYYY-MM-DD")} <br/>
                                   Updated on: {moment(news.update_at).format("YYYY-MM-DD")}<br/>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" color="primary" onClick={() => this.onEditClick(index, news)} >
                                Edit News
                            </Button>
                        </CardActions>
                    </Card>
                </Paper>
            </Fragment>
        );
    }
}

export default connect(null, { updateNews })(NewsDetails);