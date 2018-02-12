
// eslint-disable-next-line
import axios from "axios";

// eslint-disable-next-line
const BASEURL="https://hexad.de/leaves/api";

export {getAppliedLeaves, getLeavesData, submitLeave, login, setToken, getToken, isLoggedIn, logout};



function getAppliedLeaves(){
    //const url = `${BASEURL}/appliedLeaves`;
    //return axios.get(url).then(response =>response.data);
    const jsonData = [{id: 1, from: "1/Jan/2018", to: "3/Jan/2018", days:"3"},
            {id: 2, from: "12/Jan/2018", to: "12/Jan/2018", days:"1"}];
    return  new Promise((resolve, reject) => {
        resolve(jsonData)
    });
}


function getLeavesData(){
    //const url = `${BASEURL}/leavesData`;
    //return axios.get(url).then(response => response.data);
    const jsonData =  {name: "Manoj", previousYearLeaves:10, totalLeaves : 30, availableLeaves : 20};
    return  new Promise((resolve, reject) => {
        resolve(jsonData)
    });
}

function submitLeave(applyLeave){
    //console.log(applyLeave);
    //const url = `${BASEURL}/submitLeave`;
    // return axios.post(url, applyLeave)
    //   .then(response =>{
    //     return response.data;
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const jsonData =  {success : true};
    return  new Promise((resolve, reject) => {
        resolve(jsonData)
    });
}

function login(loginCredentials){
    // const url = `${BASEURL}/login`;
    // var payload={
    //     "email":    loginCredentials.username,
    //     "password": loginCredentials.password
    // }
    // console.log(payload);
    // return axios.post(url, payload)
    // .then(response => response.data);

    const jsonData =  {data: {code : 200, token : 12345678910}};
    return  new Promise((resolve, reject) => {
        resolve(jsonData)
    });
}


function logout(){
    // const url = `${BASEURL}/login`;
    // var payload={
    //     "email":    loginCredentials.username,
    //     "password": loginCredentials.password
    // }
    // console.log(payload);
    // return axios.post(url, payload)
    // .then(response => response.data);
    localStorage.removeItem("authtoken");
    const jsonData =  {success : true};
    return  new Promise((resolve, reject) => {
        resolve(jsonData)
    });
}

function setToken(authToken) {
    localStorage.setItem("authtoken", authToken);
}
function getToken() {
    return localStorage.getItem("authtoken");
}
function isLoggedIn() {
    const token = getToken();
    //console.log("isLoggedIn has been called.");
    return token && token.length >0;
}