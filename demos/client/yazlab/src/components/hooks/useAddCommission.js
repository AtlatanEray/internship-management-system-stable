import {variables} from '../../Variables.js';
export async function postCommission(commissionsContent)  {
  var x;
  await fetch(variables.API_URL+'Commissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
    },
    body: commissionsContent
    
  });
  return x;
}

export async function deleteCommission(id)  {
    var x;
    await fetch(variables.API_URL+'Commissions/'+id, {
      method: 'DELETE',
      headers: {
        //'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
      },
      
      
    });
    console.log("commission id: " + x);
    return x;
  }



