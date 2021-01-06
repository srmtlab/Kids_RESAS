class RoomChannel < ApplicationCable::Channel
    def subscribed
      stream_from "room_channel_#{params['room_id']}"


      redis = Redis.new(host: ENV["REDIS_HOST"], port: ENV["REDIS_PORT"])
      if redis.get(params['room_id']).nil?
        dropItems = []
      else
        dropItems = JSON.parse(redis.get(params['room_id']))
      end
      ActionCable.server.broadcast("room_channel_#{params['room_id']}", 
      {
        "operation": "initItem",
        "data": dropItems
      }
      )
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
          ActionCable.server.broadcast(
            "room_channel_#{params['room_id']}", 
            {
              "operation": "changeItem",
              "data": dropItems
            }
          )  
        elsif data["operation"] == "add" then
          if redis.get(params['room_id']).nil?
            dropItems = []
          else
            dropItems = JSON.parse(redis.get(params['room_id']))
          end
          dropItems.push data["data"]
          redis.set params['room_id'], dropItems.to_json
          ActionCable.server.broadcast(
            "room_channel_#{params['room_id']}", 
            {
              "operation": "changeItem",
              "data": dropItems
            }
          )
        elsif data["operation"] == "edit_graph" then
          graphKind = data["data"]["graphKind"]

          require "uri"
          require "net/http"

          # RESASからデータを取得する
          if graphKind == "0"
            url = URI("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=" + data["data"]["graphPref"])
          else
            url = URI("https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=-&prefCode=" + data["data"]["graphPref"])
          end

          https = Net::HTTP.new(url.host, url.port)
          https.use_ssl = true
          request = Net::HTTP::Get.new(url)

          # FIXME: APIKEYをハードコーディングするのはやめましょう
          request["X-API-KEY"] = "ed5KezaxujZ4Dew3YSbmCOi8JkCsxCEMjYZW0TEQ"

          response = https.request(request)


          if graphKind == "0"
            ActionCable.server.broadcast(
              "room_channel_#{params['room_id']}", 
              {
                "operation": "edit_graph_perYear",
                "data": JSON.parse(response.read_body)
              }
            )
          else
            ActionCable.server.broadcast(
              "room_channel_#{params['room_id']}", 
              {
                "operation": "edit_graph_sumPerYear",
                "data": JSON.parse(response.read_body)
              }
            )
          end
        end
    end
end