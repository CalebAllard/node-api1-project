import React from 'react';
import axios from 'axios';
//material-ui
import{makeStyles,Card,CardContent,CardActions,Typography, IconButton,Grid} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';



const UserCard = props => {
    
    const classes = makeStyles({
        card:{
            maxWidth:300,
        },
    });
    const deleteItem = id => {
        console.log(id);
        axios.delete(`http://localhost:8000/api/users/${id}`)
        .then(resp => {console.log(resp)})
        .catch(err => console.log(err));
    };
    
    return(
    // <div className='userCard'>
    //     <h2>{props.name}</h2>
    //     <p>{props.bio}</p>

    // </div>

    //material-ui-card
    <Card className={classes.card}>
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.bio}
          </Typography>
        </CardContent>
      
      <CardActions>
        <Grid container>
            <Grid item xs={6}>
                <IconButton>
                    <EditIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={6}>
                <IconButton color="secondary">
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
        {/* <Button size="small" color="primary" onClick={() => deleteItem(props.id)}>
          Delete
        </Button> */}
        </Grid>
      </CardActions>
    </Card>
    );
}
export default UserCard;