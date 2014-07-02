var viewModel = {}

$(document).ready(function () {
    initAddCompany();
    ko.applyBindings(viewModel);
});

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

function initAddCompany() {
    viewModel.companyName = ko.observable();
    viewModel.AddressLine1 = ko.observable();
    viewModel.AddressLine2 = ko.observable();
    viewModel.city = ko.observable();
    viewModel.state = ko.observable();
    viewModel.zip = ko.observable();
    viewModel.country = ko.observable();
    viewModel.sector = ko.observable();
    viewModel.employerSize = ko.observable();
    viewModel.phone = ko.observable();
    viewModel.companyUrl = ko.observable();
    viewModel.companyDescription = ko.observable();

    viewModel.industryTypeId = ko.observable();
    viewModel.industryType = ko.observableArray();

    var dataIndustryTypeObj = getIndustryTypeLookup();
    for (da in dataIndustryTypeObj) {
        viewModel.industryType.push({ name: dataIndustryTypeObj[da].Name, id: dataIndustryTypeObj[da].Id });
    }

    
}

viewModel.saveJob = function () {
    var today = new Date();
    var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var datePosted = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();
    alert(datePosted);

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}
    jobseekerworkExperienceObj.CompanyName = jsonObjectWorkExperience.companyName;
    jobseekerworkExperienceObj.StreetAddress = jsonObjectWorkExperience.AddressLine1;
    jobseekerworkExperienceObj.Address2 = jsonObjectWorkExperience.AddressLine2;
    jobseekerworkExperienceObj.City = jsonObjectWorkExperience.city;

    jobseekerworkExperienceObj.State = jsonObjectWorkExperience.state;
    jobseekerworkExperienceObj.Zip = jsonObjectWorkExperience.zip;
    jobseekerworkExperienceObj.Country = jsonObjectWorkExperience.country;
    jobseekerworkExperienceObj.Sector = jsonObjectWorkExperience.sector;
    jobseekerworkExperienceObj.Industry = jsonObjectWorkExperience.industryTypeId.toString();
    jobseekerworkExperienceObj.EmployerSize = jsonObjectWorkExperience.employerSize;
    jobseekerworkExperienceObj.Phone = jsonObjectWorkExperience.phone;  
    jobseekerworkExperienceObj.CompanyURL = jsonObjectWorkExperience.companyUrl;
    jobseekerworkExperienceObj.CompanyDescription = jsonObjectWorkExperience.companyDescription;
   

    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/Company/';

    alert(dataobjWorkExpereince);
    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjWorkExpereince,
        
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
           
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}