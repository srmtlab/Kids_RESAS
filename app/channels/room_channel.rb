class RoomChannel < ApplicationCable::Channel
    def subscribed
      stream_from "room_channel_#{params['room_id']}"


      redis = Redis.new(host: ENV["REDIS_HOST"], port: ENV["REDIS_PORT"])
      if redis.get(params['room_id']).nil?
        dropItems = []
      else
        dropItems = JSON.parse(redis.get(params['room_id']))
      end
      ActionCable.server.broadcast("room_channel_#{params['room_id']}", dropItems)
    end
  
    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  

    def receive(data)
        # サーバーでデータを受信した時
        redis = Redis.new(host: ENV["REDIS_HOST"], port: ENV["REDIS_PORT"])
        if data["operation"] == "deleteAll" then
          unless redis.get(params['room_id']).nil? then
            redis.del params['room_id']
          end
          dropItems = []
        elsif data["operation"] == "add" then
          if redis.get(params['room_id']).nil?
            dropItems = []
          else
            dropItems = JSON.parse(redis.get(params['room_id']))
          end
          dropItems.push data["data"]
          redis.set params['room_id'], dropItems.to_json
        end
        ActionCable.server.broadcast("room_channel_#{params['room_id']}", dropItems)
    end
end