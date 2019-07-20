import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { EditBtn , SaveBtn} from "./ButtonArchive"
import UploadImageButton from "./UploadImageButton"

import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const { children , onImageSave } = props;
 
  return (
    <div className={classes.root} gutterBottom>
      
        <Grid container spacing={2}>
          <Grid item xs={3}>
        <UploadImageButton className={classes.img}  values={()=>[]}  defaultImage={props.defaultImage} onSave={onImageSave} />
        <Typography gutterBottom variant="subtitle1">
                {props.imageButtonLable}
                </Typography>
          </Grid>
          <Grid item xs={10} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                {children[0]}
                </Typography>
                {children[1]}
              </Grid>
              <Grid item>
              {children[2]}
              </Grid>
            </Grid>
            <Grid item>
                {/* <EditBtn onEdit={onEdit} /> */}
                {/* <SaveBtn onSave={onSave} /> */}
            </Grid>
          </Grid>
        </Grid>
      
    </div>
  );
}