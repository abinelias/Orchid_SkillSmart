function GetWebAPIURL() {
    return "http://localhost:2043/";
}
function getBaseURL() {
    return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getHeaderDetails() {
    //To get User details
    var apiUrlJobSeeker = GetWebAPIURL() + 'api/JobSeeker/';  //+ userId;
    var dataObjJobSeeker;

    $.ajax({
        url: apiUrlJobSeeker,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobSeeker = data;
        },
        error: function (xhr, status, error) {
            windows.location = "Account.html";
            // alert('Error :' + status);
        }
    });
    return dataObjJobSeeker;
}

