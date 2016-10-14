(function() {
  $(document).ready(function () {
      var chatElement = $('section#chat p');
      var form = $('#chat-form');

      var username = $(form).find("input[name='username']").val();
      var socket = undefined;

      socket = io();
      socket.on('connect', function () {
        socket.emit('enter', username);
      });

      socket.on('enter', function (username) {
        $(chatElement).append(username  + "<br/>");
      });

      socket.on('chat', function (data) {
        $(chatElement).append(data.username  + " : " + data.msg  +"</br>");
      });

      socket.on('disconnect', function (data) {
        $(chatElement).append(data +"<br/>");
      });


      form.submit(function () {
        var input = $(this).find("input[name='message']");
        var message = input.val();

        var data = {
          username : username,
          msg : message
        };

        socket.emit('chat', data);

        input.val('');

        return false;
      });
  });
})();
