module ApplicationHelper
  def simple_time(time)
    time.strftime('%Y/%m/%d(%a) %H:%M:%S')
  end

  # def show_last_message
  #   if (last_message = messages.last).present?
  #     last_message.content? ? last_message.content : '画像が投稿されています'
  #   else
  #     'まだメッセージはありません。'
  #   end
  # end
end
