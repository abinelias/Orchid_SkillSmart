$(document).ready(function () {
    initJobsSaved();
});



function getJobSeekerAppliedJobs() {
    var apiUrlJobSeekerAppliedJobs = GetWebAPIURL() + '/api/JobSeekerAppliedJobs/';
    var dataObjJobSeekerAppliedJobs;

    $.ajax({
        url: apiUrlJobSeekerAppliedJobs,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobSeekerAppliedJobs = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjJobSeekerAppliedJobs;
}

function getSavedJobsList() {
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobSeekerSavedJobs/';

    $.ajax({
        url: apiUrlJobList,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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


function initJobsSaved() {
    var dataobjSavedJobList = getSavedJobsList();
    var dataObjJobSeeker = getHeaderDetails();
    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName);
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName);
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
        var dataobjSkillList = getSkillList();

        for (var i = 0; i < dataobjSkillList.length; i++) {
            if (dataobjSkillList[i].JobId == objJobs.Id) {

                self.requiredSkills.push({ skillName: dataobjSkillList[i].SkillName, skillScore: dataobjSkillList[i].SkillScore });
            }
        }
    }

}

viewModel.applyJobs = function (objExpand) {
    var jobApplyCheck = 1;
    var dataObjJobSeekerAppliedJobs = getJobSeekerAppliedJobs();
    if (dataObjJobSeekerAppliedJobs.length != 0) {

        for (var i = 0; i < dataObjJobSeekerAppliedJobs.length; i++) {
            if (objExpand.jobId == dataObjJobSeekerAppliedJobs[i].JobId) {
                alert("Job already applied");
                jobApplyCheck = 0;
                break;
            }

        }
    }
    else {

        jobApplyCheck = 1;
    }
    if (jobApplyCheck == 1) {

        window.location = "AppliedJobs.html?userId=" + userId + "&jobId=" + objExpand.jobId;

    }

}
