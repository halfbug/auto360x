import React from 'react'
import Card from "../../components/CardXl"
import Pagination from "material-ui-flat-pagination";
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';

const searchResults = [
{
title : "A new car for sale",
make : "Audi",
model: "AS",
year : "2019",
id: "092304239400234"
},
{
    title : "A new car for sale",
    make : "Audi",
    model: "AS",
    year : "2019",
    id: "092304239400234"
    },
    {
        title : "A new car for sale",
        make : "Audi",
        model: "AS",
        year : "2019",
        id: "092304239400234"
        },{
          title : "A new car for sale",
          make : "Audi",
          model: "AS",
          year : "2019",
          id: "092304239400234"
          },
        {
          title : "A new car for sale",
          make : "Audi",
          model: "AS",
          year : "2019",
          id: "092304239400234"
          },

];

const Results = (props) => {
    const [offset, setOffset] = React.useState(3);
    const handleClick=(offset)=> {
        setOffset(offset );
      }

    const { vehicles} = props;
// console.log(vehicles)
if (Object.entries(vehicles).length === 0 && vehicles.constructor === Object)
  return (<p> loading ...</p>);
else
    return (
      <React.Fragment>
       <Grid container spacing={3}>
        
    
        {vehicles.data.map(vehicle => (
          <Grid item xs={12} sm={6} md={6} lg={4} >
              <Card key={vehicle._id} data={vehicle}>
                {vehicle.title}
              </Card>
              </Grid>
            ))} 

        
       </Grid>


            <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
         
        >
        
        
            <Pagination
          limit={10}
          offset={offset}
          total={100}
          onClick={(e, offset) => handleClick(offset)}
        /> 
        </Box>  
        </React.Fragment>
    )
}

export default Results
