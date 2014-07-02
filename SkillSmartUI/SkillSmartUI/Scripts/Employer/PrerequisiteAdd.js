var viewModel = {}

$(document).ready(function () {
    initPrerequisiteAdd();
    ko.applyBindings(viewModel);
});

function getPrequisiteList() {

    var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite?parentId=0';
    var dataPrerequisiteObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlPrerequisite,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataPrerequisiteObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataPrerequisiteObj;
}

function initPrerequisiteAdd() {

    viewModel.prerequisiteName = ko.observable('');

    viewModel.selectedPrerequisite = ko.observable('');
    viewModel.prerequisite = ko.observableArray();

    var dataPrerequisiteObj = getPrequisiteList();

    viewModel.prerequisite.push({ name: "Prerequisite", id: "" });
    for (da in dataPrerequisiteObj) {

        viewModel.prerequisite.push({ name: dataPrerequisiteObj[da].PrerequisiteName, id: dataPrerequisiteObj[da].Id });
    }

}

viewModel.savePrerequisite = function () {

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}


    jobseekerworkExperienceObj.PrerequisiteName = jsonObjectWorkExperience.prerequisiteName;
    jobseekerworkExperienceObj.ParentId = jsonObjectWorkExperience.selectedPrerequisite.toString();

    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    alert(dataobjWorkExpereince);

    var apiUrlWorkExperience = GetWebAPIURL() + '/api/Prerequisite/';
    alert(apiUrlWorkExperience);
    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjWorkExpereince,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}