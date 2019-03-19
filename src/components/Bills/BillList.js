import React, { Component } from "react";
// import BillCard from "./BillCard";
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import {Link} from 'react-router-dom'
import axios from 'axios'


class BillList extends Component {
  constructor(){
    super()
    this.state = {
      bills : [],
      page: 0,
      rowsPerPage: 5,
    }
  }
  componentDidMount(){
    this.getRecentBills()
  }

  getRecentBills=()=>{
    axios.get(`https://api.propublica.org/congress/v1/115/both/bills/active.json`,{
      headers: {'X-API-Key': process.env.REACT_APP_PRO_PUBLICA}
    }).then((res)=>{
      const bills = res.data.results[0].bills
      this.setState({bills})

    })
  }

  getUpcomingBills = ()=>{
    axios.get(`https://api.propublica.org/congress/v1/bills/upcoming/house.json`,{
      headers:{'X-API-Key': process.env.REACT_APP_PRO_PUBLICA}
    }).then((res)=>{
      const bills = res.data.results[0].bills
      this.setState({bills})
    })
  }

  getLikedBills = ()=>{

  }

  getDislikedBills = ()=>{

  }

  pageChange = (str)=>{
    let {page, rowsPerPage,bills} = this.state
    let startRow = page*rowsPerPage
    let endRow = startRow+rowsPerPage
    if(str==="next" && endRow<bills.length){
      this.setState({page:(page+1)})
    } else if(str ==="back" && startRow!==0){
      this.setState({page:(page-1)})
    }else{
      this.setState({page:0})
    }
    
  }

  listBills=()=>{
    const {bills,page,rowsPerPage} = this.state
    const startRow = page*rowsPerPage
    const endRow = startRow + rowsPerPage
    if(bills.length>0){
      return(
        bills.slice(startRow,endRow).map((bill)=>{
          let title = bill.short_title? bill.short_title:bill.description
          return(
            <TableRow key = {bill.bill_id}>
              <TableCell><Link to = {`/bills/${bill.bill_id}`} style = {{textDecoration:"none",color:"black"}}>{bill.bill_id}</Link></TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{bill.committees} </TableCell>
            </TableRow>
          )
        })
      )
    }
  }

  render() {
    return (
      <div style = {{width: "80vw", margin: "0 auto", marginTop:"5vh"}}>
        <Button onClick = {()=>this.getUpcomingBills()}>See Upcoming</Button>
        <Button onClick = {()=>this.getRecentBills()}>See recent</Button>
        <Paper>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bill Id</TableCell>
                  <TableCell>Bill Title</TableCell>
                  <TableCell>Committee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.listBills()}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <ArrowBackIos onClick = {()=>this.pageChange("back")}/>
                    <ArrowForwardIos onClick = {()=>this.pageChange("next")}/> 
                  </TableCell>
                  <TableCell>Page {this.state.page+1}</TableCell>
                   
                </TableRow>
              </TableFooter>

            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default BillList;
