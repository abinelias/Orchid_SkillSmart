var viewModel = {}

$(document).ready(function () {
    initAddPrerequisite();
    ko.applyBindings(viewModel);
});


function initAddPrerequisite() {

    viewModel.prerequisiteName = ko.observable('');

}

viewModel.savePrerequisite = function () {

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}


    jobseekerworkExperienceObj.PrerequisiteName = jsonObjectWorkExperience.prerequisiteName;
    jobseekerworkExperienceObj.ParentId = 0;

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