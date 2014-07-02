var viewModel = {}

$(document).ready(function () {

    initPopUpSkills();
    ko.applyBindings(viewModel);
});

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

function initPopUpSkills() {
    viewModel.numberOfOpening = ko.observable();
    viewModel.jobLocation = ko.observable();
    viewModel.jobPosition = ko.observable();
    viewModel.jobDescription = ko.observable();

    viewModel.jobViews = ko.observable();
    viewModel.applicantAverage = ko.observable();
    viewModel.applicantNumber = ko.observable();
    viewModel.jobSalary = ko.observableArray();
    viewModel.jobOpenDate = ko.observable();
    viewModel.jobCloseDate = ko.observable();

    viewModel.WorkType = ko.observableArray();
    viewModel.WorkTypeId = ko.observable();
    viewModel.salaryId = ko.observable();

    var dataSalaryObj = getSalaryLookup();
    for (da in dataSalaryObj) {
        viewModel.jobSalary.push({ name: dataSalaryObj[da].Name, id: dataSalaryObj[da].Id });
    }

    var dataWorkTypeObj = getWorkTypeLookup();
    for (da in dataWorkTypeObj) {
        viewModel.WorkType.push({ name: dataWorkTypeObj[da].Name, id: dataWorkTypeObj[da].Id });
    }
}

viewModel.saveJob = function () {
    var today = new Date();
    var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var datePosted = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}
    jobseekerworkExperienceObj.NoOfOpenings = 56;
    jobseekerworkExperienceObj.CompanyId = "50535a0e-0dae-4772-ad7f-d8737223fbdd";
    jobseekerworkExperienceObj.JobDescription = jsonObjectWorkExperience.jobDescription;
    jobseekerworkExperienceObj.StartDate = jsonObjectWorkExperience.jobOpenDate;
    jobseekerworkExperienceObj.EndDate = jsonObjectWorkExperience.jobCloseDate;
    jobseekerworkExperienceObj.JobPosition = jsonObjectWorkExperience.jobPosition;

    jobseekerworkExperienceObj.JobViews = 25;
    jobseekerworkExperienceObj.ApplicantAverage = 60;
    jobseekerworkExperienceObj.ApplicantsNumber = 10;
    jobseekerworkExperienceObj.PostingDate = datePosted;

    jobseekerworkExperienceObj.JobType = "50a9889e-9b2b-44b5-96cd-8cf991c40413";
    jobseekerworkExperienceObj.JobSalary = "badf2120-ec29-4823-9194-5e1b0001b139";


    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/JobsList/';

    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjWorkExpereince,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            viewModel.jobPosition("");
            viewModel.jobDescription("");
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}