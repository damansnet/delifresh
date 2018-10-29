import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function rand() {
    return 0;//Math.round(Math.random() * 20) - 10;
  }
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 220,
    width: 200,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  modalpaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class Item extends React.Component {
    constructor(props){
        super(props);
        this.select=this.select.bind(this);
        this.state={
            items:[],
            spacing:'16',
            open:false,
            selectedItem:{}

        }
    }
  
    componentWillReceiveProps(nextProps) {
        
        this.setState({ items: nextProps.categoryItems });  
      }

  handleChange = key => (event, value) => {
      
      var selectedItem=this.state.selectedItem;
      selectedItem.quantity=event.target.value;
    this.setState({
      selectedItem: selectedItem,
    });
  };

  AddToCart =(event)=>{
      this.props.AddItemToCart(this.state.selectedItem);
      this.setState({open:false});
  }

  handleClose=()=>{
      this.setState({open:false});
  }
  select=(event,value)=>{
      value.quantity=1;
    this.setState({selectedItem:value})
   this.setState({open:true})
   
  }
  render() {
    const { classes } = this.props;
    const { spacing, items } = this.state;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {items.map(value => (
              <Grid  item>
                <Paper className={classes.paper}  >
                
                <div   >
                    <img src={value.image} alt="Fruit" className="img-fluid img-thumbnail img-valign"  ></img>
                  
                    <span>
                        <div> {value.name} </div>
                        <div><i class="fa fa-inr"></i> {value.price}- {value.unit}</div>
                       
                        <Button onClick={(event)=>this.select(event,value)}>Select</Button>
                     </span>
                        
                    
                    </div>
                </Paper>
              </Grid>
            ))}


          </Grid>
        </Grid>
        <Modal
          
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.modalpaper}>
             <div>
                 <img src={this.state.selectedItem.image} alt={this.state.selectedItem.name} className="img-fluid img-thumbnail" ></img>
             </div>
            <Typography variant="h6" id="modal-title">
              {this.state.selectedItem.name}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {this.state.selectedItem.price} - {this.state.selectedItem.unit}
            </Typography>
            <TextField
          id="filled-number"
          label="Number"
          value={this.state.selectedItem.quantity}
          onChange={this.handleChange('age')}
          type="number"
          
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          
        />
        <Button onClick={this.AddToCart}> Add to cart </Button>
          </div>
        </Modal>  
      </Grid>
      
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Item);