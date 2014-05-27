$(document).ready(function () {
    initJobsSaved();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);

function getSavedJobsList() {
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobSeekerSavedJobs?jobSeekerId=' + userId;

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

var dataobjSavedJobList = getSavedJobsList();

function initJobsSaved() {
  //  viewModel.savedApplyCheck = ko.observable('1');
    viewModel.savedJobs = ko.observableArray();

    if (dataobjSavedJobList) {
        for (var i = 0; i < dataobjSavedJobList.length; i++) {
            var jobDetails = new getJobDetails(dataobjSavedJobList[i].JobId);
            var listJob = new createSavedJobList(jobDetails);
            viewModel.savedJobs.push(listJob);
        }
    }
    viewModel.noOfSavedJobs = dataobjSavedJobList.length;
}

function createSavedJobList(objJobs) {

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



viewModel.applyJobs = function (objExpand) {
    window.location = "AppliedJobs.html?userId=" + userId + "&jobId=" + objExpand.jobId;

}