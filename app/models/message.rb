class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader

  # def show_last_message
  #   if (last_message = messages.last).present?
  #     last_message.content? ? last_message.content : '画像が投稿されています'
  #   else
  #     'まだメッセージはありません。'
  #   end
  # end
end
