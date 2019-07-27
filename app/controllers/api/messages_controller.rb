# class Api::MessagesController < ApplicationController
#   def index
#     @group = Group.find(params[:group_id])

#     respond_to do |format|
#       format.html
#       format.json{ @messages = Message.where("id > ? and group_id = ? ", params[:id], @group.id) }
#       binding.pry
#     end

#   end
# end

class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
   
       @messages = Message.where('id > ? and group_id = ? ', params[:id], @group.id) 

    # @messages = Message.includes(:user).where('id > ?', params[:id])
    # binding.pry
  end

  # def index
  #   @messages = Message.includes(:user).where('id > ?', params[:id])
  # end

end