import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from './Pagination';
import car1 from "./../assets/carousel/1.png"
import car2 from "./../assets/carousel/2.png"
import car3 from "./../assets/carousel/3.png"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: 'relative',
  },
  slide: {
    padding: 15,
    minHeight: 400,
    color: '#fff',
   
    backgroundSize: '500px 300px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
        flexBasis: '100%',
  },
  slide1: {
     backgroundImage:  `url(${car1})`,
  },
  slide2: {
     backgroundImage:  `url(${car2})`,
  },
  slide3: {
     backgroundImage:  `url(${car3})`,
  },
  boxstyle : {
    
  paddingTop: "310px",
  textAlign: "center",
  }
  };

class Carousel2 extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <div style={styles.root}>
      {this.props.children}
        <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
    
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
          <Box color="text.primary" style={Object.assign({}, styles.boxstyle)} >
          <Typography variant="h4" gutterBottom>
          Explore New Car
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Let’s us help to buy perfect car. Right place to know about your car
      </Typography>
        </Box>


          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            
          <Box color="text.primary" style={Object.assign({}, styles.boxstyle)} >
          <Typography variant="h4" gutterBottom>
          Sell Used Car
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Get an Instant Quote for Your Car.
      </Typography>
        </Box>

          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            
          <Box color="text.primary" style={Object.assign({}, styles.boxstyle)} >
          <Typography variant="h4" gutterBottom>
          Buy a Car
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Get an Instant Quote for Your Car.
      </Typography>
        </Box>

          </div>
        </AutoPlaySwipeableViews>
        <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
      </div>
    );
  }
}

export default Carousel2;