$(document).ready(function () {
    initDemographic();
    
});


function getJobSeekerDemographic()
{
  
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

function getJobSeekerEthnicity() {
    var apiUrlEthnicityLookup = GetWebAPIURL() + '/api/Lookup/?name=Ethnicity';
    var dataObjEthnicity;

    //To get overview details
    $.ajax({
        url: apiUrlEthnicityLookup,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjEthnicity = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjEthnicity;

}
function initDemographic()
{
    
    viewModel.birthDate = ko.observable('');

    viewModel.additionalinfoid = ko.observable();
    viewModel.jobseekerId = ko.observable();
    viewModel.demographicCheck = ko.observable('0');
    viewModel.isEditableDemographic = ko.observable(false);
    viewModel.btnDemographic = ko.observable("Edit");

    viewModel.errorCheckEthnicity = ko.observable('0');
    viewModel.gender = ko.observable("male");
   
    viewModel.selectedIndexEthnicity = ko.observable(0);
    viewModel.dataEthnicity = ko.observable(createListEthnicity());

    var dataObjAdditionalInfo = getJobSeekerDemographic();

    var dataObjEthnicity = getJobSeekerEthnicity();

  
    if (dataObjAdditionalInfo) {
       
        viewModel.additionalinfoid(dataObjAdditionalInfo.Id);

        if (dataObjAdditionalInfo.BirthDate) {
           
            viewModel.birthDate(dataObjAdditionalInfo.BirthDate);           
            viewModel.gender(dataObjAdditionalInfo.Gender);
           
            if (dataObjAdditionalInfo.Ethinicity) {

                for (da in dataObjEthnicity) {
                    
                    if (dataObjAdditionalInfo.Ethinicity == dataObjEthnicity[da].Id) {
                        viewModel.selectedIndexEthnicity((parseInt(da) + 1));
                    }
                }
            }

            viewModel.demographicCheck('1');
        }
    }
   
    
    viewModel.ethnicity = ko.computed(function () {

        return viewModel.dataEthnicity()[viewModel.selectedIndexEthnicity()].label;

    }, viewModel);


}
var birthDay;
var jobseekerGender;
var jobseekerEthinicity;

function createListEthnicity() {
  
    var dataObjEthnicity = getJobSeekerEthnicity();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjEthnicity) {
        list.push({
            label: dataObjEthnicity[da].Name,
            value: dataObjEthnicity[da].Id
        });
    }
    return list;
}

viewModel.clickButtonDemographic = function () {
   
    birthDay = viewModel.birthDate();
    jobseekerGender = viewModel.gender();
    jobseekerEthinicity = viewModel.selectedIndexEthnicity();
    viewModel.btnDemographic("Submit");
    viewModel.isEditableDemographic(true);
}

viewModel.addADemographic = function () {
    viewModel.btnDemographic("Submit");
    viewModel.isEditableDemographic(true);
}

viewModel.saveDemographic = function () {
    if (viewModel.selectedIndexEthnicity() > 0) {
        var apiUrlAdditionalInfo = GetWebAPIURL() + 'api/AdditionalInformation/'; // + userId;
        var dataObjAdditionalInfo;
        //To get overview details
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
                alert('Eroooror :' + status);
            }
        });
        var dataAdditionalInfoObject;
        var jobSeekerAdditionalInfoEditObj = {}
        var jsonObject = ko.toJS(viewModel);

        if (dataObjAdditionalInfo) {
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
            if (dataObjAdditionalInfo.Notification)
                jobSeekerAdditionalInfoEditObj.Notification = dataObjAdditionalInfo.Notification.toString();


            jobSeekerAdditionalInfoEditObj.BirthDate = convert(viewModel.birthDate());
            viewModel.birthDate(convert(viewModel.birthDate()));

            jobSeekerAdditionalInfoEditObj.Ethinicity = viewModel.dataEthnicity()[viewModel.selectedIndexEthnicity()].value;
            jobSeekerAdditionalInfoEditObj.Gender = jsonObject.gender;
            dataAdditionalInfoObject = JSON.stringify(jobSeekerAdditionalInfoEditObj);
        }
        else {
            jobSeekerAdditionalInfoEditObj.BirthDate = convert(viewModel.birthDate());
            viewModel.birthDate(convert(viewModel.birthDate()));

            jobSeekerAdditionalInfoEditObj.Ethinicity = viewModel.dataEthnicity()[viewModel.selectedIndexEthnicity()].value;
            jobSeekerAdditionalInfoEditObj.Gender = jsonObject.gender;
            dataAdditionalInfoObject = JSON.stringify(jobSeekerAdditionalInfoEditObj);
        }

        if (jsonObject.additionalinfoid) {
            var apiUrlAdditionalInfo = GetWebAPIURL() + 'api/AdditionalInformation/' + jsonObject.additionalinfoid;
            //To update Overview table
            $.ajax({
                url: apiUrlAdditionalInfo,
                type: "PUT",
                data: dataAdditionalInfoObject,
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.isEditableDemographic(false);
                    viewModel.btnDemographic("Edit");
                    viewModel.demographicCheck('1');

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
        else {
            var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/';
            //To Isert details into overview table
            $.ajax({
                url: apiUrlAdditionalInfo,
                type: "POST",
                data: dataAdditionalInfoObject,
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.additionalinfoid(data);
                    viewModel.isEditableDemographic(false);
                    viewModel.btnDemographic("Edit");
                    viewModel.demographicCheck('1');
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            /* if (notification[0] == "false" && notification[1] == "false" && notification[2] == "false") {
                 viewModel.notificationCheck('0');
             }*/

        }
        viewModel.errorCheckEthnicity('0');
    }
    else {
        if (viewModel.selectedIndexEthnicity() <= 0) {
            viewModel.errorCheckEthnicity('1');
        }
        else {
            viewModel.errorCheckEthnicity('0');
        }

    }
}

viewModel.cancelDemographic = function ()
{
    
    viewModel.btnDemographic("Edit");
    viewModel.isEditableDemographic(false);
    viewModel.errorCheckEthnicity('0');

    viewModel.birthDate(birthDay);
    viewModel.gender(jobseekerGender);
    viewModel.selectedIndexEthnicity(jobseekerEthinicity);
}
viewModel.whichTemplateToUseDemographic = function () {
    return viewModel.isEditableDemographic() ? "EditDemographic" : "ViewDemographic";
}

function convert(str) {
    
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");
   
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});