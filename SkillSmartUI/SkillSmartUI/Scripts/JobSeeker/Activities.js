$(document).ready(function () {

    initActivity();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getJobseekerExtraCurricularActivity() {
    var apiUrlExtraCurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity?jobSeekerId=' + userId;
    var dataObjActivities;

    //To get Activities from ExtraCurricularActivities table
    $.ajax({
        url: apiUrlExtraCurricularActivity,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjActivities = data;

        },
        error: function (xhr, status, error) {
            alert('Eroooror12 :' + status);
        }
    });
    return dataObjActivities;
}

function initActivity() {

    viewModel.activityCheck = ko.observable('0');
    viewModel.isEditableActivity = ko.observable(false);
    viewModel.btnActivity = ko.observable("Edit");
    viewModel.activitiesArray = ko.observableArray();

    var dataObjActivities = getJobseekerExtraCurricularActivity();

    if (dataObjActivities) {

        for (var i = 0; i < dataObjActivities.length; i++) {
            viewModel.activityCheck('1');
            var activity = new createActivity(dataObjActivities[i]);
            viewModel.activitiesArray.push(activity);
        }
    }

}

function createActivity(da) {

    var self = this;
    self.JobSeekerId = ko.observable(userId);
    self.Id = ko.observable('');
    self.isEdit = ko.observable('0');
    self.Activity = ko.observable('');
    self.StartDate = ko.observable('');
    self.EndDate = ko.observable('');
    self.deleteCheck = ko.observable('1');

    if (da) {
        self.JobSeekerId(da.JobSeekerId);
        self.Id(da.Id);
        self.isEdit('0');
        self.Activity(da.Activity);
        self.StartDate(da.StartDate);
        self.EndDate(da.EndDate);
    }
}
var selectedActivity;
viewModel.editActivityDetails = function (activityObj) {
    selectedActivity = ko.toJS(activityObj);
    activityObj.isEdit('1');
    activityObj.deleteCheck('1');
}
viewModel.addFirstActivity = function () {
    viewModel.btnActivity("Add More");
    viewModel.isEditableActivity(true);
    var activity = new createActivity();
    activity.isEdit('1');
    activity.deleteCheck('0');
    viewModel.activitiesArray.push(activity);
}
viewModel.saveActivities = function (activityObj) {

    if (viewModel.activityCheck() == 1) {
        document.getElementById("addMoreActivity").disabled = false;
    }
    var jsonObjectActivity = ko.toJS(activityObj);
    //alert(convert(jsonObjectActivity.StartDate));
    if (jsonObjectActivity.Id) {
        var dataObjActivity;
        var jobSeekerActivityObj = {}
        jobSeekerActivityObj.JobSeekerId = jsonObjectActivity.JobSeekerId;
        jobSeekerActivityObj.Activity = jsonObjectActivity.Activity;
        jobSeekerActivityObj.StartDate = jsonObjectActivity.StartDate;
        jobSeekerActivityObj.EndDate = jsonObjectActivity.EndDate;

        dataObjActivity = JSON.stringify(jobSeekerActivityObj);
        var apiUrlActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity?Id=' + jsonObjectActivity.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlActivity,
            type: "PUT",
            data: dataObjActivity,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                activityObj.isEdit('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
        var dataObjActivity;
        var jobSeekerActivityObj = {}
        jobSeekerActivityObj.JobSeekerId = jsonObjectActivity.JobSeekerId;
        jobSeekerActivityObj.Activity = jsonObjectActivity.Activity;
        jobSeekerActivityObj.StartDate = jsonObjectActivity.StartDate;
        jobSeekerActivityObj.EndDate = jsonObjectActivity.EndDate;

        dataObjActivity = JSON.stringify(jobSeekerActivityObj);
        var apiUrlActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlActivity,
            type: "Post",
            data: dataObjActivity,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                activityObj.isEdit('0');
                activityObj.Id(data);
                viewModel.activityCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
}
viewModel.cancelActivities = function (activityObj) {
    if (viewModel.activityCheck() == 1) {
        document.getElementById("addMoreActivity").disabled = false;
    }
    var jsonObjectActivity = ko.toJS(activityObj);
    if (jsonObjectActivity.Id) {
        activityObj.isEdit('0');
        activityObj.Activity(selectedActivity.Activity);
        activityObj.StartDate(selectedActivity.StartDate);
        activityObj.EndDate(selectedActivity.EndDate);
    }
    else {
        viewModel.activitiesArray.remove(activityObj);
    }

    if (viewModel.activitiesArray().length == 0) {
        viewModel.activityCheck('0');
        viewModel.isEditableActivity(false);
    }
}
viewModel.deleteActivities = function (activityObj) {

    var Activitydelete = confirm("Do you want to delete!");

    var jsonObjectActivity = ko.toJS(activityObj);
    if (Activitydelete == true) {
        if (jsonObjectActivity.Id) {
            var apiUrlActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity?Id=' + jsonObjectActivity.Id;
            //To delete data from Language Table
            $.ajax({
                url: apiUrlActivity,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.activitiesArray.remove(activityObj);
                    if (viewModel.activitiesArray().length == 0) {
                        viewModel.activityCheck('0');
                        viewModel.isEditableActivity(false);
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
        else {
            viewModel.activitiesArray.remove(activityObj);
        }
    }
}
viewModel.clickButtonActivity = function () {
    document.getElementById("addMoreActivity").disabled = true;
    if (viewModel.btnActivity() == "Add More") {
       
        var activity = new createActivity();
        activity.isEdit('1');
        activity.deleteCheck('0');
        viewModel.activitiesArray.splice(0, 0, activity);
    }

    else {
        viewModel.btnActivity("Add More");
        viewModel.isEditableActivity(true);
        document.getElementById("addMoreActivity").disabled = false;
    }

}
viewModel.whichTemplateToUseActivity = function () {
    return viewModel.isEditableActivity() ? "EditActivities" : "ViewActivities";
}
function convert(str) {

    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");

}
