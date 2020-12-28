window.onload = function() {
    content = document.getElementById("graphContentsFormControlSelect");
    category = document.getElementById("graphCategoryFormControlSelect");
    category.onchange = changeCategory;
}

function changeCategory() {
    var changeCategory = category.value;
    if (changeCategory == "0") {
        setPopulation();
    } else if (changeCategory == "1") {
        setIndustry();
    } else if (changeCategory == "2") {
        setAgriculture();
    }
}

function setPopulation() {
    content.textContent = null;
    var population = [
        {cd:"", label:"選択してください"},
        {cd:"0", label:"人口構成"},
        {cd:"1", label:"人口ピラミッド"},
        {cd:"2", label:"人口増加率"}
    ];
    population.forEach(function(value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}

function setIndustry() {
    content.textContent = null;
    var industry = [
        {cd:"", label:"選択してください"},
        {cd:"3", label:"製造額"},
    ];
    industry.forEach(function(value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}

function setAgriculture() {
    content.textContent = null;
    var agriculture = [
        {cd:"", label:"選択してください"},
        {cd:"4", label:"耕作面積"},
    ];
    agriculture.forEach(function(value) {
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        content.appendChild(op);
    });
}