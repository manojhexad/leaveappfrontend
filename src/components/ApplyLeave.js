import React, {Component} from "react";
import Nav from "./Nav";
import {getLeavesData, submitLeave} from "../api/leave-api";

import {MuiThemeProvider, RaisedButton, DatePicker, Checkbox} from "material-ui";

class ApplyLeave extends Component {
    constructor(){
        super();
        this.state = {
            leavedata : {},
            leaveFrom : "",
            isLeaveFromHalfDay : false,
            leaveTo : "",
            isLeaveToHalfDay : false
        }
    }
    fetchLeavesData(){
        getLeavesData().then((leavedata) => {
            this.setState({leavedata : leavedata
            });
        });
    }
    submitLeave(applyLeave){
        var selfObject = this;
        submitLeave(applyLeave).then((message) => {
            if(message.success){
                alert("Your leave has been submitted");
                selfObject.props.history.push('/appliedLeaves');
            } else {
                alert("There was an error in processing your request");
            }
        }).catch(function (error) {
            alert(error);
        });
    }

    componentDidMount(){
        this.fetchLeavesData();
    }

    handleSubmit(e){
        e.preventDefault();
        if( this.state.leaveFrom && this.state.leaveFrom !== "" &&
            this.state.leaveTo && this.state.leaveTo !== ""){
                const applyLeaveData ={
                    leaveFrom : this.state.leaveFrom,
                    leaveTo : this.state.leaveTo,
                    isLeaveFromHalfDay : this.state.isLeaveFromHalfDay,
                    isLeaveToHalfDay : this.state.isLeaveToHalfDay
                  };
                this.submitLeave(applyLeaveData);
        } else{
          alert("Please enter valid leave days.");
        }
      }

    render(){
        // eslint-disable-next-line
        const{leavedata, applyLeave} =this.state;
        return (
            <div >
                <MuiThemeProvider>
                    <div>
                    <Nav history ={this.props.history} title="Apply Leave"  link = "/applyLeave"/>
                    <hr />
                    
                    <form onSubmit={this.handleSubmit.bind(this)}>

                        <br /><br />

                        <label > Employee name  : {leavedata.name}</label>
                        <br /><br />
                        
                        <label > Leaves carried forward from previous year  : {leavedata.previousYearLeaves}</label>
                        <br /><br />

                        <label > Total leaves for this year  : {leavedata.totalLeaves}</label>
                        <br /><br />

                        <label > Available leaves  : {leavedata.availableLeaves}</label>
                        <br /><br />

                        <DatePicker hintText="From Date"  onChange={(event, newValue) =>{
                            this.setState({
                                    leaveFrom : newValue
                                })
                            }}  />
                        <Checkbox label="From Half Day"  onCheck={(event, checked) =>{
                            this.setState({
                                    isLeaveFromHalfDay : checked
                                })
                            }} />
                        <br /><br />
        
                        <DatePicker hintText="To Date" onChange={(event, newValue) =>{
                            this.setState({
                                    leaveTo : newValue
                                })
                            }} />
                        <Checkbox label="Till Half Day"  onCheck={(event, checked) =>{
                            this.setState({
                                    isLeaveToHalfDay : checked
                                })
                            }} />
                        <br /><br />
            
                        <RaisedButton label= "Submit" primary={true} onClick={(event) => this.handleSubmit(event)}/>
                        
                        <br /><br />
                    </form>
                    </div>
                </MuiThemeProvider>
            </div>
          );
    }
}

export default ApplyLeave;
