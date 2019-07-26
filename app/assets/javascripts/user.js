$(document).on('turbolinks:load', function() {
  var list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加
                </div>`

    list.append(html);
  }

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    list.append(html)
  }

  function appendMember(userId, userName) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="483">
                  <input value="${ userId }" name="group[user_ids][]" type="hidden" id="group_user_id" kl_vkbd_parsed="true">
                  <p class="chat-group-user__name">${ userName }</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id"${ userId }" data-user-name="${ userName}">削除</a>
                </div>`
    $(".chat-group-user-lower").append(html);
  }
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();
    var group_users = [];

    $(".member").each(function() {
     group_users.push($(this).attr("value"));
    });
    console.log(group_users)
    $.ajax({
      type: "GET",
      url:  "/users",
      dataType: "json",
      data: { keyword: input,
              group_users: group_users
      }
    })
    .done(function(users) {
      console.log(users)
      if (users.length !== 0 && input.length !== 0) {
        list.empty();
        users.forEach(function(user) {
          appendUser(user);
        });
      } else if (input.length == 0) {
        list.empty();
      } else {
        list.empty();
        appendErrMsg("一致する名前はありません");
      }
    })
    .fail(function() {
      alert("検索に失敗しました");
    })
  })

  $("#user-search-result").on("click",".user-search-add", function() {
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    console.log(userId);
    console.log(userName);
    $(this).parent().remove();
    appendMember(userId, userName)
  })

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  })
});