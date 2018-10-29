import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Item from './items';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 120,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Tile extends React.Component {
    constructor(props){
        super(props);
        this.category=this.category.bind(this);
    }
  state = {
    spacing: '16',
    items: [{
    
        "category":{ "name":"Apple", "image": "/assets/apple.png",
            "id":"1",
            "items":[{
                "name" :"Royal Gala Apple",
                 "image":"/assets/apple.png",
                 "price":"150",
                 "unit":"per kilo"
    
            },
            {
                "name" :"Golden Apple",
                 "image":"/assets/apple.png",
                 "price":"100",
                 "unit":"per kilo"
    
            },
            {
                "name" :"Pink Apple",
                 "image":"/assets/apple.png",
                 "price":"120",
                 "unit":"per kilo"
    
            },
            {
                "name" :"Kinnaur Apple",
                 "image":"/assets/apple.png",
                 "price":"180",
                 "unit":"per kilo"
    
            }
    
            ]}
    },
    {
        "category":{ "name":"Grapes", "image": "/assets/grapes.png", "id":"2",
            "items":[{
                "name" :"Green seedless",
                 "image":"/assets/grapes.png",
                 "price":"80",
                 "unit":"per kilo"
    
            },
            {
                "name" :"Red seedless imported",
                 "image":"/assets/grapes.png",
                 "price":"450",
                 "unit":"per kilo"
    
            },
            {
                "name" :"Black american grapes",
                 "image":"/assets/grapes.png",
                 "price":"150",
                 "unit":"per kilo"
    
            }
           
            ]
        }
            
    }
    ,
    {
        "category":{ "name":"Kiwi", "image": "/assets/kiwi.png", "id":"3",
            "items":[
                   ]
        }
            
    },
    {
        "category":{ "name":"Banana", "image": "/assets/banana.png", "id":"4",
            "items":[
                   ]
        }
            
    },
    {
        "category":{ "name":"Mango", "image": "/assets/mangoes.png", "id":"5",
            "items":[
                   ]
        }
            
    }
    ],
  };

  AddItemToCart=(item)=>{
      this.props.AddToCart(item);
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };
  category=(event,id)=>{
    
   var items=this.state.items;
   var categoryItems=items.filter(i=>{
       if(i.category.id===id)
       {
          
         return i.category.items;
       }
   });

   this.setState({categoryItems:categoryItems[0].category.items});
   console.log(this.state);
  }
  render() {
    const { classes } = this.props;
    const { spacing, items, categoryItems } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {items.map(value => (
              <Grid  item>
                <Paper className={classes.paper}  >
                
                <div onClick={(event)=>this.category(event,value.category.id)} >
                    <img src={value.category.image} alt="Fruit" className="img-fluid img-thumbnail"  ></img>
                    </div>
                    <div>
                        <h6>{value.category.name}</h6>
                    </div>
                
                </Paper>
              </Grid>
            ))}


          </Grid>
        </Grid>
        <Grid >
           <div>&nbsp;</div>
         <div className="div-items">
            <Item categoryItems={categoryItems} AddItemToCart={this.AddItemToCart} ></Item>
         </div>
         
               </Grid>
      </Grid>
    );
  }
}

Tile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tile);