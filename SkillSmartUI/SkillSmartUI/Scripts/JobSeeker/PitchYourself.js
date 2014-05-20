$(document).ready(function () {

    initAboutMe();
});
var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

var selectedPitch;
function getJobseekerPitch() {
    var apiUrlOverview = GetWebAPIURL() + '/api/Overview/' + userId;
    var dataObjOverview;

    //To get overview details
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjOverview = data;

        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });
    selectedPitch = dataObjOverview;
    return dataObjOverview;
}


function initAboutMe() {
    viewModel.myinfoid = ko.observable();

    viewModel.aboutMeCheck = ko.observable('0');
    viewModel.jobseekerId = ko.observable();
    viewModel.isEditableAboutMe = ko.observable(false);
    viewModel.btnAboutMe = ko.observable("Edit");
    viewModel.summary = ko.observable().extend({ required: { message: "About me required" } });

    var dataObjOverview = getJobseekerPitch();
    if (dataObjOverview) {
        viewModel.myinfoid(dataObjOverview.Id);
        viewModel.jobseekerId(dataObjOverview.JobSeekerId);

        if (dataObjOverview.Summary) {
            viewModel.summary(dataObjOverview.Summary);
            viewModel.aboutMeCheck('1');
        }
    }
}

viewModel.saveAboutMe = function () {
    var dataObjOverview = getJobseekerPitch();


    var dataObjMyInfo;
    var jobSeekerMyInfoObj = {}
    var jsonObject = ko.toJS(viewModel);

    if (dataObjOverview) {
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.Summary = jsonObject.summary;
        jobSeekerMyInfoObj.Industry = dataObjOverview.Industry;
        jobSeekerMyInfoObj.Speciality = dataObjOverview.Speciality;
        jobSeekerMyInfoObj.SecurityClearanceId = dataObjOverview.SecurityClearanceId;
        jobSeekerMyInfoObj.WillingToRelocateId = dataObjOverview.WillingToRelocateId;
        jobSeekerMyInfoObj.CurrentStatus = dataObjOverview.CurrentStatus;
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    else {
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.CurrentStatus = jsonObject.accountStatusId;
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    if (jsonObject.myinfoid) {

        var apiUrlAboutMe = GetWebAPIURL() + '/api/Overview/' + jsonObject.myinfoid;
        //To update Overview table
        $.ajax({
            url: apiUrlAboutMe,
            type: "PUT",
            data: dataObjMyInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableAboutMe(false);
                viewModel.btnAboutMe("Edit");


            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
        var dataObjMyInfo;
        var jobSeekerMyInfoObj = {}
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.Summary = jsonObject.summary;
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);

        var apiUrlAboutMe = GetWebAPIURL() + '/api/Overview/';
        //To Isert details into overview table
        $.ajax({
            url: apiUrlAboutMe,
            type: "POST",
            data: dataObjMyInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableAboutMe(false);
                viewModel.btnAboutMe("Edit");
                viewModel.myinfoid(data);
                viewModel.aboutMeCheck('1');

            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
}
viewModel.clickButtonAboutMe = function () {

    viewModel.btnAboutMe("Submit");
    viewModel.isEditableAboutMe(true);
}
viewModel.cancelAboutMe = function () {
    aboutObj = ko.toJS(viewModel);

    if (aboutObj.myinfoid) {
        viewModel.summary(selectedPitch.Summary);
        viewModel.isEditableAboutMe(false);
        viewModel.btnAboutMe("Edit");
    }
}
viewModel.whichTemplateToUseAboutMe = function () {
    return viewModel.isEditableAboutMe() ? "EditAboutMe" : "ViewAboutMe";
}
viewModel.pitchYourself = function () {
    viewModel.btnAboutMe("Submit");
    viewModel.isEditableAboutMe(true);
    viewModel.aboutMeCheck('1');
    this.jobseekerId(userId);
}

