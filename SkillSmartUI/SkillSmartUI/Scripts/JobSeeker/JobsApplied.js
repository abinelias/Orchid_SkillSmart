$(document).ready(function () {
    initJobsApplied();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);

function getJobsList() {
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobSeekerAppliedJobs?jobSeekerId=' + userId;

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

function getSkillList() {
    var dataobjSkillList;
    var apiUrlSkillList = GetWebAPIURL() + '/api/ListJobSkills';


    //To get Job list 
    $.ajax({
        url: apiUrlSkillList,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjSkillList = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjSkillList;
}

function getJobDetails(jobId) {
    //To get User details
    var apiUrlJobDetails = GetWebAPIURL() + '/api/JobsList/' + jobId;
    var dataObjJobDetails;

    $.ajax({
        url: apiUrlJobDetails,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobDetails = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjJobDetails;
}

var dataobjSkillList = getSkillList();

var dataobjJobList = getJobsList();

function initJobsApplied() {
    viewModel.applyCheck = ko.observable('1');
    viewModel.disabled = ko.observable(false);
    viewModel.collapsible = ko.observable(false);
    viewModel.jobs = ko.observableArray();

    if (dataobjJobList) {
        for (var i = 0; i < dataobjJobList.length; i++) {
            var jobDetails = new getJobDetails(dataobjJobList[i].JobId);
            var listJob = new createJobList(jobDetails);
            viewModel.jobs.push(listJob);
        }
    }
    viewModel.noOfJobs = dataobjJobList.length;
}

function createJobList(objJobs) {

    var self = this;
    if (objJobs) {
        self.jobId = objJobs.Id;

        self.employerName = objJobs.CompanyName;
        self.jobPosition = objJobs.JobPosition;
        self.companyLocation = objJobs.JobLocation;
        self.datePosted = objJobs.PostingDate;
        self.dateApplied = 'Feb 12,2014';
        self.jobStatus = 'Filled';
        self.salaryRange = objJobs.JobSalary;
        self.jobDescription = objJobs.JobDescription;

        self.jobViews = objJobs.JobViews;
        self.applicants = objJobs.ApplicantsNumber;
        self.applicantsSkillScore = objJobs.ApplicantAverage;
        self.prerequisites = ko.observableArray();
        for (var k = 0; k < 3; k++) {
            self.prerequisites.push({ designExperience: '10 years of design experience' });
        }
        self.requiredSkills = ko.observableArray();
        for (var i = 0; i < dataobjSkillList.length; i++) {
            if (dataobjSkillList[i].JobId == objJobs.Id) {
                self.requiredSkills.push({ skillName: dataobjSkillList[i].SkillName, skillScore: dataobjSkillList[i].SkillScore });
            }
        }
    }
    self.btnJobsList = ko.observable('+');
}

viewModel.expandJobDetails = function (objExpand) {
    if (objExpand.btnJobsList() == '+') {
        objExpand.btnJobsList('-');
    }
    else {
        objExpand.btnJobsList('+');
    }
}

viewModel.applyJobs = function (objExpand) {
    window.location = "AppliedJobs.html?userId=" + userId + "&jobId=" + objExpand.jobId;

}