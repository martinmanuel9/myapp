function checkZip(){
    var zips = [85700, 85701, 85702];
    var serverLink = document.getElementById("serverLink").href; 

    for (var zip = 0; zip < zips.length; zip++) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", myHandler);
        xhr.responseType = "json"
        xhr.open("GET", serverLink + "lab/status?zip=" + zips[zip]);
        xhr.send();
    }
}

function incorrectDataFormat(){
    var zip = "not a zip";
    var serverLink = document.getElementById("serverLink").href; 

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", myHandler);
    xhr.responseType = "json"
    data = 
        {"zip" : zip,
            "airQuality" : 15
        };            
    xhr.open("POST", serverLink + "lab/register");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function correctDataFormat(){
    var zip = "85700";
    var serverLink = document.getElementById("serverLink").href; 

    //POST
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", postHandler);
    xhr.responseType = "json"
    data = 
        {"zip" : zip,
        "airQuality" : 533.07
    };            
    xhr.open("POST", serverLink + "lab/register");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));    

    //GET
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", getHandler);
    xhr.responseType = "json"
    xhr.open("GET", serverLink + "lab/status?zip=" + zip);
    xhr.send();
}

function verifyAggregation(){
    var zip = "85701";
    var values = [13.5, 57.0, 27];
    var serverLink = document.getElementById("serverLink").href;    

    //POST
    for (var i = 0; i < values.length; i++) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", postHandler);
        xhr.responseType = "json"
        data = 
            {"zip" : zip,
            "airQuality" : values[i]
        };          
        xhr.open("POST", serverLink + "lab/register");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
    };

    //GET
    xhr = new XMLHttpRequest();
    xhr.addEventListener("load", getHandler);
    xhr.responseType = "json"
    xhr.open("GET", serverLink + "lab/status?zip=" + zip);
    xhr.send();
}

function verifyDiffZip(){
    var zips = ["85700", "85701", "85702"];
    var values = [22.3, 25, 35.7, 35.8, 13, 27, -3.5, 7.3, 8];
    var avgs = [154.02, 28.88, 3.93]
    var serverLink = document.getElementById("serverLink").href; 

    //POST
    var j = 0;
    var zip = 0;
    while (j < values.length) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", postHandler);
        xhr.responseType = "json"
        data = 
                {"zip" : zips[zip],
                "airQuality" : values[j]
            };            
        xhr.open("POST", serverLink + "lab/register");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));  
        j++;
        if (j%3 === 0) {zip++;}
    }

    //GET
    var i = 0;
    while (i < zips.length) {
        xhr = new XMLHttpRequest();
        xhr.addEventListener("load", getHandler);
        xhr.responseType = "json"
        xhr.open("GET", serverLink + "lab/status?zip=" + zips[i]);
        xhr.send();
        i++;
    }
}
$(function(){
    $('#serverLink').click(checkZip);
    $('#serverLink').click(incorrectDataFormat);
    $('#serverLink').click(correctDataFormat);
    $('#serverLink').click(verifyAggregation);
    $('#serverLink').click(verifyDiffZip);
})