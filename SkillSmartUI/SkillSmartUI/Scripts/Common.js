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
