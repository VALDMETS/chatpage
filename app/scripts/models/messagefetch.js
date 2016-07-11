function fetchMessages() {
  $.ajax({
    url: 'http://tiny-za-server.herokuapp.com/collections/benscoolchat',
    type: 'GET',
    dataType: 'json',
    success: getMessages
  });
}

// export default fetchMessages();
