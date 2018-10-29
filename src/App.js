import React, { Component } from 'react';
import logo from './logo.svg';
import cart from './shopping_cart.svg';
import './App.css';
import Tile from './components/tile';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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
 
  modalpaper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      itemsInCart:[],
      open:false
      
  }
  this.addToCart=this.addToCart.bind(this);
  this.Delete=this.Delete.bind(this);
  this.close=this.close.bind(this);
  }
  showCart=()=>{
    this.setState({open:true});
  }
  showCart
  addToCart(selectedItem)
  {
    
   var items=this.state.itemsInCart;
    items.push(selectedItem);
    this.setState({itemsInCart:items})
    console.log(this.state);
  }
  Delete=(item)=>{

    var itm=this.state.itemsInCart.filter(i=>i!==item);
    this.setState({itemsInCart:itm});
    
  }
  close=()=>{
    
    this.setState({open:false});
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
         <span className="span-full" ><img src={logo} className="App-logo" alt="logo" /> <span className="span-full-right"><a href="#" onClick={this.showCart}>
          <img src={cart} width="24px" height="auto" alt="your cart" ></img> 
        </a>{this.state.itemsInCart.length}</span> </span>
          
          </header>
        <Tile AddToCart={this.addToCart}></Tile>

        <Modal
          
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.modalpaper}>
          <Table >
        <TableHead>
          <TableRow>
             <TableCell numeric>Name</TableCell>
            <TableCell numeric>Price (g)</TableCell>
            <TableCell numeric>Quantity (g)</TableCell>
            <TableCell numeric>Total (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {this.state.itemsInCart.map(item=>(
             <TableRow key={item}>
             <TableCell component="th" scope="row">
               {item.name}
             </TableCell>
             <TableCell numeric>{item.price}</TableCell>
             <TableCell numeric>{item.quantity}-{item.unit}</TableCell>
             <TableCell numeric>{item.price*item.quantity}</TableCell>
             <TableCell><DeleteOutlinedIcon className={classes.icon} onClick={()=>this.Delete(item)} /></TableCell>
           </TableRow>
           ))}
            </TableBody>
      </Table>
      <Button onClick={this.close}>Close</Button>
          </div>
        </Modal>  
      </div>
    );
  }
}

export default withStyles(styles)(App);
