import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const grid = {
  marginTop: "60px",
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

export default ({categoriesArray}) => (

           
         <div>
           
       {categoriesArray && categoriesArray.length>0? categoriesArray.map((p) => {return (
         
         <div className={useStyles().root}>
         <Grid container spacing={3}>
         <Grid item xs={3} sm={3}>
         <Paper className={useStyles.paper}>
          <Card className={useStyles().root} key={p.id}>
      <Link to={`/products/`} style={{textDecoration:'none', color:'black'}}><CardActionArea>
        <CardMedia
          component="img"
          alt="Producto"
          image={p.imgUrl}
          title="Producto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
            {p.name}
          </Typography>
        </CardContent>
      </CardActionArea></Link>
    </Card>
    </Paper>
    </Grid>
    </Grid>
    </div>
)}):<div>No hay nada</div>}
</div>);