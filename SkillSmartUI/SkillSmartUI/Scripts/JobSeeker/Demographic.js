$(document).ready(function () {
    initDemographic();
    
});
var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);


function getJobSeekerDemographic()
{
  
    var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/' + userId;
    var dataObjAdditionalInfo;

    //TO get Jobseeker addtional information
    $.ajax({
        url: apiUrlAdditionalInfo,
        type: 'GET',
        async: false,
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
function initDemographic()
{
    viewModel.birthDate = ko.observable('');

    viewModel.accountInfoId = ko.observable();
    viewModel.jobseekerId = ko.observable();
    viewModel.demographicCheck = ko.observable('0');
    viewModel.isEditableDemographic = ko.observable(false);
    viewModel.btnDemographic = ko.observable("Edit");

    /*viewModel.birthDate = ko.observable();
    viewModel.birthDateList = ko.observableArray();
    viewModel.birthMonth = ko.observable();
    viewModel.birthMonthList = ko.observableArray();
    viewModel.birthYear = ko.observable();
    viewModel.birthYearList = ko.observableArray();*/
    viewModel.gender = ko.observable();
    viewModel.ethnicity = ko.observable();

   

   

    var dataObjAdditionalInfo = getJobSeekerDemographic();

   /* viewModel.birthDateList.push({ name: "Date", id: "" });
    for (var i = 1; i < 31; i++) {
        viewModel.birthDateList.push({ name: i, id: i });
    }

    var monthtext = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    viewModel.birthMonthList.push({ name: "Month", id: "" });
    for (var m = 0; m < 12; m++) {
        viewModel.birthMonthList.push({ name: monthtext[m], id: monthtext[m] });
    }

    var today = new Date();
    viewModel.birthYearList.push({ name: "Year", id: "" });
    for (var y = (today.getFullYear() - 60) ; y <= today.getFullYear() ; y++) {
        viewModel.birthYearList.push({ name: y, id: y });
    }*/

    if (dataObjAdditionalInfo) {
       
        viewModel.accountInfoId(dataObjAdditionalInfo.Id);
        viewModel.jobseekerId(dataObjAdditionalInfo.JobSeekerId);

        if (dataObjAdditionalInfo.BirthDate) {
           
            viewModel.birthDate(dataObjAdditionalInfo.BirthDate);
           // viewModel.selectedIndexDate(dataObjAdditionalInfo.BirthDate);
            /*viewModel.birthMonth(dataObjAdditionalInfo.BirthMonth);
            viewModel.birthYear(dataObjAdditionalInfo.BirthYear);*/
            viewModel.gender(dataObjAdditionalInfo.Gender);
            viewModel.ethnicity(dataObjAdditionalInfo.Ethinicity);
            viewModel.demographicCheck('1');
        }
    }
   /* viewModel.birthday = ko.computed(function () {
        return viewModel.birthMonth() + " " + viewModel.birthDate() + ", " + viewModel.birthYear();
    }, viewModel);*/
}
var birthDay;
var jobseekerGender;
var jobseekerEthinicity;
viewModel.clickButtonDemographic = function () {
   
    birthDay = viewModel.birthDate();
     jobseekerGender = viewModel.gender();
     jobseekerEthinicity = viewModel.ethnicity();
    viewModel.btnDemographic("Submit");
    viewModel.isEditableDemographic(true);
}

viewModel.addADemographic = function () {
    viewModel.btnDemographic("Submit");
    viewModel.isEditableDemographic(true);
    // viewModel.demographicCheck('1');
    this.jobseekerId(userId);
}
viewModel.saveDemographic = function () {
    
    var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/' + userId;
    var dataObjAdditionalInfo;
    //To get overview details
    $.ajax({
        url: apiUrlAdditionalInfo,
        type: 'GET',
        async: false,
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
        jobSeekerAdditionalInfoEditObj.JobSeekerId = userId;
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
       /* jobSeekerAdditionalInfoEditObj.BirthMonth = jsonObject.birthMonth;
        jobSeekerAdditionalInfoEditObj.BirthYear = jsonObject.birthYear;*/
        jobSeekerAdditionalInfoEditObj.Ethinicity = jsonObject.ethnicity;
        jobSeekerAdditionalInfoEditObj.Gender = jsonObject.gender;
        dataAdditionalInfoObject = JSON.stringify(jobSeekerAdditionalInfoEditObj);
    }
    else {
        jobSeekerAdditionalInfoEditObj.JobSeekerId = userId;
        jobSeekerAdditionalInfoEditObj.BirthDate = convert(viewModel.birthDate());
        /*jobSeekerAdditionalInfoEditObj.BirthMonth = jsonObject.birthMonth;
        jobSeekerAdditionalInfoEditObj.BirthYear = jsonObject.birthYear;*/
        jobSeekerAdditionalInfoEditObj.Ethinicity = jsonObject.ethnicity;
        jobSeekerAdditionalInfoEditObj.Gender = jsonObject.gender;
        dataAdditionalInfoObject = JSON.stringify(jobSeekerAdditionalInfoEditObj);
    }

    if (jsonObject.accountInfoId) {
        var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/' + jsonObject.accountInfoId;
        //To update Overview table
        $.ajax({
            url: apiUrlAdditionalInfo,
            type: "PUT",
            data: dataAdditionalInfoObject,
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
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                viewModel.accountInfoId(data);
                viewModel.isEditableDemographic(false);
                viewModel.btnDemographic("Edit");
                //viewModel.overviewId(data);
                viewModel.demographicCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
}
viewModel.cancelDemographic = function ()
{
    viewModel.birthDate(birthDay);    
    viewModel.gender(jobseekerGender);
    viewModel.ethnicity(jobseekerEthinicity);
    viewModel.btnDemographic("Edit");
    viewModel.isEditableDemographic(false);
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