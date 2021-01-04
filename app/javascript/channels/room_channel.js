import consumer from "./consumer"

window.addEventListener('load', function () {
    // TODO: See: https://railsguides.jp/action_cable_overview.html
    roomChannel = consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
        initialized() {
            // 最初に呼び出される
        },
        received(data) {
            // データを受信したときに呼び出し
            ItemStatus = data;
            drawItem();
        },
        disconnected() {
            // WebSocketコネクションがクローズすると呼び出される
        },
        rejected() {
            // サブスクリプションがサーバーで却下されると呼び出される
        },
    })
})
