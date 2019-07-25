import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));


const EditBtn = (props) => {
    const classes = useStyles();
    return (
        <IconButton className={classes.button} aria-label="Edit" onClick={props.onEdit}>
                    <CreateIcon />
                </IconButton> 
        )
}




const SaveBtn = (props) => {
    const classes = useStyles();
    return (
       <IconButton className={classes.button} aria-label="Save" onClick={props.onSave}>
                    <SaveIcon />
                </IconButton>
        )
}

const DeleteBtn = (props) => {
    const classes = useStyles();
    return (
       <IconButton className={classes.button} aria-label="Delete" onClick={props.OnDelete}>
                    <DeleteIcon />
                </IconButton>
        )
}

export  {SaveBtn, EditBtn, DeleteBtn}

                