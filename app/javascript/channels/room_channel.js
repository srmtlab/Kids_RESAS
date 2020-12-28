import consumer from "./consumer"

window.addEventListener('load', function () {
    // TODO: See: https://railsguides.jp/action_cable_overview.html
    const roomChannel = consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
        initialized() {
            // 最初に呼び出される
            console.log("初期化");
        },
        received(data) {
            // データを受信したときに呼び出し
            console.log(data);
        },
        disconnected() {
            // WebSocketコネクションがクローズすると呼び出される
        },
        rejected() {
            // サブスクリプションがサーバーで却下されると呼び出される
        },
    })

    // TODO: See: https://developer.mozilla.org/ja/docs/Web/API/HTML_Drag_and_Drop_API
    let squareFrame = document.getElementById("square-frame")

    squareFrame.addEventListener('click', function (event) {
        //TODO: https://murashun.jp/blog/20191110-48.html
        roomChannel.send({ offsetX: event.offsetX, offsetY: event.offsetY })
    })

    let items = document.getElementById("light_bl")

    items.addEventListener('dragend', function (event) {
        roomChannel.send({ offsetX: event.offsetX, offsetY: event.offsetY })
    })

    // 
})
