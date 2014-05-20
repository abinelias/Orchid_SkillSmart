$(document).ready(function () {

    initAcountStatus();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);

function getJobSeekerCurrentStatus()
{
    var apiUrlCurrentStatusLookup = GetWebAPIURL() + '/api/Lookup/?name=CurrentStatus';
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
            alert('Eroror :' + status);
        }
    });
    return dataObjOverview;
}

function initAcountStatus()
{
    viewModel.overviewId= ko.observable();
    viewModel.accountStatusCheck= ko.observable('0');
    viewModel.jobseekerId= ko.observable();
    viewModel.isEditableAccountStatus= ko.observable(false);
    viewModel.btnAccountStatus= ko.observable("Edit");
   
    viewModel.textCurrentStatus = ko.observable("");
    viewModel.selectedIndexCurrentStatus = ko.observable(0);
    viewModel.dataCurrentStatus = ko.observable(createListAccountStatus());

    var dataObjOverview = getJobseekerAccountStatusOverView();
    var dataObjCurrentStatus = getJobSeekerCurrentStatus();
    
    if (dataObjOverview) {
        viewModel.overviewId(dataObjOverview.Id);
        viewModel.jobseekerId(dataObjOverview.JobSeekerId);
        if (dataObjOverview.CurrentStatus) {
            for (da in dataObjCurrentStatus) {
                if (dataObjOverview.CurrentStatus == dataObjCurrentStatus[da].Id) {
                    viewModel.selectedIndexCurrentStatus(da);
                }

            }
            viewModel.accountStatusCheck('1');
        }
       

    }
    viewModel.accountStatus = ko.computed(function () {
        
        return viewModel.dataCurrentStatus()[viewModel.selectedIndexCurrentStatus()].label;

    }, viewModel);
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

var accountStatus;
viewModel.clickButtonAccountStatus = function () {
    accountStatus = viewModel.selectedIndexCurrentStatus();
    viewModel.btnAccountStatus("Submit");
    viewModel.isEditableAccountStatus(true);
}

viewModel.addAccountStatus = function () {
    viewModel.btnAccountStatus("Submit");
    viewModel.isEditableAccountStatus(true);
   // viewModel.accountStatusCheck('1');
    this.jobseekerId(userId);
}
viewModel.saveAccountStatus = function () {
   
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

    var dataObjMyInfo;
    var jobSeekerMyInfoObj = {}
    var jsonObject = ko.toJS(viewModel);

    if (dataObjOverview) {
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.Summary = dataObjOverview.Summary;
        jobSeekerMyInfoObj.Industry = dataObjOverview.Industry;
        jobSeekerMyInfoObj.Speciality = dataObjOverview.Speciality;
        jobSeekerMyInfoObj.SecurityClearanceId = dataObjOverview.SecurityClearanceId;
        jobSeekerMyInfoObj.WillingToRelocateId = dataObjOverview.WillingToRelocateId;
        jobSeekerMyInfoObj.CurrentStatus = viewModel.dataCurrentStatus()[viewModel.selectedIndexCurrentStatus()].value;
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    else {
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.CurrentStatus = viewModel.dataCurrentStatus()[viewModel.selectedIndexCurrentStatus()].value;
        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
    }
    if (jsonObject.overviewId) {
        var apiUrlAccountStatus = GetWebAPIURL() + '/api/Overview/' + jsonObject.overviewId;
        //To update Overview table
        $.ajax({
            url: apiUrlAccountStatus,
            type: "PUT",
            data: dataObjMyInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableAccountStatus(false);
                viewModel.btnAccountStatus("Edit");
                viewModel.accountStatusCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
        var apiUrlAboutMe = GetWebAPIURL() + '/api/Overview/';
        //To Isert details into overview table
        $.ajax({
            url: apiUrlAboutMe,
            type: "POST",
            data: dataObjMyInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableAccountStatus(false);
                viewModel.btnAccountStatus("Edit");
                viewModel.overviewId(data);
                viewModel.accountStatusCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
}
viewModel.cancelAccountStatus = function () {
    viewModel.selectedIndexCurrentStatus(accountStatus);
    viewModel.isEditableAccountStatus(false);
    viewModel.btnAccountStatus("Edit");
}

viewModel.whichTemplateToUseAccountStatus = function () {
    return viewModel.isEditableAccountStatus() ? "EditAccountStatus" : "ViewAccountStatus";
}