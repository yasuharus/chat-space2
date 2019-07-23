$(document).on('turbolinks:load', function() {
  var list = $("#user-search-result");

  function appendUser(user) {
    var html = `<p class="chat-group-user__name">${ user.name }</p>`

    list.append(html);
  }

  function appendErrMsg(msg) {
    var html = `<p class="chat-group-user__name">${ msg }</p>`

    list.append(html)
  }
  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();
    // var group_users = [];

    // $(".member").each(function() {
    //   group_users.push($(this).attr("value"));
    // });
    // console.log(group_users)
    $.ajax({
      type: "GET",
      url:  "/users",
      dataType: "json",
      data: { keyword: input,
              // group_users: group_users
      }
    })
    .done(function(users) {
      if (users.length !== 0 && input.length !== 0) {
        console.log(users)
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
})