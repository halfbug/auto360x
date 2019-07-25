import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonBases from './ButtonBasses';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
//   image: {
//     width: 128,
//     height: 128,
//   },
//   img: {
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//   },
  input: {
    display: 'none',
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const { values  } = props;
  const [msg,setMsg] = React.useState(null);
  const interior = React.useRef(null);
  const [interiorProgress,setInteriorProgress] = React.useState("none");
  const [interiorImg,setInteriorImg] = React.useState(props.defaultImage);

  

  const handleImageUpload = (e) => {
    // console.log(e.target);
    console.log(`t=${e.target.id}, val = ${e.target.value}`)
    if (e.target.files && true){
      // console.log(e.target.files)
      // const image = e.target.files[0]
      // console.log(image)
      
      const files = Array.from(e.target.files)
      const formData = new FormData()
    const types = ['image/png', 'image/jpeg', 'image/gif']

    if (files.length > 1) {
     setMsg('Only 1 images can be uploaded at a time')
    }
    const file=files[0]
    if (types.every(type => file.type !== type)) {
      setMsg(`'${file.type}' is not a supported format`)
    }

    // if (file.size > 150000) {
    //   errs.push(`'${file.name}' is too large, please pick a smaller file`)
    // }

    if(values[e.target.id] && values[e.target.id] !== "")
    formData.append("delete_previous", values[e.target.id])
    else
    formData.append("delete_revious", false)

    formData.append([e.target.id], file)

    
    console.log(file)


    console.log('initiate progress')
    let target=e.target.id;
      
    setInteriorProgress("block");
    // axios.defaults.baseURL = serverURl;
  
      axios.post('/api/storage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then((res,e) => {
           console.log(res) 
           console.log("finished Progress : "+res.data[0].url)
    
      
           setInteriorImg(res.data[0].url)
      setInteriorProgress("none")
      props.onSave({detail:res.data[0], name:`${res.data[0].public_id}.${res.data[0].format}`});
       // props.handleChange()
    })
    .catch(err => console.log(err))
  }
    
    
  };

  const onButtonClick = (ref) => {
    console.log("inside")
    // `current` points to the mounted text input element
    ref.current.click();
  };

  return (
    <div >
        
        <input
        accept="image/*"
        className={classes.input}
        id="interior_view"
        multiple
        type="file"
        ref={interior}
        onChange={handleImageUpload}
      />
      <label htmlFor="interior_view">
        {/* <Button variant="outlined" component="span" className={classes.button}>
          <AddIcon />
        </Button> */}
        <ButtonBases
        onClick={()=>onButtonClick(interior)}
        title ="Upload"
        img ={interiorImg}
        className={classes.image}
        />
        <LinearProgress color="secondary" variant="query" id="interior_view_progress" 
        style={{
              display: `${interiorProgress}`,
            }}
        />
      </label>


    
    </div>
  );
}