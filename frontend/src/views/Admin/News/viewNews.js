import React, { Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getNews, deleteNews } from '../../../store/actions/newsActions'
import { Button } from '@material-ui/core';

class ViewNews extends Component {

    static propTypes = {
        news: PropTypes.object.isRequired,
        getNews: PropTypes.func.isRequired,
        deleteNews: PropTypes.func.isRequired
    }
    componentDidMount() {
        this.props.getNews();
    }

    onNewsClick = (index, news) => {
        this.props.history.push({pathname: '/newsDetails', state: {index, news} })
    }

    onDeleteClick = (id) => {
        this.props.deleteNews(id);
    }

    render() {
        const { news } = this.props.news
        return (
            <Fragment>
                <Paper>
                    <Typography variant="h6" gutterBottom style={{ marginTop: "30px", fontSize: "25px",  paddingTop: "10px", textAlign: "center" }}>
                         News
                    </Typography>
                    <Button variant="contained" style={{marginLeft: "80%", marginBottom: "20px"}} onClick={() => {this.props.history.push('/addNews')}}>
                        Add New News  <AddIcon />
                    </Button>
                    <hr/>
                    <List component="nav" aria-label="Main mailbox folders">
                        {
                            news.map((news, index) => (
                                <ListItem key={news._id}>
                                    <ListItemText primary={news.title}/>
                                    <Button color="primary" size="small" variant="contained" style={{ marginRight:"10px" }} onClick={() => this.onNewsClick(index, news)}>View News</Button>
                                    <Button color="primary" size="small" variant="contained" onClick={() => this.onDeleteClick(news._id)}>Delete News</Button>
                                </ListItem>
                            ))
                        }
                    </List>
                </Paper>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    news: state.news
})

export default connect(mapStateToProps, { getNews, deleteNews })(ViewNews);