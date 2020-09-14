class RoomsController < ApplicationController

    def index
    end
    
    def select_room
        @rooms = []
        Room.all.order(created_at: :desc).each do |room|
          
            @rooms.push(room)

        end
    end

end
