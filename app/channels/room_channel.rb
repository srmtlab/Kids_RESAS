class RoomChannel < ApplicationCable::Channel
    def subscribed
      stream_from "room_channel_#{params['room_id']}"
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  

    def receive(data)
        ActionCable.server.broadcast("room_channel_#{params['room_id']}", data)
    end
end