import {variables} from '../../Variables.js';

export function postStudent(userContent)  {
  var x;
  fetch(variables.API_URL+'Users/studentSignUp/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
    },
    body: userContent
    
  }).then(res => res.json())
  .then(response => {return (response.id);}, error => console.error('Error:', error));
  console.log("user id: " + x);
  return x;
}

export function postTeacher(userContent)  {
    var x;
    fetch(variables.API_URL+'Users/teacherSignUp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
      },
      body: userContent
      
    }).then(res => res.json())
    .then(response => {return (response.id);}, error => console.error('Error:', error));
    console.log("user id: " + x);
    return x;
  }

  export function postAdmin(userContent)  {
    var x;
    fetch(variables.API_URL+'Users/adminSignUp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
      },
      body: userContent
      
    }).then(res => res.json())
    .then(response => {return (response.id);}, error => console.error('Error:', error));
    console.log("user id: " + x);
    return x;
  }