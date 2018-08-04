function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText;
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                // alert(allText);
            }
        }
    }
    rawFile.send(null);
    return allText;
}

var arrayObserve = [];
var numOfThing;
window.onload = function(e) {
    alert("Bạn có 30s sau khi bấm nút OK. Hãy quan sát thật kĩ");
    var fileResult = readTextFile("source-img.txt");
    arrayFileResult = fileResult.split("\r\n");
    arraySize = arrayFileResult.length;

    numOfThing = (Math.floor((Math.random() * 10) + 1)) % 19 + 10;
    console.log(numOfThing);

    for (var i = 0; i < numOfThing; i++) {
        arrayObserve.push(arrayFileResult[Math.floor(Math.random() * arraySize)]);
    }
    console.log(arrayObserve);

    var result = "";
    var arrayData;
    for (var i = 0; i < numOfThing; i++) {
        arrayData = arrayObserve[i].split(";");
        result += "<img class='col-md-4 col-sm-6 col-xs-12 thumbnail img-responsive' src='" + arrayData[1] + "' width=200 alt='" + arrayData[0] + "'>";
    }
    document.getElementById("list-img").innerHTML = result;

    setTimeout(function() {
        $("#list-img").remove();
        alert("Time out!!!");
        var form = "<h3>Bạn nhớ được những hình nào?</h3><h6>Hãy viết tên chúng dưới đây bằng tiếng việt có. Bạn không cần phải quan tâm đến thứ tự</h6><form>";
        for (var i = 0; i < numOfThing; i++) {
            form += "<br><input id='" + i + "' type='text'/>";
        }
        form += "<br><input type='button' id='check-button' value='Kiểm tra' onclick='check()'/></form>";
        document.getElementById("check-observe").innerHTML = form;
    }, 30000);




}

function check() {
    var result = [];
    for (var i = 0; i < numOfThing; i++) {
        data = arrayObserve[i].split(";");
        result.push(data[0].toLowerCase());
    }
    var socaudong = 0;
    for (var i = 0; i < numOfThing; i++) {
        var yourResult = document.getElementById(i).value.toLowerCase();
        if (result.includes(yourResult)) {
            document.getElementById(i).setAttribute("class", "right");
            socaudong++;
        } else {
            document.getElementById(i).setAttribute("class", "wrong");
        }
    }
    var diem = socaudong * 100 / numOfThing;
    alert("Bạn đã đúng " + socaudong + "/" + numOfThing + " câu. Được " + diem + " diem.");
    $("#check-button").remove();

    var answer = "<h3>Đáp án</h3>";
    for (var i = 0; i < numOfThing; i++) {
        answer += "<p class='right'>" + result[i] + "</p>";
    }
    document.getElementById("answer").innerHTML = answer;

    console.log(result);
    console.log(yourResult);
    return result;
};