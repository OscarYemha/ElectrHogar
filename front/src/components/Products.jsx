import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
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

export default ({productsArray}) => (

           
         <div>
           
       {productsArray && productsArray.length>0? productsArray.map((p) => {return (
         
         <div className={useStyles().root}>
         <Grid container spacing={3}>
         <Grid item xs={3}>
         <Paper className={useStyles.paper}>
          <Card className={useStyles().root} key={p.id}>
      <Link to={`/singleproduct/${p.id}`} style={{textDecoration:'none', color:'black'}}><CardActionArea>
        <CardMedia
          component="img"
          alt="Producto"
          image={p.imgUrl}
          title="Producto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {p.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {p.description.slice(0,80) + '...'}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Precio: {p.price}
          </Typography>
        </CardContent>
      </CardActionArea></Link>
      <CardActions>
        <Button size="small" color="action">
          <AddShoppingCartIcon size='large'/>
        </Button>
      </CardActions>
    </Card>
    </Paper>
    </Grid>
    </Grid>
    </div>
)}):<div>No hay nada</div>}
</div>);







