$(document).ready(function () {

    initAcountStatus();
});

function getJobSeekerCurrentStatus()
{
    var apiUrlCurrentStatusLookup = GetWebAPIURL() + 'api/Lookup/?name=CurrentStatus';
    var dataObjCurrentStatus;

    //To get overview details
    $.ajax({
        url: apiUrlCurrentStatusLookup,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjCurrentStatus = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjCurrentStatus;
   
}
function getJobseekerAccountStatusOverView()
{
  var apiUrlOverview = GetWebAPIURL() + 'api/Overview/'; // + userId;
    var dataObjOverview;

    //To get overview details
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjOverview = data;

        },
        error: function (xhr, status, error) {
            alert('Eroror :' + status);
        }
    });
    return dataObjOverview;
}

function initAcountStatus() {

    viewModel.errorCheckAccountStatus = ko.observable('0');

    viewModel.overviewId = ko.observable();
    viewModel.accountStatusCheck = ko.observable('0');
    viewModel.jobseekerId = ko.observable();
    viewModel.isEditableAccountStatus = ko.observable(false);
    viewModel.btnAccountStatus = ko.observable("Edit");


    viewModel.currentStatus = ko.observableArray();
    viewModel.currentStatusId = ko.observableArray();
    viewModel.currentStatusName = ko.observableArray();

    var dataObjCurrentStatus = getJobSeekerCurrentStatus();


    for (da in dataObjCurrentStatus) {

        viewModel.currentStatus.push({
            name: dataObjCurrentStatus[da].Name,
            id: dataObjCurrentStatus[da].Id
        });
    }



    var dataObjOverview = getJobseekerAccountStatusOverView();


    if (dataObjOverview) {
        viewModel.overviewId(dataObjOverview.Id);
        viewModel.jobseekerId(dataObjOverview.JobSeekerId);
        if (dataObjOverview.CurrentStatus) {
            var getCurrentStatusType = dataObjOverview.CurrentStatus;
            var notification = getCurrentStatusType.split(',');
            for (var index = 0; index < notification.length; index++) {
                viewModel.currentStatusId.push(notification[index]);
            }
            viewModel.accountStatusCheck('1');
        }

        getCurrentStatusName(dataObjOverview.CurrentStatus);
    }
}

function createListAccountStatus() {
    var dataObjCurrentStatus = getJobSeekerCurrentStatus();
    var list = [];
    for (da in dataObjCurrentStatus) {
        list.push({
            label: dataObjCurrentStatus[da].Name,
            value: dataObjCurrentStatus[da].Id
        });
    }
    return list;
}

function getCurrentStatusName(CurrentStatus) {
    viewModel.currentStatusName.removeAll();
    //var dataObjOverview = getJobseekerAccountStatusOverView();
    //var getCurrentStatusType = dataObjOverview.CurrentStatus;
    var notification = CurrentStatus.split(',');

    for (var j = 0; j < viewModel.currentStatus().length; j++) {
        for (var index = 0; index < notification.length; index++) {

            if (viewModel.currentStatus()[j].id == notification[index]) {

                viewModel.currentStatusName.push(viewModel.currentStatus()[j].name);

            }
        }
    }
    return viewModel.currentStatusName();
}

var accountStatus;
viewModel.clickButtonAccountStatus = function () {
    //accountStatus = viewModel.selectedIndexCurrentStatus();
    viewModel.btnAccountStatus("Submit");
    viewModel.isEditableAccountStatus(true);
}

viewModel.addAccountStatus = function () {
    viewModel.btnAccountStatus("Submit");
    viewModel.isEditableAccountStatus(true);
    // viewModel.accountStatusCheck('1');
}

viewModel.saveAccountStatus = function () {
   
    if (viewModel.currentStatusId()!="") {

  var apiUrlOverview = GetWebAPIURL() + 'api/Overview/'; // + userId;
    var dataObjOverview;
    //To get overview details
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjOverview = data;
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });

    var dataObjMyInfo;
    var jobSeekerMyInfoObj = {}
    var jsonObject = ko.toJS(viewModel);

    if (dataObjOverview) {
        jobSeekerMyInfoObj.Summary = dataObjOverview.Summary;
        jobSeekerMyInfoObj.Industry = dataObjOverview.Industry;
        jobSeekerMyInfoObj.Speciality = dataObjOverview.Speciality;
        jobSeekerMyInfoObj.SecurityClearanceId = dataObjOverview.SecurityClearanceId;
        jobSeekerMyInfoObj.WillingToRelocateId = dataObjOverview.WillingToRelocateId;
        jobSeekerMyInfoObj.CurrentStatus = jsonObject.currentStatusId.toString();
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    else {
        jobSeekerMyInfoObj.CurrentStatus = jsonObject.currentStatusId.toString();
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    if (jsonObject.overviewId) {
        var apiUrlAccountStatus = GetWebAPIURL() + 'api/Overview/' + jsonObject.overviewId;

        //To update Overview table
        $.ajax({
            url: apiUrlAccountStatus,
            type: "PUT",
            data: dataObjMyInfo,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableAccountStatus(false);
                viewModel.btnAccountStatus("Edit");
                viewModel.accountStatusCheck('1');

                getCurrentStatusName(jobSeekerMyInfoObj.CurrentStatus);
            },
            error: function (xhr, error) {
                alert('Errhhhhhhhhor :' + error);
            }
        });

    }
    else {
        var apiUrlAboutMe = GetWebAPIURL() + 'api/Overview/';

        //To Isert details into overview table
        $.ajax({
            url: apiUrlAboutMe,
            type: "POST",
            data: dataObjMyInfo,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.overviewId(data);
                viewModel.isEditableAccountStatus(false);
                viewModel.btnAccountStatus("Edit");
                viewModel.overviewId(data);
                viewModel.accountStatusCheck('1');
                getCurrentStatusName(jobSeekerMyInfoObj.CurrentStatus);
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
    viewModel.errorCheckAccountStatus('0');
}
else {
    if (viewModel.currentStatusId() == "") {
        viewModel.errorCheckAccountStatus('1');
    }
    else { viewModel.errorCheckAccountStatus('0'); }

}
}
viewModel.cancelAccountStatus = function () {


    //viewModel.selectedIndexCurrentStatus(accountStatus);
    viewModel.isEditableAccountStatus(false);
    viewModel.btnAccountStatus("Edit");
    viewModel.errorCheckAccountStatus('0');
}

viewModel.whichTemplateToUseAccountStatus = function () {
    return viewModel.isEditableAccountStatus() ? "EditAccountStatus" : "ViewAccountStatus";
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});