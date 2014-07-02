$(document).ready(function () {

    initAcountDetails();
});
var companyId = "503df823-4ee6-416f-82cd-cec253985bcc";

function getCountryLookup() {
    //To get Country for lookup
    var apiUrlCountry = GetWebAPIURL() + 'api/Lookup/?name=Country';
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

function getSectorLookup() {
    //To get Country for lookup
    var apiUrlSector = GetWebAPIURL() + 'api/Lookup/?name=Sector';
    var dataObjSector;

    $.ajax({
        url: apiUrlSector,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjSector = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjSector;
}

function getEmployerSizeLookup() {
    //To get Country for lookup
    var apiUrlEmployerSize = GetWebAPIURL() + 'api/Lookup/?name=EmployerSize';
    var dataObjEmployerSize;

    $.ajax({
        url: apiUrlEmployerSize,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjEmployerSize = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjEmployerSize;
}

function getIndustryTypeLookup() {
    var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
    var dataIndustryTypeObj;

    //To get details of Industry lookup
    $.ajax({
        url: apiUrlIndustryType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataIndustryTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataIndustryTypeObj;
}

function getSalaryLookup() {
    var apiUrlSalary = GetWebAPIURL() + '/api/Lookup/?name=Salary';
    var dataSalaryObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlSalary,
        type: 'GET',
        async: false,
        success: function (data) {
            dataSalaryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataSalaryObj;
}

function getWorkTypeLookup() {
    var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
    var dataWorkTypeObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlWorkType,
        type: 'GET',
        async: false,

        success: function (data) {
            dataWorkTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataWorkTypeObj;
}

function getCompanyDetails() {

    var apiUrlCompanyInfo = GetWebAPIURL() + 'api/Company/?companyId=' + companyId;
    var dataObjCompanyInfo;

    $.ajax({
        url: apiUrlCompanyInfo,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjCompanyInfo = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataObjCompanyInfo;
}

/*function getEmployers() {

    var apiUrlEmployer = GetWebAPIURL() + 'api/Employer/?companyId=' + companyId;
    var dataObjEmployer;

    $.ajax({
        url: apiUrlEmployer,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjEmployer = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataObjEmployer;
}
*/

function initAcountDetails() {

    var dataObjState;
    var dataObjCountry = getCountryLookup();
    var dataObjCompanyInfo = getCompanyDetails();

    viewModel.newJob = ko.observable(0);

    viewModel.selectedIndexSector = ko.observable(0);
    viewModel.dataSector = ko.observable(createListSector());

    viewModel.selectedIndexEmployerSize = ko.observable(0);
    viewModel.dataEmployerSize = ko.observable(createListEmployerSize());

    viewModel.selectedIndexIndustry = ko.observable(0);
    viewModel.dataIndustry = ko.observable(createListIndustry());

    viewModel.selectedIndexCountry = ko.observable(0);
    viewModel.dataCountry = ko.observable(createListCountry());

    viewModel.selectedIndexState = ko.observable(0);
    viewModel.dataState = ko.observable();

    viewModel.selectedIndexSalary = ko.observable(0);
    viewModel.dataSalary = ko.observable(createListSalary());

    viewModel.selectedIndexWorkType = ko.observable(0);
    viewModel.dataWorkType = ko.observable(createListWorkType());

    viewModel.companyName = ko.observable("");
    viewModel.branch = ko.observable("");
    viewModel.streetAddress = ko.observable("");
    viewModel.location = ko.observable("");
    viewModel.Maincity = ko.observable("");
    viewModel.zipCode = ko.observable().extend({ required: { message: "Zip is required" }, pattern: { message: "Zip can only be number", params: '^([0-9]*)$' } });
    viewModel.businessPhone = ko.observable("").extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } });
    viewModel.employerUrl = ko.observable();
    viewModel.jobDescription = ko.observable();
    viewModel.jobPosition = ko.observable();
    viewModel.numberOfOpening = ko.observable();
    viewModel.jobOpenDate = ko.observable();
    viewModel.jobCloseDate = ko.observable();

    viewModel.accountDetailsCheck = ko.observable('1');
    viewModel.isEditableAccountDetails = ko.observable(false);
    viewModel.btnAccountDetails = ko.observable("Edit");

    if (dataObjCompanyInfo) {
        viewModel.companyName(dataObjCompanyInfo.CompanyName);
        viewModel.branch(dataObjCompanyInfo.CompanyBranch);
        viewModel.streetAddress(dataObjCompanyInfo.StreetAddress);
        viewModel.location(dataObjCompanyInfo.Address2);
        viewModel.Maincity(dataObjCompanyInfo.City);
        viewModel.zipCode(JSON.stringify(dataObjCompanyInfo.Zip));
        viewModel.businessPhone = ko.observable(dataObjCompanyInfo.Phone);
        viewModel.employerUrl = ko.observable(dataObjCompanyInfo.CompanyURL);
        

        viewModel.selectedIndexCountry.subscribe(function (nextValue) {

            var countryId = viewModel.dataCountry()[viewModel.selectedIndexCountry()].value;
            if (countryId != "") {

                var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + countryId;
                //To get State for lookup
                $.ajax({
                    url: apiUrlState,
                    type: 'GET',
                    async: false,
                    success: function (data) {
                        viewModel.dataState(createStateList(data));
                        dataObjState = data;
                    },
                    error: function (xhr, status, error) {
                        alert('Error :' + status);
                    }
                });
            }
        });

        if (dataObjCompanyInfo.Country) {
            for (da in dataObjCountry) {
                if (dataObjCompanyInfo.Country == dataObjCountry[da].Id) {
                    viewModel.selectedIndexCountry((parseInt(da) + 1));
                }
            }
        }

        if (dataObjCompanyInfo.State) {
            for (da in dataObjState) {
                if (dataObjCompanyInfo.State == dataObjState[da].Id) {
                    viewModel.selectedIndexState(da);
                }
            }
        }
        var dataObjSector = getSectorLookup();

        if (dataObjCompanyInfo.Sector) {
            for (da in dataObjSector) {
                if (dataObjCompanyInfo.Sector == dataObjSector[da].Id) {
                    viewModel.selectedIndexSector(da);
                }
            }
        }
        var dataIndustryTypeObj = getIndustryTypeLookup();

        if (dataObjCompanyInfo.Industry) {
            for (da in dataIndustryTypeObj) {
                if (dataObjCompanyInfo.Industry == dataIndustryTypeObj[da].Id) {
                    viewModel.selectedIndexIndustry(da);
                }
            }
        }
        var dataObjEmployerSize = getEmployerSizeLookup();

        if (dataObjCompanyInfo.Industry) {
            for (da in dataObjEmployerSize) {
                if (dataObjCompanyInfo.EmployerSize == dataObjEmployerSize[da].Id) {
                    viewModel.selectedIndexEmployerSize(da);
                }
            }
        }
    }
    

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

function createStateList(data) {
    var list = [];
    for (da in data) {
        list.push({

            label: data[da].Name,
            value: data[da].Id
        });
    }
    return list;
}

function createListSector() {

    var dataObjSector = getSectorLookup();
    var list = [];
    for (da in dataObjSector) {

        list.push({
            label: dataObjSector[da].Name,
            value: dataObjSector[da].Id
        });
    }
    return list;
}

function createListIndustry() {

    var dataIndustryTypeObj = getIndustryTypeLookup();
    var list = [];
    for (da in dataIndustryTypeObj) {

        list.push({
            label: dataIndustryTypeObj[da].Name,
            value: dataIndustryTypeObj[da].Id
        });
    }

    return list;
}

function createListEmployerSize() {

    var dataObjEmployerSize = getEmployerSizeLookup();
    var list = [];
    for (da in dataObjEmployerSize) {

        list.push({
            label: dataObjEmployerSize[da].Name,
            value: dataObjEmployerSize[da].Id
        });
    }

    return list;
}

function createListSalary() {

    var dataSalaryObj = getSalaryLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataSalaryObj) {

        list.push({
            label: dataSalaryObj[da].Name,
            value: dataSalaryObj[da].Id
        });
    }
    return list;
}

function createListWorkType() {
    var dataWorkTypeObj = getWorkTypeLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataWorkTypeObj) {
        list.push({
            label: dataWorkTypeObj[da].Name,
            value: dataWorkTypeObj[da].Id
        });
    }
    return list;
}

viewModel.saveJob = function () {
    var today = new Date();
    var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var datePosted = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();

    var jsonObjectaddJob = ko.toJS(viewModel);
    var dataobjJobList;
    var jobseekerworkExperienceObj = {}
    jobseekerworkExperienceObj.NoOfOpenings = jsonObjectaddJob.numberOfOpening;
    jobseekerworkExperienceObj.CompanyId = "503df823-4ee6-416f-82cd-cec253985bcc";
    jobseekerworkExperienceObj.JobDescription = jsonObjectaddJob.jobDescription;
    jobseekerworkExperienceObj.StartDate = jsonObjectaddJob.jobOpenDate;
    jobseekerworkExperienceObj.EndDate = jsonObjectaddJob.jobCloseDate;
    jobseekerworkExperienceObj.JobPosition = jsonObjectaddJob.jobPosition;

    jobseekerworkExperienceObj.JobViews = 25;
    jobseekerworkExperienceObj.ApplicantAverage = 60;
    jobseekerworkExperienceObj.ApplicantsNumber = 10;
    jobseekerworkExperienceObj.PostingDate = datePosted;
    jobseekerworkExperienceObj.PublishId = 0;

    jobseekerworkExperienceObj.JobType = viewModel.dataWorkType()[viewModel.selectedIndexWorkType()].value;
    jobseekerworkExperienceObj.JobSalary = viewModel.dataSalary()[viewModel.selectedIndexSalary()].value;


    dataobjJobList = JSON.stringify(jobseekerworkExperienceObj);
    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList/';
    alert(dataobjJobList);

    //To create WorkHistory table
  /*  $.ajax({
        url: apiUrlJobList,
        type: "POST",
        data: dataobjJobList,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            viewModel.jobPosition("");
            viewModel.jobDescription("");
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });*/
}

viewModel.cancelJob = function () {
    viewModel.newJob(0);
}

viewModel.publishJob = function () {
}

viewModel.createNewJob = function ()
{
    viewModel.newJob(1);
}