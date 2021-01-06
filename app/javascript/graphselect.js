window.onload = function () {
    let controller = $('body').data('controller');

    if (controller === "graphs") {
        content = document.getElementById("graphContentsFormControlSelect");
        category = document.getElementById("graphCategoryFormControlSelect");
        prefecture = document.getElementById("graphPrefFormControlSelect");
        setPrefecture();

        category.onchange = changeCategory;
        content.onchange = changeContent;
    }
}

function changeCategory() {
    let changeCategory = category.value;

    if (changeCategory === "") {
        setNotSelected();
        changeContent();
    }
    else if (changeCategory == "0") {
        setPopulation();
        changeContent();
    }
    else if (changeCategory == "1") {
        setIndustry();
        changeContent();
    }
}

function changeContent() {
    let changeContent = content.value;

    edit_graph_button = document.getElementById("edit_graph_button");
    if (changeContent === "") {
        edit_graph_button.disabled = true;
    }
    else {
        edit_graph_button.disabled = false;
    }
}

function setNotSelected() {
    content.textContent = null;
    var NotSelected = [
        { cd: "", label: "選択してください" },
    ];
    NotSelected.forEach(function (value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}

function setPopulation() {
    content.textContent = null;
    var population = [
        { cd: "0", label: "人口構成" },
        { cd: "1", label: "人口ピラミッド" },
        { cd: "2", label: "人口増減" },
        { cd: "3", label: "出生数・死亡数/転入数・転出数" },
        { cd: "4", label: "進学者数の推移" },
        { cd: "5", label: "就職者数の推移" },
    ];
    population.forEach(function (value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}

function setIndustry() {
    content.textContent = null;
    var industry = [
        { cd: "0", label: "企業数" },
        { cd: "1", label: "事業所数" },
        { cd: "2", label: "従業者数（事業所単位）" },
        { cd: "3", label: "製造業-製造品出荷額" },
        { cd: "4", label: "小売業-年間商品販売額" },
        { cd: "5", label: "農業-品目別農業産出額" },
        { cd: "6", label: "農業-農業産出額" },
    ];
    industry.forEach(function (value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}

function setPrefecture() {
    let prefList = [{
        "prefCode": 1,
        "prefName": "北海道"
    }, {
        "prefCode": 2,
        "prefName": "青森県"
    }, {
        "prefCode": 3,
        "prefName": "岩手県"
    }, {
        "prefCode": 4,
        "prefName": "宮城県"
    }, {
        "prefCode": 5,
        "prefName": "秋田県"
    }, {
        "prefCode": 6,
        "prefName": "山形県"
    }, {
        "prefCode": 7,
        "prefName": "福島県"
    }, {
        "prefCode": 8,
        "prefName": "茨城県"
    }, {
        "prefCode": 9,
        "prefName": "栃木県"
    }, {
        "prefCode": 10,
        "prefName": "群馬県"
    }, {
        "prefCode": 11,
        "prefName": "埼玉県"
    }, {
        "prefCode": 12,
        "prefName": "千葉県"
    }, {
        "prefCode": 13,
        "prefName": "東京都"
    }, {
        "prefCode": 14,
        "prefName": "神奈川県"
    }, {
        "prefCode": 15,
        "prefName": "新潟県"
    }, {
        "prefCode": 16,
        "prefName": "富山県"
    }, {
        "prefCode": 17,
        "prefName": "石川県"
    }, {
        "prefCode": 18,
        "prefName": "福井県"
    }, {
        "prefCode": 19,
        "prefName": "山梨県"
    }, {
        "prefCode": 20,
        "prefName": "長野県"
    }, {
        "prefCode": 21,
        "prefName": "岐阜県"
    }, {
        "prefCode": 22,
        "prefName": "静岡県"
    }, {
        "prefCode": 23,
        "prefName": "愛知県"
    }, {
        "prefCode": 24,
        "prefName": "三重県"
    }, {
        "prefCode": 25,
        "prefName": "滋賀県"
    }, {
        "prefCode": 26,
        "prefName": "京都府"
    }, {
        "prefCode": 27,
        "prefName": "大阪府"
    }, {
        "prefCode": 28,
        "prefName": "兵庫県"
    }, {
        "prefCode": 29,
        "prefName": "奈良県"
    }, {
        "prefCode": 30,
        "prefName": "和歌山県"
    }, {
        "prefCode": 31,
        "prefName": "鳥取県"
    }, {
        "prefCode": 32,
        "prefName": "島根県"
    }, {
        "prefCode": 33,
        "prefName": "岡山県"
    }, {
        "prefCode": 34,
        "prefName": "広島県"
    }, {
        "prefCode": 35,
        "prefName": "山口県"
    }, {
        "prefCode": 36,
        "prefName": "徳島県"
    }, {
        "prefCode": 37,
        "prefName": "香川県"
    }, {
        "prefCode": 38,
        "prefName": "愛媛県"
    }, {
        "prefCode": 39,
        "prefName": "高知県"
    }, {
        "prefCode": 40,
        "prefName": "福岡県"
    }, {
        "prefCode": 41,
        "prefName": "佐賀県"
    }, {
        "prefCode": 42,
        "prefName": "長崎県"
    }, {
        "prefCode": 43,
        "prefName": "熊本県"
    }, {
        "prefCode": 44,
        "prefName": "大分県"
    }, {
        "prefCode": 45,
        "prefName": "宮崎県"
    }, {
        "prefCode": 46,
        "prefName": "鹿児島県"
    }, {
        "prefCode": 47,
        "prefName": "沖縄県"
    }]

    prefList.forEach(function (value) {
        var op = document.createElement("option");
        op.value = value.prefCode;
        op.text = value.prefName;
        prefecture.appendChild(op);
    });
}

