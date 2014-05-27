$(document).ready(function () {

    initpersonal();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);


function getSecurityClearanceLookup() {
    var apiUrlSecurityCleareance = GetWebAPIURL() + '/api/Lookup/?name=SecurityClearance';
    var dataSecurityCleareanceObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlSecurityCleareance,
        type: 'GET',
        async: false,
        success: function (data) {
            dataSecurityCleareanceObj = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataSecurityCleareanceObj;
}

function getWillingToRelocateLookup() {

    var apiUrlWillingToRelocate = GetWebAPIURL() + '/api/Lookup/?name=WillingToRelocate';
    var dataWillingToRelocate;

    //TO get details of willing to relocate lookup details
    $.ajax({
        url: apiUrlWillingToRelocate,
        type: 'GET',
        async: false,
        success: function (data) {
            dataWillingToRelocate = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataWillingToRelocate;
}

var selectedPersonalObj;
function getJobseekerPersonalInfo() {
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
    selectedPersonalObj = dataObjOverview;
    return dataObjOverview;
}

function initpersonal() {

    viewModel.errorCheckSecurity = ko.observable('0');
    viewModel.errorCheckRelocate = ko.observable('0');

    viewModel.myinfoid = ko.observable();
    viewModel.personalCheck = ko.observable('0');
    viewModel.jobseekerId = ko.observable();
    viewModel.isEditablePersonal = ko.observable(false);
    viewModel.btnPersonal = ko.observable("Edit");


    viewModel.industriesTextbox = ko.observable().extend({ required: { message: "Enter Industry" } });
    viewModel.specialityTextbox = ko.observable().extend({ required: { message: "Enter Speciality" } });


    viewModel.selectedIndexSecurity = ko.observable(-1);
    viewModel.dataSecurity = ko.observable(createListSecurity());

    viewModel.selectedIndexRelocate = ko.observable(-1).extend({ required: { message: "Select Willing to relocate" } });
    viewModel.dataRelocate = ko.observable(createListRelocate());

    var dataSecurityCleareanceObj = getSecurityClearanceLookup();


    var dataWillingToRelocate = getWillingToRelocateLookup();


    var dataObjOverview = getJobseekerPersonalInfo();
    if (dataObjOverview) {
        viewModel.myinfoid(dataObjOverview.Id);
        viewModel.jobseekerId(dataObjOverview.JobSeekerId);
        if (dataObjOverview.Speciality) {
            viewModel.industriesTextbox(dataObjOverview.Industry);
            viewModel.specialityTextbox(dataObjOverview.Speciality);

            viewModel.personalCheck('1');
            if (dataObjOverview.SecurityClearanceId) {
                for (da in dataSecurityCleareanceObj) {

                    if (dataObjOverview.SecurityClearanceId == dataSecurityCleareanceObj[da].Id) {
                        viewModel.selectedIndexSecurity((parseInt(da) + 1));
                    }
                }
            }
            if (dataObjOverview.WillingToRelocateId) {
                for (da in dataWillingToRelocate) {

                    if (dataObjOverview.WillingToRelocateId == dataWillingToRelocate[da].Id) {
                        viewModel.selectedIndexRelocate((parseInt(da) + 1));
                    }
                }
            }
        }

    }

    viewModel.SecurityCleareanceLabel = ko.computed(function () {
        return viewModel.dataSecurity()[viewModel.selectedIndexSecurity()].label;

    }, this);

    viewModel.WillingToRelocateLabel = ko.computed(function () {
        return viewModel.dataRelocate()[viewModel.selectedIndexRelocate()].label;
    }, this);

    viewModel.displayErrorsPersonal = ko.observable(false);
    viewModel.errorPersonalInformation = ko.validation.group({ p1: viewModel.industriesTextbox, p2: viewModel.specialityTextbox });
   


}

function createListSecurity() {
    var dataSecurityCleareanceObj = getSecurityClearanceLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataSecurityCleareanceObj) {
        list.push({
            label: dataSecurityCleareanceObj[da].Name,
            value: dataSecurityCleareanceObj[da].Id
        });
    }
    return list;
}
function createListRelocate() {
    var dataWillingToRelocate = getWillingToRelocateLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataWillingToRelocate) {
        list.push({
            label: dataWillingToRelocate[da].Name,
            value: dataWillingToRelocate[da].Id
        });
    }
    return list;
}
viewModel.whichTemplateToUsePersonal = function () {
    return viewModel.isEditablePersonal() ? "EditPersonalInformation" : "ViewPersonalInformation";
}
viewModel.savePersonal = function () {


    if (viewModel.industriesTextbox.isValid() && viewModel.specialityTextbox.isValid() && viewModel.selectedIndexSecurity() > 0 && viewModel.selectedIndexRelocate() > 0) {


        var dataObjOverview = getJobseekerPersonalInfo();
        var dataObjMyInfo;
        var jobSeekerMyInfoObj = {}
        var jsonObject = ko.toJS(viewModel);


        if (dataObjOverview) {
            jobSeekerMyInfoObj.JobSeekerId = userId;
            jobSeekerMyInfoObj.Summary = dataObjOverview.Summary;
            jobSeekerMyInfoObj.CurrentStatus = dataObjOverview.CurrentStatus;

            jobSeekerMyInfoObj.Industry = jsonObject.industriesTextbox;
            jobSeekerMyInfoObj.Speciality = jsonObject.specialityTextbox;
            jobSeekerMyInfoObj.SecurityClearanceId = viewModel.dataSecurity()[viewModel.selectedIndexSecurity()].value;
            jobSeekerMyInfoObj.WillingToRelocateId = viewModel.dataRelocate()[viewModel.selectedIndexRelocate()].value;

            dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);
        }
        else {
            jobSeekerMyInfoObj.JobSeekerId = userId;
            jobSeekerMyInfoObj.Industry = jsonObject.industriesTextbox;
            jobSeekerMyInfoObj.Speciality = jsonObject.specialityTextbox;
            jobSeekerMyInfoObj.SecurityClearanceId = viewModel.dataSecurity()[viewModel.selectedIndexSecurity()].value;
            jobSeekerMyInfoObj.WillingToRelocateId = viewModel.dataRelocate()[viewModel.selectedIndexRelocate()].value;

            dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);

        }

        if (jsonObject.myinfoid) {

            var apiUrlMyInfoUpdate = GetWebAPIURL() + '/api/Overview/' + jsonObject.myinfoid;
            //To update overview table
            $.ajax({
                url: apiUrlMyInfoUpdate,
                type: "PUT",
                data: dataObjMyInfo,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    viewModel.btnPersonal("Edit");
                    viewModel.isEditablePersonal(false);
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {

            var apiUrlMyInfoUpdate = GetWebAPIURL() + '/api/Overview/';
            //To insert details into Overview table

            $.ajax({
                url: apiUrlMyInfoUpdate,
                type: "POST",
                data: dataObjMyInfo,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    location.reload();
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        viewModel.errorCheckSecurity('0');
        viewModel.errorCheckRelocate('0');
    }
    else {

        viewModel.errorPersonalInformation.showAllMessages();
        viewModel.displayErrorsPersonal(true);
        if (viewModel.selectedIndexRelocate() <= 0) {
            viewModel.errorCheckRelocate('1');
        }
        else { viewModel.errorCheckRelocate('0'); }

        if (viewModel.selectedIndexSecurity() <= 0) {
            viewModel.errorCheckSecurity('1');
        }
        else { viewModel.errorCheckSecurity('0'); }
    }


}

viewModel.cancelPersonal = function () {
    personalObj = ko.toJS(viewModel);

    if (personalObj.myinfoid) {
        viewModel.industriesTextbox(selectedPersonalObj.Industry);
        viewModel.specialityTextbox(selectedPersonalObj.Speciality);
        viewModel.selectedIndexSecurity(selectedSecurity);
        viewModel.selectedIndexRelocate(selectedRelocate);

        viewModel.isEditablePersonal(false);
        viewModel.btnPersonal("Edit");
    }
    viewModel.errorCheckSecurity('0');
    viewModel.errorCheckRelocate('0');
}
var selectedSecurity;
var selectedRelocate;
viewModel.clickButtonPersonal = function () {
    selectedSecurity = viewModel.selectedIndexSecurity();
    selectedRelocate = viewModel.selectedIndexRelocate();
    viewModel.btnPersonal("Submit");
    viewModel.isEditablePersonal(true);
}
viewModel.addFirstPersonalInformation = function () {
    viewModel.btnPersonal("Submit");
    viewModel.isEditablePersonal(true);
    viewModel.personalCheck('1');
    this.jobseekerId(userId);
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});