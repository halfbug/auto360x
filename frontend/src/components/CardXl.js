import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DollerIcon from '@material-ui/icons/AttachMoney';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  icons : {
    marginLeft: 'auto',
  }
});

export default function CardXl(props) {
  const classes = useStyles();
  const {data} = props;
console.log(data)
  return (
    <Link component={RouterLink} color="inherit"  to={`/vehicle/${data._id}`}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://res.cloudinary.com/auto360x/image/upload/c_scale,w_300/v1562565154/${data.front_view}.jpg`}
          title="Contemplative Reptile"
        />  
        <CardContent>
          <Typography gutterBottom variant="body2" component="h6">
            {data.year} {data.make} {data.model} {data.trim} {data.style} {data.drivetype}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.condition},{data.style} with millage {data.milage_km} km.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip variant="outlined" color="primary"
       avatar={<Avatar><DollerIcon /></Avatar>}
        label={data.price} />
      <IconButton aria-label="Add to favorites"
      className={classes.icons}
      >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
       
      </CardActions>
    </Card>
    </Link>
  );
}