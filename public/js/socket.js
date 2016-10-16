(function() {
  $(document).ready(function () {
      var chatElement = $('section#chat p');
      var form = $('#chat-form');

      var userCnt = $('#userCnt');

      var username = $(form).find("input[name='username']").val();
      var profilePhoto = $(form).find("input[name='photo']").val();
      var socket = undefined;

      socket = io();
      socket.on('connect', function () {
        socket.emit('enter', username);
      });

      socket.on('enter', function (data) {
        $(userCnt).text(data.userCnt + '명');
        $(chatElement).append(data.username  + "님이 들어오셨습니다.<br/>");
      });

      socket.on('chat', function (data) {
        $(chatElement).append(data.photoTag + " " + data.username  + " : " + data.msg  +"</br>");
      });

      socket.on('disconnect', function (data) {
        $(userCnt).text(data.userCnt + '명');
        $(chatElement).append(data.username +"님이 나가셨습니다.<br/>");
      });


      form.submit(function () {
        var input = $(this).find("input[name='message']");
        var message = input.val();
        var photoTag = "<img src='{photo}' style='border-radius:30px;width:30px;height:30px;'/>";
        photoTag = photoTag.replace(/{photo}/g, profilePhoto);

        var data = {
          username : username,
          msg : message,
          photoTag : photoTag
        };

        socket.emit('chat', data);

        input.val('');

        return false;
      });
  });
})();
