import React, { Component } from 'react';
import {MuiThemeProvider, AppBar, RaisedButton, TextField} from "material-ui";
import { Redirect } from 'react-router-dom';

import {login, isLoggedIn} from "../api/leave-api";



class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            redirectToReferrer: false
        }
    }
    
    handleLogin = (e) => {
        e.preventDefault();
        var selfObject = this;
        login(this.state).then(
            function (response) {
                if(response.data.code === 200){
                    localStorage.setItem("authtoken", response.data.token);
                    selfObject.props.history.push('/home');
                } else if(response.data.code === 204){
                    alert("username password do not match")
                }
                else{
                    alert("Username does not exist");
                }
            }
        ).catch(function (error) {
                alert("Error logging in");
            });
    }
    render(){
        return(
            <div>
                {
                    isLoggedIn() ? 
                        (
                            <Redirect to={{pathname:'/home'}} /> 
                        ):
                        (
                            <MuiThemeProvider>
                            <div>
                                <AppBar title ="Login" />
                                <TextField 
                                    hintText="Enter your Username"
                                    floatingLabelText="Username" 
                                    onChange={(event, newValue) =>this.setState({
                                        username: newValue
                                    })}
                                />
                                <br />
                                <TextField 
                                    type = "password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password" 
                                    onChange={(event, newValue) =>this.setState({
                                        password: newValue
                                    })}
                                />
                                <br /> <br />
                                <RaisedButton label= "Submit" primary={true} style = {style} onClick={(event) => this.handleLogin(event)}/>

                            </div>
                        </MuiThemeProvider>
                        )
                }
            </div>
        )
    }

}
const style = {
    margin: 15,
   };
export default Login;