class RoomsController < ApplicationController

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
        # @room = Room.find(params[:id]).reload
        
        # TODO: 以下はテストのためのコード
        @room = Room.find(2).reload
    end

    def teacher_top
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
