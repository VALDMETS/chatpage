import $ from 'jquery';
// import moment from 'moment';
// import Session from './session';
// import Message from './messagetemplate';
// import _ from './messageaction';
// import login from './login';
// import _ from './chat';

let currentLogin = '';

var moment = require('moment');
moment().format();

var now = moment();
console.dir(moment());
function Login(name) {
    this.name = name;
    $.ajax({
      url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat',
      type: 'GET',
      dataType: 'json',
      success: getMessages
    });
}
function Message(name, body, timestamp) {
    this.name = name;
    this.body = body;
    this.timestamp = timestamp;
    this._id = '';
}
function getMessages (response) {
    $('.chatwindow').html('');
    response.forEach(function(message){
      let buildDiv = `
        <div class="message" data-id="${message._id}">
          <h3>${message.name}</h3>
            <p>
              ${message.body} sent at ${message.timestamp}
            </p>
          <input type="button" class="delete" value="delete">
        </div>`;

      $('.chatwindow').append(buildDiv);
    });
    $('.delete').click(function(evt){
        let currentID = ($(evt.target).parent()[0].dataset.id);
        $.ajax({
          url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat/' + currentID,
          type: 'DELETE',
          dataType: 'json',
          success: function () {
            console.log('deleted!');
          }
        });
    });
}

$('#submitname').click(function(){
    currentLogin = new Login($('#username')[0].value);
    console.log(currentLogin);
    let interval = window.setInterval(function () {
      $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat',
        type: 'GET',
        dataType: 'json',
        success: getMessages
      });
    }, 2000);

});

$('#submitmessage').click(function(){
    let currentMessage = new Message (currentLogin.name, $('#newmessage')[0].value, 'now');
    console.log(currentMessage);
    $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat',
        type: 'POST',
        dataType: 'application/json',
        data: {
            name: currentMessage.name,
            body: currentMessage.body,
            timestamp: currentMessage.timestamp
        },
        success: function (response) {
            console.log('wow it posted');
        }
  });
});
