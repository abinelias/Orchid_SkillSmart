﻿var viewModel = {}
$(document).ready(function () {

    viewModel.btnCoverValue = ko.observable('0');
    viewModel.editorMode = ko.observable('wysiwyg');
    viewModel.showPathSelector = ko.observable(true);
    viewModel.mode = ko.observable('ribbon');
    viewModel.showFooter = ko.observable(true);
    viewModel.text = ko.observable("text");
    viewModel.coverLetter = ko.observable('');
   

    $(function () {
        ensureTemplates(["ViewJob", "EditFormAccountDetails", "CoverLetter"]);
    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/JobSeeker/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {

                    ko.applyBindings(viewModel);
                }
            });
        });
    }
    initAcountDetails();
});

var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
var jobId = hashes[1].substring(6);


function getTitleLookup() {
    var apiUrlTitle = GetWebAPIURL() + '/api/Lookup/?name=Title';
    var dataTitleObj;
    //To get title for lookup
    $.ajax({
        url: apiUrlTitle,
        type: 'GET',
        async: false,
        success: function (data) {
            dataTitleObj = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataTitleObj
}
function getSuffixLookup() {
    var apiUrlSuffix = GetWebAPIURL() + '/api/Lookup/?name=Suffix';
    var dataObjSuffix;
    //To get Suffix for lookup
    $.ajax({
        url: apiUrlSuffix,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjSuffix = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjSuffix;
}
function getCitizenlookup() {
    //TO get citizenship for lookup
    var apiUrlCitizenship = GetWebAPIURL() + '/api/Lookup/?name=Citizenship';
    var dataObjCitizenship;

    $.ajax({
        url: apiUrlCitizenship,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjCitizenship = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjCitizenship;
}
function getCountryLookup() {
    //To get Country for lookup
    var apiUrlCountry = GetWebAPIURL() + '/api/Lookup/?name=Country';
    var dataObjCountry;

    $.ajax({
        url: apiUrlCountry,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjCountry = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjCountry;
}
function getStateLookUp() {
    var dataStateObj;
    var dataObjAdditionalInfo = getJobseekerAdditionalInformation();
    if (dataObjAdditionalInfo) {
        var dataObjAdditionalInfo = getJobseekerAdditionalInformation();
        var stateId = dataObjAdditionalInfo.CountryId;
        var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + stateId;
        var dataStateObj;

        //To get State for lookup
        $.ajax({
            url: apiUrlState,
            type: 'GET',
            async: false,
            success: function (data) {
                dataStateObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
        return dataStateObj;
    }
    return dataStateObj;
}


function getJobseekerInformation() {
    //To get User details
  var apiUrlJobSeeker = GetWebAPIURL() + '/api/JobSeeker/'; // + userId;
    var dataObjJobSeeker;

    $.ajax({
        url: apiUrlJobSeeker,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobSeeker = data;
        },
        error: function (xhr, status, error) {
            alert('Erroraaa :' + status);
        }
    });
    return dataObjJobSeeker;
}

function getJobseekerAdditionalInformation() {

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
            alert('Errorddd :' + status);
        }
    });
    return dataObjAdditionalInfo;
}

function getAppliedJobsList() {
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList/'+jobId;

    //To get Job list 
    $.ajax({
        url: apiUrlJobList,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjJobList = data;

        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjJobList;
}

function initAcountDetails() {
    var dataObjJobSeeker = getHeaderDetails();
    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName);
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName);

    viewModel.yrExperience = ko.observable();
    var dataObjAdditionalInfo = getJobseekerAdditionalInformation();

    var dataObjJobSeeker = getJobseekerInformation();

    var dataObjCitizenship = getCitizenlookup();
    var dataObjCountry = getCountryLookup();
    var dataTitleObj = getTitleLookup();
    var dataObjSuffix = getSuffixLookup();
    var dataObjState;
    viewModel.textTitle = ko.observable("");
    viewModel.selectedIndexTitle = ko.observable(0);
    viewModel.dataTitle = ko.observable(createListTitle());


    viewModel.selectedIndexSuffix = ko.observable(0);
    viewModel.dataSuffix = ko.observable(createListSuffix());

    viewModel.selectedIndexCitizenship = ko.observable(0);
    viewModel.dataCitizenship = ko.observable(createListCitizenship());

    viewModel.selectedIndexCountry = ko.observable(0);
    viewModel.dataCountry = ko.observable(createListCountry());

    viewModel.selectedIndexState = ko.observable(0);
    viewModel.dataState = ko.observable();

    /*viewModel.selectedIndexExperience = ko.observable(0);
    viewModel.dataExperience = ko.observable(createListExperience());*/

    viewModel.additionalinfoid = ko.observable(),
     viewModel.iseditableLoginCredential = ko.observable(false);
    viewModel.editAccountCheck = ko.observable('0');

    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName).extend({ required: { message: "FirstName required" } });
    viewModel.middlename = ko.observable("");
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName).extend({ required: { message: "LastName required" } });
    viewModel.preferredname = ko.observable("");
    viewModel.username = ko.observable('').extend({ required: { message: "Username required" } });


    viewModel.addressline1 = ko.observable("").extend({ required: { message: "Address required" } });
    viewModel.addressline2 = ko.observable("").extend({ required: { message: "Address required" } });
    viewModel.city = ko.observable("").extend({ required: { message: "City required" } });
    viewModel.zip = ko.observable("").extend({ required: { message: "Zip is required" }, pattern: { message: "Zip can only be number", params: '^([0-9]*)$' } });
    viewModel.phonehome = ko.observable("").extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } });
    viewModel.email = ko.observable(dataObjJobSeeker.Email).extend({ required: { message: "Email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } });
    viewModel.citizenship = ko.observable("").extend({ required: { message: "citizenship required" } });

    viewModel.contact = ko.observable("email");

    viewModel.password = ko.observable(dataObjJobSeeker.Password).extend({ required: { message: "Password required" } });

    viewModel.experience = ko.observable();
    viewModel.experienceList = ko.observableArray();

    viewModel.accountDetailsCheck = ko.observable('0');
    viewModel.isEditableAccountDetails = ko.observable(false);
    viewModel.btnAccountDetails = ko.observable("Edit");

    viewModel.errorCheckCitizenship = ko.observable('0');
    viewModel.errorCheckCountry = ko.observable('0');

    viewModel.experienceList.push({ name: "Select", id: "" });
    for (var i = 0; i < 100; i++) {
        viewModel.experienceList.push({ name: i, id: i });
    }

    viewModel.selectedIndexCountry.subscribe(function (newValue) {


        var countryId = viewModel.dataCountry()[viewModel.selectedIndexCountry()].value;
        if (countryId != "") {

            var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + countryId;
            //var dataStateObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlState,
                type: 'GET',
                async: false,
                headers: app.securityHeaders(),
                success: function (data) {

                    viewModel.dataState(createListState(data));
                    dataObjState = data;
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });


    if (dataObjAdditionalInfo) {

        if (dataObjAdditionalInfo.AddressLine1) {
            viewModel.firstname(dataObjJobSeeker.FirstName);
            viewModel.middlename(dataObjAdditionalInfo.MiddleName);
            viewModel.lastname(dataObjJobSeeker.LastName);
            viewModel.preferredname(dataObjAdditionalInfo.PreferedName);
            viewModel.additionalinfoid(dataObjAdditionalInfo.Id);
            viewModel.password(dataObjJobSeeker.Password);
            viewModel.username(dataObjJobSeeker.UserName);
            viewModel.addressline1(dataObjAdditionalInfo.AddressLine1);
            viewModel.addressline2(dataObjAdditionalInfo.AddressLine2);
            viewModel.city(dataObjAdditionalInfo.City);
            viewModel.zip(JSON.stringify(dataObjAdditionalInfo.ZipCode));
            viewModel.phonehome(dataObjAdditionalInfo.HomePhone);
            viewModel.email(dataObjJobSeeker.Email);
            viewModel.contact(dataObjAdditionalInfo.MethodOfContact);
            viewModel.yrExperience(dataObjAdditionalInfo.Experience);

            // viewModel.selectedIndexExperience(dataObjAdditionalInfo.Experience);
            viewModel.accountDetailsCheck('1');

            if (dataObjAdditionalInfo.Citizenship) {
                for (da in dataObjCitizenship) {
                    if (dataObjAdditionalInfo.Citizenship == dataObjCitizenship[da].Id) {
                        viewModel.selectedIndexCitizenship((parseInt(da) + 1));
                    }
                }
            }
            if (dataObjAdditionalInfo.Title) {
                for (da in dataTitleObj) {
                    if (dataObjAdditionalInfo.Title == dataTitleObj[da].Id) {
                        viewModel.selectedIndexTitle((parseInt(da) + 1));
                    }
                }
            }
            if (dataObjAdditionalInfo.Suffix) {
                for (da in dataObjSuffix) {
                    if (dataObjAdditionalInfo.Suffix == dataObjSuffix[da].Id) {
                        viewModel.selectedIndexSuffix((parseInt(da) + 1));
                    }
                }
            }
            if (dataObjAdditionalInfo.CountryId) {
                for (da in dataObjCountry) {
                    if (dataObjAdditionalInfo.CountryId == dataObjCountry[da].Id) {
                        viewModel.selectedIndexCountry((parseInt(da) + 1));
                    }
                }
            }
            if (dataObjAdditionalInfo.StateId) {
                for (da in dataObjState) {
                    if (dataObjAdditionalInfo.StateId == dataObjState[da].Id) {
                        viewModel.selectedIndexState(da);
                    }
                }
            }
        }
    }

    viewModel.citizenshipLabel = ko.computed(function () {

        return viewModel.dataCitizenship()[viewModel.selectedIndexCitizenship()].label;

    }, viewModel);



    viewModel.countryName = ko.computed(function () {
        return viewModel.dataCountry()[viewModel.selectedIndexCountry()].label;
    }, viewModel);


    viewModel.errorAccountInformation = ko.validation.group({ p1: viewModel.firstname, p2: viewModel.lastname, p3: viewModel.addressline1, p4: viewModel.addressline2, p5: viewModel.city, p6: viewModel.zip, p7: viewModel.phonehome });

    var dataobjJobList = getAppliedJobsList();

    var dataObjCompanyDetails = getCompanyDetails(dataobjJobList.CompanyId);

    viewModel.jobPosition = dataobjJobList.JobPosition;
    viewModel.companyLocation = dataObjCompanyDetails.City;
    viewModel.employerName = dataObjCompanyDetails.CompanyName;

}

function createListTitle() {
    var dataTitleObj = getTitleLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataTitleObj) {
        list.push({
            label: dataTitleObj[da].Name,
            value: dataTitleObj[da].Id
        });
    }
    return list;
}

function createListSuffix() {
    var dataObjSuffix = getSuffixLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjSuffix) {
        list.push({
            label: dataObjSuffix[da].Name,
            value: dataObjSuffix[da].Id
        });
    }
    return list;
}

function createListCitizenship() {

    var dataObjCitizenship = getCitizenlookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjCitizenship) {
        list.push({
            label: dataObjCitizenship[da].Name,
            value: dataObjCitizenship[da].Id
        });
    }
    return list;
}

function createListCountry() {

    var dataObjCountry = getCountryLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjCountry) {
        list.push({
            label: dataObjCountry[da].Name,
            value: dataObjCountry[da].Id
        });
    }
    return list;
}

function createListState(data) {


    var list = [];
    for (da in data) {
        list.push({
            label: data[da].Name,
            value: data[da].Id
        });
    }
    return list;
}


viewModel.typeCoverLetter = function ()
{
    viewModel.btnCoverValue('1');

}

viewModel.submitApplication = function () {
    if (viewModel.firstname.isValid() && viewModel.lastname.isValid() && viewModel.addressline1.isValid() && viewModel.addressline2.isValid() && viewModel.city.isValid() && viewModel.zip.isValid() && viewModel.phonehome.isValid() && viewModel.selectedIndexCitizenship() > 0 && viewModel.selectedIndexCountry() > 0) {

    var dataObjAdditionalInfo = getJobseekerAdditionalInformation();
    if (dataObjAdditionalInfo) {
       
        var jsonObject = ko.toJS(viewModel);

        var jobSeekerAdditionalInfoEditObj = {}
        jobSeekerAdditionalInfoEditObj.Title = viewModel.dataTitle()[viewModel.selectedIndexTitle()].value;
        jobSeekerAdditionalInfoEditObj.Suffix = viewModel.dataSuffix()[viewModel.selectedIndexSuffix()].value;
        jobSeekerAdditionalInfoEditObj.MiddleName = jsonObject.middlename;
        jobSeekerAdditionalInfoEditObj.PreferedName = jsonObject.preferredname;
        jobSeekerAdditionalInfoEditObj.AddressLine1 = jsonObject.addressline1;
        jobSeekerAdditionalInfoEditObj.AddressLine2 = jsonObject.addressline2;
        jobSeekerAdditionalInfoEditObj.City = jsonObject.city;
        jobSeekerAdditionalInfoEditObj.StateId = viewModel.dataState()[viewModel.selectedIndexState()].value;
        jobSeekerAdditionalInfoEditObj.CountryId = viewModel.dataCountry()[viewModel.selectedIndexCountry()].value;
        jobSeekerAdditionalInfoEditObj.ZipCode = jsonObject.zip;
        jobSeekerAdditionalInfoEditObj.HomePhone = jsonObject.phonehome;
        jobSeekerAdditionalInfoEditObj.MethodOfContact = jsonObject.contact;
        jobSeekerAdditionalInfoEditObj.Citizenship = viewModel.dataCitizenship()[viewModel.selectedIndexCitizenship()].value;

        jobSeekerAdditionalInfoEditObj.Experience = jsonObject.yrExperience;

        if (dataObjAdditionalInfo.Notification)
            jobSeekerAdditionalInfoEditObj.Notification = dataObjAdditionalInfo.Notification.toString();

        jobSeekerAdditionalInfoEditObj.BirthDate = jsonObject.birthDate;
        jobSeekerAdditionalInfoEditObj.Ethinicity = jsonObject.ethnicity;
        jobSeekerAdditionalInfoEditObj.Gender = jsonObject.gender;

        var apiUrlAdditionalInfoEdit = GetWebAPIURL() + 'api/AdditionalInformation/' + jsonObject.additionalinfoid;
        var dataObjAdditionalInfoEdit = JSON.stringify(jobSeekerAdditionalInfoEditObj);

        //Update additional information
        $.ajax({
            url: apiUrlAdditionalInfoEdit,
            type: "PUT",
            data: dataObjAdditionalInfoEdit,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {

            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

        /*var jobSeekerEditObj = {}
        jobSeekerEditObj.FirstName = jsonObject.firstname;
        jobSeekerEditObj.LastName = jsonObject.lastname;
        jobSeekerEditObj.Email = jsonObject.email;
        jobSeekerEditObj.Password = jsonObject.password;
        jobSeekerEditObj.UserName = jsonObject.username;
        dataObjJobSeeker = JSON.stringify(jobSeekerEditObj);

        var apiUrlJobSeekerEdit = GetWebAPIURL() + '/api/JobSeeker/'; // + userId;
        var dataObjJobSeeker = JSON.stringify(jobSeekerEditObj);

        //Updates Jobseekers
        $.ajax({
            url: apiUrlJobSeekerEdit,
            type: "PUT",
            data: dataObjJobSeeker,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                //window.location = "JobSeekerList.html"
                viewModel.isEditableAccountDetails(false);
                viewModel.accountDetailsCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });*/


    }


    var textvalue = $("#wijeditor").val();
    viewModel.coverLetter(textvalue);

    var today = new Date();  
    var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   
    var jsonObjectCoverLetter = ko.toJS(viewModel);
    var dataObjAppliedJobs;
    var jobSeekerAppliedJobsObj = {}
    jobSeekerAppliedJobsObj.JobId = jobId;
    jobSeekerAppliedJobsObj.DateApplied = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();
    jobSeekerAppliedJobsObj.CoverLetter = jsonObjectCoverLetter.coverLetter;
    

    dataObjAppliedJobs = JSON.stringify(jobSeekerAppliedJobsObj);
    var apiUrlSubmitCoverLetter = GetWebAPIURL() + '/api/JobSeekerAppliedJobs/';

    //To create additional information of jobseeker
    $.ajax({
        url: apiUrlSubmitCoverLetter,
        type: "POST",
        data: dataObjAppliedJobs,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            window.location = "MyJobsApplied.html";
        },
        error: function (xhr, error) {
            alert('Error111 :' + error);
        }
    });
    }
    else {
        viewModel.errorAccountInformation.showAllMessages();
        if (viewModel.selectedIndexCitizenship() <= 0) {
            viewModel.errorCheckCitizenship('1');
        }
        else { viewModel.errorCheckCitizenship('0'); }

        if (viewModel.selectedIndexCountry() <= 0) {
            viewModel.errorCheckCountry('1');
        }
        else { viewModel.errorCheckCountry('0'); }
    }

}

function getCompanyDetails(CompanyID) {
    var dataobjJobs;
    var apiUrlJobs = GetWebAPIURL() + 'api/Company/?companyId=' + CompanyID;


    //To get Job list 
    $.ajax({
        url: apiUrlJobs,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjJobs = data;

        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjJobs;
}