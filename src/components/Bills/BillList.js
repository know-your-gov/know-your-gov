import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { /*billFavor,*/ getBillsFavored, getBillsOpposed, deleteBill } from "../../ducks/authReducer";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import { Link } from "react-router-dom";
import axios from "axios";
import Input from '@material-ui/core/Input'

class BillList extends Component {
  constructor() {
    super();
    this.state = {
      bills: [],
      page: 0,
      rowsPerPage: 5,
      tracked: false,
      search: "",
      favoredOrOpposed: false,
    };
  }
  componentDidMount() {
    this.getRecentBills();
    this.props.getBillsFavored();
  }

  getRecentBills = () => {
    this.setState({favoredOrOpposed:false})
    axios
      .get(
        `https://api.propublica.org/congress/v1/115/both/bills/active.json`,
        {
          headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
        }
      )
      .then(res => {
        const bills = res.data.results[0].bills;
        this.setState({ bills, tracked: false });
      });
  };

  getUpcomingBills = () => {
    this.setState({favoredOrOpposed:false})
    axios
      .get(`https://api.propublica.org/congress/v1/bills/upcoming/house.json`, {
        headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
      })
      .then(res => {
        const bills = res.data.results[0].bills;
        this.setState({ bills });
        this.setState({ tracked: false });
    });
  }

  searchInput =(e)=>{
    this.setState({search:e.target.value})
  }

  searchBills = ()=>{
    this.setState({tracked:false})
    this.setState({favoredOrOpposed: false})
    if(this.state.search.length>0){
      let {search} = this.state
      return axios.get(`https://api.propublica.org/congress/v1/bills/search.json?query=${search}`,{
        headers: { "X-API-Key": process.env.REACT_APP_PRO_PUBLICA }
      }).then(res=>{
        const bills = res.data.results[0].bills;
        this.setState({bills})
      })  
    }
  }
 
  LikedBillsList = () => {
    this.setState({ tracked: true });
  };

  pageChange = str => {
    let { page, rowsPerPage, bills } = this.state;
    let startRow = page * rowsPerPage;
    let endRow = startRow + rowsPerPage;
    if (str === "next" && endRow < bills.length) {
      this.setState({ page: page + 1 });
    } else if (str === "back" && startRow !== 0) {
      this.setState({ page: page - 1 });
    } else {
      this.setState({ page: 0 });
    }
  };

  listBills = () => {
    const { bills, page, rowsPerPage } = this.state;
    const startRow = page * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    if (bills.length > 0) {
      return bills.slice(startRow, endRow).map(bill => {
        let title = bill.short_title ? bill.short_title : bill.description;
        return (
          <TableRow key={bill.bill_id}>
            <TableCell>
              <Link
                to={`/bills/${bill.bill_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {bill.bill_id}
              </Link>
              {this.deleteIconShow("",bill.bill_id)}
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{bill.committees} </TableCell>
          </TableRow>
        );
      });
    }
  };

  listBillsTracked = () => {
    const { page, rowsPerPage } = this.state;
    const { bills } = this.props;
    const startRow = page * rowsPerPage;
    const endRow = startRow + rowsPerPage;
    if (bills && bills.length > 0) {
      return bills.slice(startRow, endRow).map(bill => {
        let title = bill.title ? bill.title : bill.description;
        const id = `${bill.billSlug}-${bill.congress}`;
        return (
          <TableRow key={id}>

            <TableCell>

              <Link
                to={`/bills/${id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {id}
              </Link>

              <DeleteOutline onClick = {()=>this.props.deleteBill("bills-favored", id)}/>

            </TableCell>

            <TableCell>
              {title
                ? title
                : "Excepteur mollit commodo ipsum esse qui elit labore do do ex tempor aliqua."}
            </TableCell>

            <TableCell>
              {bill.committee
                ? bill.committee
                : "Aute occaecat consectetur labore esse."}{" "}
            </TableCell>

          </TableRow>
        );
      });
    }
  };

  showOpposedBills =()=>{
    this.props.getBillsOpposed()
    this.setState({tracked:false})
    this.setState({favoredOrOpposed:true})
    const {opposed} = this.props
    console.log(opposed)
    const newOpposed = opposed.map(bill=>{
      return Object.assign({},{
        bill_id:`${bill.billSlug}-${bill.congress}`,
        short_title: bill.title,
        committees: bill.committee
      })
    })
    if(newOpposed.length>0){
      // console.log(newOpposed)
      this.setState({bills:newOpposed})
    }else{
      this.setState({bills:[]})
    }   
  }

  buttonRender=(fun,buttonText,i)=>{
    return <Button onClick = {()=>fun()} key = {i}>{buttonText}</Button>
  }

  buttonShow = ()=>{
    let buttons = {
      "See Recent": this.getRecentBills,
      "See Upcoming": this.getUpcomingBills, 
      "See Favored": this.LikedBillsList, 
      "See Opposed": this.showOpposedBills, 
      "Search Bills": this.searchBills
    }
    let buttonsArr = []

    for(let butt in buttons){
      buttonsArr.push({text: butt,
        action:buttons[butt]})
    }
    return buttonsArr.map((button,i)=>{
      return this.buttonRender(button.action,button.text,i)
    })
  }

  deleteIconShow = (loc,billId)=>{
    return this.state.favoredOrOpposed? <DeleteOutline onClick = {()=>this.props.deleteBill("bills-opposed",billId)
  }/>: null
  }



  render() {
    return (
      <div
        style={{
          width: "80vw",
          marginLeft: "5vw",
          marginTop: "5vh",
          overflow: "scroll"
        }}
      >
     
        {this.buttonShow()}<br/>
        <Input onChange = {(e)=>this.searchInput(e)}/>

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
                {!this.state.tracked
                  ? this.listBills()
                  : this.listBillsTracked()}

              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell>
                    <ArrowBackIos onClick={() => this.pageChange("back")} />
                    <ArrowForwardIos onClick={() => this.pageChange("next")} />
                  </TableCell>
                  {/* <TableCell>Page {this.state.page+1}</TableCell> */}
                </TableRow>
              </TableFooter>

            </Table>

          </div>

        </Paper>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    bills: state.auth.billsFavored,
    opposed: state.auth.billsOpposed,
  };
};
// const mapDispatchToProps =dispatch => {
//   return {
//     getBillsFavored: () => dispatch(getBillsFavored()),
//     getBillsOpposed: ()=> dispatch(getBillsOpposed()),
//     deleteBill: ()=>dispatch(deleteBill),
//   }; /////////////////////
// };
export default compose(
  connect(
    mapStateToProps,{getBillsFavored,getBillsOpposed,deleteBill}  
  )
)(BillList);


/*
Pit of redundancy
import { getFirestore } from "redux-firestore";
import { firestoreConnect, getFirebase } from "react-redux-firebase";
import firebase from "../../config/fbConfig";
import "firebase/auth";
import BillCard from "./BillCard";


<Button onClick={() => this.getRecentBills()}>See Recent</Button>
<Button onClick={() => this.getUpcomingBills()}>See Upcoming</Button>
<Button onClick={()=>this.LikedBillsList()}>See Favored Bills </Button>
<Button onClick = {()=>this.showOpposedBills()}>See Opposed Bills</Button><br/>
<Input onChange = {(e)=>this.searchInput(e)}/>
<Button onClick = {()=>this.searchBills()}>Search Bills</Button> 
// this.setState({ bills: this.props.bills && this.props.bills });

  // getDislikedBills = () => {};

  
  deleteTrackedBill = (loc, billId)=>{
    if(loc==="favored"){
      this.props.deleteBill('bills-favored',billId)
      // alert(`deleting ${billId} from favored`)
      // return("bills-favored",billId)
      
    } else{
      this.props.deleteBill('bills-opposed',billId)
      // alert(`deleting ${billId} from opposed`)
      // return("bills-opposed",billId)
     
    }
  }

*/