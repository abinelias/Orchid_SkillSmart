$(document).ready(function () {

    initActivity();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getJobseekerExtraCurricularActivity() {
    var apiUrlExtraCurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity/';
    var dataObjActivities;

    //To get Activities from ExtraCurricularActivities table
    $.ajax({
        url: apiUrlExtraCurricularActivity,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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
    viewModel.addMoreActivityCheck = ko.observable('1');


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
    self.JobSeekerId = ko.observable();
    self.Id = ko.observable('');
    self.isEdit = ko.observable('0');
    self.Activity = ko.observable('').extend({ required: { message: "Activity  required" } });
    self.StartDate = ko.observable('').extend({ required: { message: "StartDate  required" } });
    self.EndDate = ko.observable('').extend({ required: { message: "EndDate  required" } });
    self.current = ko.observable(false);
    self.deleteCheck = ko.observable('1');

    self.btnActivitySkill = ko.observable('+');
    self.errorActivity = ko.validation.group({ p1: self.Activity, p2: self.StartDate, p3: self.EndDate });

    if (da) {
        self.Id(da.Id);
        self.isEdit('0');
        self.Activity(da.Activity);
        self.StartDate(da.StartDate);
        self.EndDate(da.EndDate);

        if (da.EndDate == 'present') {

            self.current(true);
        }
    }
    self.current.subscribe(function (newValue) {
        if (self.current() == true) {
            $("#activity_EndDate").hide();

        }
    });
}
var selectedActivity = [];
viewModel.editActivityDetails = function (activityObj) {
    var selectedActivityObj = ko.toJS(activityObj);
    selectedActivity.push(selectedActivityObj);
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
    if (activityObj.Activity.isValid() && activityObj.StartDate.isValid() ) {
        viewModel.addMoreActivityCheck('1');

        if (viewModel.activityCheck() == 1) {
            //document.getElementById("addMoreActivity").disabled = false;
        }
        var jsonObjectActivity = ko.toJS(activityObj);
        //alert(convert(jsonObjectActivity.StartDate));
        if (jsonObjectActivity.Id) {
            var dataObjActivity;
            var jobSeekerActivityObj = {}
            jobSeekerActivityObj.Activity = jsonObjectActivity.Activity;
            jobSeekerActivityObj.StartDate = convert(jsonObjectActivity.StartDate);

            if (jsonObjectActivity.current) {

                jobSeekerActivityObj.EndDate = "present";
                activityObj.EndDate = "present";

            }
            else {
                jobSeekerActivityObj.EndDate = convert(jsonObjectActivity.EndDate);
            }
            

            dataObjActivity = JSON.stringify(jobSeekerActivityObj);

        var apiUrlActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity?Id=' + jsonObjectActivity.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlActivity,
            type: "PUT",
            data: dataObjActivity,
            headers: app.securityHeaders(),
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
            jobSeekerActivityObj.Activity = jsonObjectActivity.Activity;
            jobSeekerActivityObj.StartDate = jsonObjectActivity.StartDate;

            if (jsonObjectActivity.current) {

                jobSeekerActivityObj.EndDate = "present";
                activityObj.EndDate = "present";

            }
            else {
                jobSeekerActivityObj.EndDate = convert(jsonObjectActivity.EndDate);
            }

            dataObjActivity = JSON.stringify(jobSeekerActivityObj);
        var apiUrlActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlActivity,
            type: "Post",
            data: dataObjActivity,
            headers: app.securityHeaders(),
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
    else {
        activityObj.errorActivity.showAllMessages();
    }
}
viewModel.cancelActivities = function (activityObj) {
    if (viewModel.activityCheck() == 1) {
        // document.getElementById("addMoreActivity").disabled = false;
    }
    var jsonObjectActivity = ko.toJS(activityObj);
    if (jsonObjectActivity.Id) {
        activityObj.isEdit('0');

    }
    else {
        viewModel.activitiesArray.remove(activityObj);
    }

    if (viewModel.activitiesArray().length == 0) {
        viewModel.activityCheck('0');
        viewModel.isEditableActivity(false);
    }

    viewModel.addMoreActivityCheck('1');

    for (var i = 0; i < selectedActivity.length; i++) {
        if (selectedActivity[i].Id == activityObj.Id()) {
            activityObj.Activity(selectedActivity[i].Activity);
            activityObj.StartDate(selectedActivity[i].StartDate);
            activityObj.EndDate(selectedActivity[i].EndDate);
        }

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
                headers: app.securityHeaders(),
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

    if (viewModel.btnActivity() == "Add More") {

        var activity = new createActivity();
        activity.isEdit('1');
        activity.deleteCheck('0');
        viewModel.activitiesArray.splice(0, 0, activity);

        viewModel.addMoreActivityCheck('0');
    }

    else {
        viewModel.addMoreActivityCheck('1');

        viewModel.btnActivity("Add More");
        viewModel.isEditableActivity(true);
        // document.getElementById("addMoreActivity").disabled = false;
    }

}

viewModel.doneEditingActivities = function () {
    viewModel.btnActivity("Edit");
    viewModel.isEditableActivity(false);


    for (var i = 0; i < viewModel.activitiesArray().length; i++) {
        if (viewModel.activitiesArray()[i].Id() == "") {
            viewModel.activitiesArray.remove(viewModel.activitiesArray()[i]);
        }
        viewModel.activitiesArray()[i].isEdit('0');
    }
}

viewModel.whichTemplateToUseActivity = function () {
    return viewModel.isEditableActivity() ? "EditActivities" : "ViewActivities";
}

viewModel.expandActivitySkill = function (activityObj) {
    if (activityObj.btnActivitySkill() == '+') {
        activityObj.btnActivitySkill('-');
    }
    else {
        activityObj.btnActivitySkill('+');
    }
}

function AddActivitySkills(Id, acquiredId) {
    // alert(JOBSEEKERID);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&acquiredId=" + acquiredId + "&workHistoryId" + Id);
    $('#ManageHoldingsDiv').dialog(
        {
            open: function () {
                $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").css("background-color", "#C4E1F1");
            },
            width: 750,
            minWidth: 700,
            minHeight: 380,
            modal: true,
            hideTitleBar: false,
            resizable: true,
            title: "Add Skill",
            closeOnEscape: true,
            close: function (event, ui) { $(this).dialog('destroy'); },
            buttons: {
                'Close': function () {
                    window.location.reload();
                    $(this).dialog('destroy');
                }
            }
        });

    $("#ManageHoldingsFrame").show();
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});
