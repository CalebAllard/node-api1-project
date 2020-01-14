import React,{useState, useEffect} from 'react';
import axios from 'axios';

//components
import UserCard from './UserCard';
//material-ui
import {Container,Button,Grid,TextField,TextareaAutosize} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      textAlign:'left',
    },
    menuButton: {
      marginLeft: theme.spacing(2),
      color:'lightgreen',
      
    },
    editButton:{
       width:100,
       marginTop:25,
    },
    title:{
        textTransform:"uppercase",
        fontWeight:"bold",
        letterSpacing:1,
    },
    textArea:{
        
        maxHeight:115,
        maxWidth:350,
        padding:2,
    }
    
  }));

const UserList = () => {
    const [users, setUsers] = useState();
    const [adding, setAdding] = useState(false);
    const [data, setData] = useState({});
    const classes = useStyles();
    useEffect(()=>{
        axios.get('http://localhost:8000/api/users')
            .then(resp =>{
                console.log(resp);
                setUsers(resp.data);
            })
            .catch(err => console.log(err));

        
    },[])
    console.log(adding);
    
    return(
        <Container maxWidth="md">
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar} >
                
                <Typography className={classes.title}type='title' color="inherit" style={{ flex: 2 }}>
                    User List
                </Typography>
                    {!adding &&
                    <Button className={classes.menuButton} color="default" onClick={() => setAdding(!adding)}>Add a user</Button>
                    }
                    {adding &&
                    <Button className={classes.menuButton} color="default" onClick={() => setAdding(!adding)}>Cancel</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
        {adding && 
            <div className="adding-form">
                <form>
                    <Grid container spacing={3}>
                        
                            <Grid item xs={12}>
                                <TextField id="name" label="Name"  required />
                            </Grid>
                        
                        
                            <Grid item xs={12}>
                                <TextareaAutosize className={classes.textArea} rowsMax={5} id="bio" label="Bio"   required/>
                            </Grid>
                        
                        
                            <Grid item xs={12}>
                                <Button className={classes.editButton}>Save</Button>
                            </Grid>
                        
                    </Grid>
                </form>
            </div>
        }
        <div className="userList">
        
        {!users && <h1>Getting Users...</h1>}
        <Grid container spacing={3} >
        {users && users.map(item => 
            <Grid key={item.id} item>
            <UserCard  name={item.name} bio={item.bio} id={item.id}  />
            </Grid>
        )}
        </Grid>

        </div>
        </Container >
    );
}
export default UserList;