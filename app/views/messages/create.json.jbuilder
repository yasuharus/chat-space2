json.(@message, :content, :image)
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
json.user_name @message.user.name
json.id @message.id
json.image @message.image.url
json.content @message.content
# json.content     @message.content
# json.image       @message.image.url
# json.user_id     current_user.id
# json.group_id    @group.id
# json.name        current_user.name
# json.created_at  @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")