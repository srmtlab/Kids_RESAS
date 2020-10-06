class RoomsController < ApplicationController

    def index
    end
    
    def select_room
        @rooms = []
        Room.all.order(created_at: :desc).each do |room|
          
            @rooms.push(room)

        end
    end

    def room
    end

    def login
    end

    def teacher_top
    end

    def edit_room
    end

    def edit_graph
    end

end
