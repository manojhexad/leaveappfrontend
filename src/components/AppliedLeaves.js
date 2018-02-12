import React, {Component} from "react";
import Nav from "./Nav";
import {getAppliedLeaves} from "../api/leave-api";
import {MuiThemeProvider} from "material-ui";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

class AppliedLeaves extends Component {
    constructor(){
        super();
        this.state = {
            appliedLeaves : []
        }
    }
    fetchAppliedLeaves(){
        getAppliedLeaves().then((leaves) => {
            this.setState({appliedLeaves : leaves});
        });
    }

    componentDidMount(){
        this.fetchAppliedLeaves();
    }

    render(){
        const{appliedLeaves} =this.state;
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <Nav history ={this.props.history}  title="Applied Leaves" link = "/appliedleaves"/>
                        <hr />
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>No. of days</TableHeaderColumn>
                                    <TableHeaderColumn>From</TableHeaderColumn>
                                    <TableHeaderColumn>To</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { appliedLeaves.map((leave, index) => (
                                    <TableRow key={leave.id}>
                                    <TableRowColumn>{ leave.days }</TableRowColumn>
                                    <TableRowColumn>{ leave.from }</TableRowColumn>
                                    <TableRowColumn>{ leave.to }  </TableRowColumn>
                                  </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default AppliedLeaves;
