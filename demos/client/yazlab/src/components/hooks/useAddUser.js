import {variables} from '../../Variables.js';

export function postUser(userContent)  {
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