$(document).on('turbolinks:load', function() {

  function buildHTML(message) {
    var html =  `<div class="message" data-id="${ message.id }">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>`

                  if (message.content != null) {
                    html += `<p class="message__text">${ message.content }</p>`
                  }

                  if (message.image != null) {
                    html += `<img src="${ message.image }", class="lower-message__image">`
                  }

    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data)
      $(".messages").append(html)
      $(".input-box__text").val('');
      $("#message-image").val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました")
    })
    .always(function() {
      $(".submit-btn").prop( 'disabled', false )
    });
  });

    var reloadMessages = function() {
      // var last_message_id = $('.message').last().data('id') || 0
       var last_message_id = $(".message:last").data("id");
      console.log(last_message_id)
        var group_id = $(".main-header__left-box").data("id");
      console.log(group_id)
      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        $.ajax({

          url: 'api/messages',
          type: "get",
          dataType: "json",
          data:     {id: last_message_id}
        })
        .done(function(messages) {
          console.log(messages)
            if (messages.length > 0) {
            messages.forEach(function(message) {
              var html = buildHTML(message);
              $(".messages").append(html);
              $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight});
            });
           }
        })
        .fail(function() {
          console.log("error");
        });
      }
    }

        setInterval(reloadMessages, 5000);
});