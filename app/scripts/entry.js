import $ from 'jquery';
import moment from 'moment';
import currentLogin from './models/login.js';
import './models/messagefetch.js';
import Message from './models/messagetemplate.js';

let now = moment().format();

function getMessages (response) {
    $('.chatwindow').html('');
    response.forEach(function(message){
      let buildDiv = `
        <div class="message" data-id="${message._id}">
          <h3>${message.name}</h3>
            <p>
              ${message.body}
            </p> ${message.timestamp}`;
      if (currentLogin.name === message.name) {
        buildDiv += '<input type="button" class="delete" value="delete"></div>';
      } else {
        buildDiv += '</div>';
      }
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
    $('.login-page').addClass('hidden');
    $('.chat-page').removeClass('hidden');
    currentLogin.name = $('#username')[0].value;
    console.log($('#username')[0].value);
    console.log(currentLogin);
    let interval = window.setInterval(function () {
      $.ajax({
        url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat',
        type: 'GET',
        dataType: 'json',
        success: getMessages
      });
    }, 1000);

});

$('#submitmessage').click(function(){
    let now = 'sent at ' + String(moment().format()).slice(11,16) + ' on ' + String(moment().format()).slice(5,10);
    let currentMessage = new Message (currentLogin.name, $('#newmessage')[0].value, now);
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
