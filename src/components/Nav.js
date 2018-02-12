import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import {MuiThemeProvider, AppBar, Tabs, Tab, FlatButton} from "material-ui";
import '../App.css';
import {logout, isLoggedIn} from "../api/leave-api";

const styles = {
    appBar: {
      flexWrap: 'wrap'
    },
    tabs: {
      width: '100%'
    }
  }

class Nav extends Component {
    
    handleActive(tab) {
        this.props.history.push(`${tab.props['data-route']}`);
    }
    handleLogout = (event) => {
        var selfofObject = this;
        logout().then(
            function (response) {
                selfofObject.props.history.push('/login');
            }
        ).catch(function (error) {
            alert("Error logging out");
            });
    }

    render(){
        var activeTab = 0;
        if(this.props.link === "/applyLeave"){
            activeTab = 0;
        } else if(this.props.link === "/appliedleaves"){
            activeTab = 1;
        }
        return (
            <div>
                {isLoggedIn() ? 
                        (
                            <MuiThemeProvider>
                                <div>
                                    <AppBar title={<span style={styles.title}>{this.props.title}</span>} style={styles.appBar} 
                                        iconElementRight={<FlatButton label="Logout" onClick={(event) => this.handleLogout(event)} 
                                        />}>
                                        <Tabs style={styles.tabs} initialSelectedIndex={activeTab} >
                                            <Tab label="Apply Leave"  data-route="/applyLeave" onActive={this.handleActive.bind(this)}/>
                                            <Tab label="Applied Leaves" data-route="/appliedleaves" onActive={this.handleActive.bind(this)} />
                                        </Tabs>
                                    </AppBar>
                                    
                                </div>
                            </MuiThemeProvider>
                        ):
                        (
                            <Redirect to={{pathname:'/login'}} /> 
                        )
                    }
            </div>
        );
    }

}

export default Nav;