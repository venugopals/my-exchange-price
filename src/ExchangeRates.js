import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';




const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class ExchangeRates extends Component {
  constructor(props) {
    super(props);
    this.state = {
     exChangeData: {},
     exChangeColumns: [],
     exChangeEuroPrice: {},
     errorMsg: ""
    };
}
  
  createData(convertType={}) {
     let id = 1;
        let euroData = {}, euroInverseData={}, exchangePrice={}, exchangeInverse={};
        this.state.exChangeColumns.map((Pricekey, index)=>{
          if(convertType == "EUR"){
              if(this.state.exChangeData.rates[Pricekey]){
                euroData["id"] = id
                euroData["name"] = `1 ${this.state.exChangeData.base}`
                euroData[Pricekey] = this.state.exChangeData.rates[Pricekey].toFixed(4)
                euroData[this.state.exChangeData.base] = 1.0000
                euroInverseData["id"] = id
                euroInverseData["name"] = "Inverse"
                euroInverseData[Pricekey] = (1/this.state.exChangeData.rates[Pricekey]).toFixed(4)
                euroInverseData[this.state.exChangeData.base] = 1.0000
              }
              if(!Object.keys(this.state.exChangeEuroPrice).length){
                this.setState({exChangeEuroPrice: {euroData: euroData, euroInverseData: euroInverseData}})
              }
          }
          else{
            if(this.state.exChangeData.rates[Pricekey]){
              let euroValue = this.state.exChangeData.rates[convertType]
              let euroConversionValue = (1/this.state.exChangeData.rates[Pricekey]).toFixed(4)
              let euroPriceValue = this.state.exChangeEuroPrice.euroInverseData
              let euroPriceInverseValue = this.state.exChangeEuroPrice.euroData
              exchangePrice["id"] = id
              exchangePrice["name"] = `1 ${convertType}`
              exchangePrice[Pricekey] = (1/(euroValue*euroConversionValue)).toFixed(4)
              if(euroPriceValue){
                exchangePrice["EUR"] = euroPriceValue[convertType]
              }
              exchangePrice[convertType] = 1.0000
              exchangeInverse["id"] = id
              exchangeInverse["name"] = "Inverse"
              exchangeInverse[Pricekey] = (1/exchangePrice[Pricekey]).toFixed(4)
              exchangeInverse[convertType] = 1.0000
              if(euroPriceInverseValue){
                exchangeInverse["EUR"] = this.state.exChangeEuroPrice.euroData[convertType]
              }
            }
          }
        })
      return {euroData: euroData, euroInverseData: euroInverseData, exchangePrice: exchangePrice,  exchangeInverse: exchangeInverse}     
  }

  componentWillMount(){
    this.state.exChangeColumns = ["GBP", "EUR", "USD", "JPY", "CHF","CAD", "AUD", "NZD",
                                  "RUB", "ZAR", "MXN", "INR"]
  }

  componentDidMount(){
    axios.get(`https://api.exchangeratesapi.io/latest`)
    .then(res => {
      this.setState({ exChangeData:  res.data, errorMsg: " ", hasError: false});
    }).catch((error) => {
      //this.setState({MovieDetails: MovieDetails, errorMsg: error.response.data.Error+"<br/>But We are showing Catched Data", hasError: true})
  })
  }

  

  SimpleTable() {
    let  exChangeColumns = this.state.exChangeColumns
    let rows = []
    if(this.state.exChangeData.rates){
      let exChangeColumns = this.state.exChangeColumns
       let exChangeData = this.createData("EUR")
       rows = [ exChangeData.euroData, exChangeData.euroInverseData];
       exChangeColumns.map(currencyType=>{
          if(currencyType != "EUR"){
            exChangeData = this.createData(currencyType)
            rows.push(exChangeData.exchangePrice)
            rows.push(exChangeData.exchangeInverse)
          }
       })
      
    }
    return (
      <Paper className="">
        <Table id="exchangePrice">
          <TableHead>
            <TableRow>
            <TableCell>Name</TableCell>
            {this.state.exChangeColumns.map((columnData, index) => (
              <TableCell key ={index}>{columnData}</TableCell>
            ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row[exChangeColumns[0]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[1]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[2]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[3]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[4]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[5]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[6]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[7]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[8]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[9]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[10]]}</TableCell>
                <TableCell align="right">{row[exChangeColumns[11]]}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
  render(){
   return(
    <React.Fragment>
      {this.SimpleTable()}
    </React.Fragment>
   )
  }
}


export default withStyles(styles)(ExchangeRates);
