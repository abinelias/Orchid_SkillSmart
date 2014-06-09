$(document).ready(function () {

    initNotification();
});


function getAdditionalInformation() {

  var apiUrlAdditionalInfo = GetWebAPIURL() + 'api/AdditionalInformation/'; // + userId;
    var dataObjAdditionalInfo;

    //TO get Jobseeker addtional information
    $.ajax({
        url: apiUrlAdditionalInfo,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjAdditionalInfo = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjAdditionalInfo;
}

function initNotification() {
    viewModel.additionalinfoid = ko.observable();

    viewModel.btnNotification = ko.observable("Edit");
    viewModel.notificationCheck = ko.observable('0');
    viewModel.isEditableNotification = ko.observable(false);
    viewModel.preference = ko.observableArray();
    viewModel.jobs = ko.observable(false);
    viewModel.course = ko.observable(false);
    viewModel.message = ko.observable(false);


    var dataObjAdditionalInfo = getAdditionalInformation();

    if (dataObjAdditionalInfo) {
        viewModel.additionalinfoid(dataObjAdditionalInfo.Id);
        if (dataObjAdditionalInfo.Notification) {
            viewModel.notificationCheck('1');
            var getNotification = dataObjAdditionalInfo.Notification;
            var notification = getNotification.split(',');


            if (notification[0] == "true") {
                viewModel.jobs(true);
            }
            if (notification[1] == "true") {
                viewModel.course(true);
            }
            if (notification[2] == "true") {
                viewModel.message(true);
            }
            if (notification[0] == "false" && notification[1] == "false" && notification[2] == "false") {
                viewModel.notificationCheck('0');
            }

        }
    }
}

viewModel.setPreferences = function () {
    viewModel.btnNotification("Submit");
    viewModel.isEditableNotification(true);

}
viewModel.saveNotification = function ()
{
    var notificationPreference = viewModel.jobs() + "," + viewModel.course() + "," + viewModel.message();


    var dataObjAdditionalInfo = getAdditionalInformation();
    var jsonObject = ko.toJS(viewModel);

    if (dataObjAdditionalInfo) {

        var jobSeekerAdditionalInfoEditObj = {}
        jobSeekerAdditionalInfoEditObj.Title = dataObjAdditionalInfo.Title;
        jobSeekerAdditionalInfoEditObj.Suffix = dataObjAdditionalInfo.Suffix;
        jobSeekerAdditionalInfoEditObj.MiddleName = dataObjAdditionalInfo.MiddleName;
        jobSeekerAdditionalInfoEditObj.PreferedName = dataObjAdditionalInfo.PreferedName;
        jobSeekerAdditionalInfoEditObj.AddressLine1 = dataObjAdditionalInfo.AddressLine1;
        jobSeekerAdditionalInfoEditObj.AddressLine2 = dataObjAdditionalInfo.AddressLine2;
        jobSeekerAdditionalInfoEditObj.City = dataObjAdditionalInfo.City;
        jobSeekerAdditionalInfoEditObj.StateId = dataObjAdditionalInfo.StateId;
        jobSeekerAdditionalInfoEditObj.CountryId = dataObjAdditionalInfo.CountryId;
        jobSeekerAdditionalInfoEditObj.ZipCode = dataObjAdditionalInfo.ZipCode;
        jobSeekerAdditionalInfoEditObj.HomePhone = dataObjAdditionalInfo.HomePhone;
        jobSeekerAdditionalInfoEditObj.MethodOfContact = dataObjAdditionalInfo.MethodOfContact;
        jobSeekerAdditionalInfoEditObj.Citizenship = dataObjAdditionalInfo.Citizenship;
        jobSeekerAdditionalInfoEditObj.Experience = dataObjAdditionalInfo.Experience;

        jobSeekerAdditionalInfoEditObj.BirthDate = dataObjAdditionalInfo.BirthDate;
        
        jobSeekerAdditionalInfoEditObj.Ethinicity = dataObjAdditionalInfo.Ethinicity;
        jobSeekerAdditionalInfoEditObj.Gender = dataObjAdditionalInfo.Gender;

        jobSeekerAdditionalInfoEditObj.Notification = notificationPreference;


        var getNotification = jobSeekerAdditionalInfoEditObj.Notification;
        var notification = getNotification.split(',');

        if (notification[0] == "true") {
            viewModel.jobs(true);
        }
        if (notification[1] == "true") {
            viewModel.course(true);
        }
        if (notification[2] == "true") {
            viewModel.message(true);
        }
 
        var apiUrlAdditionalInfoEdit = GetWebAPIURL() + 'api/AdditionalInformation/' + dataObjAdditionalInfo.Id;
        var dataObjAdditionalInfoEdit = JSON.stringify(jobSeekerAdditionalInfoEditObj);

        $.ajax({
            url: apiUrlAdditionalInfoEdit,
            type: "PUT",
            data: dataObjAdditionalInfoEdit,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.isEditableNotification(false);
                viewModel.notificationCheck('1');
                viewModel.btnNotification("Edit");
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

        if (notification[0] == "false" && notification[1] == "false" && notification[2] == "false") {
            viewModel.notificationCheck('0');
        }
    }
    else {
        var jobSeekerAdditionalInfoEditObj = {}
        jobSeekerAdditionalInfoEditObj.Notification = notificationPreference;

        var getNotification = jobSeekerAdditionalInfoEditObj.Notification;
        var notification = getNotification.split(',');
        if (notification[0] == "true") {
            viewModel.jobs(true);
        }
        if (notification[1] == "true") {
            viewModel.course(true);
        }
        if (notification[2] == "true") {
            viewModel.message(true);
        }

        var dataObjAdditionalInfoEdit = JSON.stringify(jobSeekerAdditionalInfoEditObj);
        var apiUrlAdditionalInfo = GetWebAPIURL() + 'api/AdditionalInformation/';
        $.ajax({
            url: apiUrlAdditionalInfo,
            type: "POST",
            data: dataObjAdditionalInfoEdit,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.additionalinfoid(data);
                viewModel.isEditableNotification(false);
                viewModel.notificationCheck('1');
                viewModel.btnNotification("Edit");
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        if (notification[0] == "false" && notification[1] == "false" && notification[2] == "false") {
            viewModel.notificationCheck('0');
        }
    }
}


viewModel.cancelNotification = function () {
    viewModel.isEditableNotification(false);
    viewModel.btnNotification("Edit");
    //viewModel.notificationCheck('1');
}

viewModel.clickButtonNotification = function () {
    viewModel.btnNotification("Submit");
    //viewModel.notificationCheck('0');
    viewModel.isEditableNotification(true);
}
viewModel.whichTemplateToUseNotification = function () {
    return viewModel.isEditableNotification() ? "EditNotificationPreferences" : "ViewNotificationPreferences";
}