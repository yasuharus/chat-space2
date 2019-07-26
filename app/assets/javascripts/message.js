$(document).on('turbolinks:load', function() {

  function buildHTML(data) {
    var html =  `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${data.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${data.created_at}
                    </p>
                  </div>`

                  if (data.content != null) {
                    html += `<p class="message__text">${ data.content }</p>`
                  }

                  if (data.image != null) {
                    html += `<img src="${ data.image }", class="lower-message__image">`
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
});