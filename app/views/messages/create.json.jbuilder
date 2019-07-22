json.content     @message.content
json.image       @message.image.url
json.user_id     current_user.id
json.group_id    @group.id
json.name        current_user.name
json.created_at  @message.created_at