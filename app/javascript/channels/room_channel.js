import consumer from "./consumer"

window.addEventListener('load', function () {
    let controller = $('body').data('controller');
    let allowControllerList = ["graphs", "rooms"]

    if (allowControllerList.includes(controller)) {
        // TODO: See: https://railsguides.jp/action_cable_overview.html
        roomChannel = consumer.subscriptions.create({ channel: "RoomChannel", room_id: room_id }, {
            initialized() {
                // 最初に呼び出される
            },
            received(data) {
                // データを受信したときに呼び出し
                if (controller === "rooms") {
                    if (data["operation"] === "initItem" || data["operation"] === "changeItem") {
                        ItemStatus = data["data"];
                        drawItem();
                    }
                    else if (data["operation"] === "edit_graph_perYear") {
                        drawPerYear(data["data"]);
                    }
                    else if (data["operation"] === "edit_graph_sumPerYear") {
                        drawSumPerYear(data["data"]);
                    }
                }
            },
            disconnected() {
                // WebSocketコネクションがクローズすると呼び出される
            },
            rejected() {
                // サブスクリプションがサーバーで却下されると呼び出される
            },
        })
    }
})
