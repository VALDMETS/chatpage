import $ from 'jquery';
import Message from './messagetemplate';

let newLogin = new Login('bobby');

function Login (username) {
  this.username = username;
}

$('#submitname').click(function(){
    newLogin.username = $('#username')[0].value;
    console.log(newLogin.username);
    
});

export default newLogin;
