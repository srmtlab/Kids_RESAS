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
        Room.create(room_params)
    end

    def show

    end

    def teacher_top
    end

    def edit_room
    end

    def edit_graph
    end

    private
    def room_params
        params.require(:user).require(:graph).permit(:title, :detail)
    end
end
