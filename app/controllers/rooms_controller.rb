class RoomsController < ApplicationController
    # new, createに関しては、ログインしていないユーザーのアクセスを許可しない
    # See: https://qiita.com/tobita0000/items/866de191635e6d74e392
    before_action :authenticate_user!, only: [:new, :create]

    def index
        @rooms = []
        Room.all.order(created_at: :desc).each do |room|
            @rooms.push(room)
        end
    end
    
    def new
        @room = Room.new
    end

    def create
        @room = Room.new(room_params)
        @room.user = current_user
        @room.save

        redirect_to rooms_path
    end

    def show
        # TODO: 本来は以下のコードを実行する
        @room = Room.find(params[:id]).reload
    end


    def edit_room
    end

    def edit_graph
    end

    private
    def room_params
        params.require(:room).permit(:title, :detail)
    end
end
