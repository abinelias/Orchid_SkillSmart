$(document).ready(function () {
    initJobSkillScoreCalculation();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);

function getJobsList() {
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobSeekerAppliedJobs'; //?jobSeekerId=' + userId;

    $.ajax({
        url: apiUrlJobList,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        headers: app.securityHeaders(),
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

function getJobSeekerSkills() {
    var dataJobSeekerSkillListObj;
    var apiUrlJobSeekerSkillLists = GetWebAPIURL() + '/api/JobSeekerSkillList/';

    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSeekerSkillLists,
        type: 'GET',
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            dataJobSeekerSkillListObj = data;

        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });
    return dataJobSeekerSkillListObj;
}



function initJobsApplied() {
    viewModel.savedApplyCheck = ko.observable('1');
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

function initJobSkillScoreCalculation() {
    var dataobjAppliedJobList = getJobsList();
    var dataobjJobSkillList = getSkillList();

    var dataJobSeekerSkillListObj = getJobSeekerSkills();
    var gaf = 1;
    viewModel.scoreDetails = ko.observableArray();
    viewModel.jobSkillsDetails = ko.observableArray();
    viewModel.jobs = ko.observableArray();
    viewModel.savedApplyCheck = ko.observable('1');
    viewModel.applyCheck = ko.observable('1');
    viewModel.noOfJobs = dataobjAppliedJobList.length;
    for (daJobs in dataobjAppliedJobList) {
        for (daJobSkill in dataobjJobSkillList) {

            if (dataobjAppliedJobList[daJobs].JobId == dataobjJobSkillList[daJobSkill].JobId) {
                var score = new fillScoreDetails(dataobjJobSkillList[daJobSkill], dataJobSeekerSkillListObj);
                viewModel.scoreDetails.push(score);

            }
        }
        var totalSkillScoreJobSeeker = 0;
        var totalSkillScoreEmployer = 0;
        for (var i = 0; i < viewModel.scoreDetails().length; i++) {

            var gaf = 1;
            var res = 0;
            var skillScoreJobSeeker = 0;
            var skillScoreEmployer = 0;
            if (viewModel.scoreDetails()[i].jobSeekerSkillScore() > 0) {
                res = Math.abs(viewModel.scoreDetails()[i].jobSeekerSkillScore() - viewModel.scoreDetails()[i].employerSkillProficiency());
                skillScoreJobSeeker = ((viewModel.scoreDetails()[i].employerSkillProficiency() - res) * viewModel.scoreDetails()[i].employerSkillImportance()) / gaf;
                totalSkillScoreJobSeeker = totalSkillScoreJobSeeker + skillScoreJobSeeker;
                skillScoreEmployer = viewModel.scoreDetails()[i].employerSkillProficiency() * viewModel.scoreDetails()[i].employerSkillImportance();
                totalSkillScoreEmployer = totalSkillScoreEmployer + skillScoreEmployer;

            }
            else {
                skillScoreJobSeeker = 0;
                totalSkillScoreJobSeeker = totalSkillScoreJobSeeker + 0;
                skillScoreEmployer = viewModel.scoreDetails()[i].employerSkillProficiency() * viewModel.scoreDetails()[i].employerSkillImportance();
                totalSkillScoreEmployer = totalSkillScoreEmployer + skillScoreEmployer;
            }
            var skillValues = new computedJobSkillScore(viewModel.scoreDetails()[i], skillScoreJobSeeker, skillScoreEmployer);
            viewModel.jobSkillsDetails.push(skillValues);
        }
        var temp = 0;
        temp = Math.round((totalSkillScoreJobSeeker * 100) / totalSkillScoreEmployer);
        createJobListForJobseeker(temp, dataobjAppliedJobList[daJobs], viewModel.jobSkillsDetails(), dataobjJobSkillList);


        viewModel.scoreDetails.removeAll();
    }
}

function fillScoreDetails(objScore, dataJobSeekerSkillListObj) {

    var self = this;
    self.employerSkillProficiency = ko.observable();
    self.employerSkillImportance = ko.observable();
    self.jobSeekerSkillScore = ko.observable();
    self.jobId = ko.observable();
    self.skillMMapId = ko.observable();

    if (objScore) {
        self.employerSkillProficiency(objScore.SkillScore);
        self.employerSkillImportance(objScore.SkillImportance);
        self.jobId(objScore.JobId);
        self.skillMMapId(objScore.SkillMapId);
        for (da in dataJobSeekerSkillListObj) {
            if (dataJobSeekerSkillListObj[da].SkillMapId == objScore.SkillMapId) {
                self.jobSeekerSkillScore(dataJobSeekerSkillListObj[da].ProficiencyId);
                break;
            }

        }
        if (!self.jobSeekerSkillScore() > 0) {
            self.jobSeekerSkillScore(0)
        }
    }
}

function computedJobSkillScore(objComputedScore, skillScoreJobSeeker, skillScoreEmployer) {

    var self = this;
    var tempRes = 0;
    self.jobId = ko.observable();
    self.skillMMapId = ko.observable();
    self.jobSeekerSkillScore = ko.observable();

    if (objComputedScore) {
        self.jobId(objComputedScore.jobId());
        self.skillMMapId(objComputedScore.skillMMapId());
        tempRes = Math.round((skillScoreJobSeeker * 100) / skillScoreEmployer);
        self.jobSeekerSkillScore(tempRes);
    }
}
function getGAF(objscoreDetails) {
    var gaf = 1;
    if ((objscoreDetails.jobSeekerSkillScore() == 1) && (objscoreDetails.employerSkillProficiency() == 1))
        gaf = 1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 1) && (objscoreDetails.employerSkillProficiency() == 2))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 1) && (objscoreDetails.employerSkillProficiency() == 3))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 1) && (objscoreDetails.employerSkillProficiency() == 4))
        gaf = 1.15;
    else if ((objscoreDetails.jobSeekerSkillScore() == 1) && (objscoreDetails.employerSkillProficiency() == 5))
        gaf = 1.2;
    else if ((objscoreDetails.jobSeekerSkillScore() == 2) && (objscoreDetails.employerSkillProficiency() == 1))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 2) && (objscoreDetails.employerSkillProficiency() == 2))
        gaf = 1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 2) && (objscoreDetails.employerSkillProficiency() == 3))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 2) && (objscoreDetails.employerSkillProficiency() == 4))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 2) && (objscoreDetails.employerSkillProficiency() == 5))
        gaf = 1.15;
    else if ((objscoreDetails.jobSeekerSkillScore() == 3) && (objscoreDetails.employerSkillProficiency() == 1))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 3) && (objscoreDetails.employerSkillProficiency() == 2))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 3) && (objscoreDetails.employerSkillProficiency() == 3))
        gaf = 1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 3) && (objscoreDetails.employerSkillProficiency() == 4))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 3) && (vobjscoreDetails.employerSkillProficiency() == 5))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 4) && (objscoreDetails.employerSkillProficiency() == 1))
        gaf = 1.15;
    else if ((objscoreDetails.jobSeekerSkillScore() == 4) && (objscoreDetails.employerSkillProficiency() == 2))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 4) && (objscoreDetails.employerSkillProficiency() == 3))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 4) && (objscoreDetails.employerSkillProficiency() == 4))
        gaf = 1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 4) && (objscoreDetails.employerSkillProficiency() == 5))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 5) && (objscoreDetails.employerSkillProficiency() == 1))
        gaf = 1.2;
    else if ((objscoreDetails.jobSeekerSkillScore() == 5) && (objscoreDetails.employerSkillProficiency() == 2))
        gaf = 1.15;
    else if ((objscoreDetails.jobSeekerSkillScore() == 5) && (objscoreDetails.employerSkillProficiency() == 3))
        gaf = 1.1;
    else if ((objscoreDetails.jobSeekerSkillScore() == 5) && (objscoreDetails.employerSkillProficiency() == 4))
        gaf = 1.05;
    else if ((objscoreDetails.jobSeekerSkillScore() == 5) && (objscoreDetails.employerSkillProficiency() == 5))
        gaf = 1;
    else
        gaf = 1;

    return gaf;
}

function createJobListForJobseeker(totalSkillScoreJobSeeker, dataobjJobs, jobSkillsDetails, dataobjJobSkillList) {
    var listJob = new createJobSeekerJobList(totalSkillScoreJobSeeker, dataobjJobs, jobSkillsDetails, dataobjJobSkillList);
    viewModel.jobs.push(listJob);

}

function createJobSeekerJobList(totalSkillScoreJobSeeker, objJobs, jobSkillsDetails, dataobjJobSkillList) {
    var self = this;
    if (objJobs) {
        var jobDetails = getJobDetails(objJobs.JobId);

        self.jobId = objJobs.Id;
        self.totalSkillScore = totalSkillScoreJobSeeker;
        self.employerName = jobDetails.CompanyName;
        self.jobPosition = jobDetails.JobPosition;
        self.companyLocation = jobDetails.JobLocation;
        self.datePosted = jobDetails.PostingDate;
        self.dateApplied = 'Feb 12,2014';
        self.jobStatus = 'Filled';
        self.salaryRange = jobDetails.JobSalary;
        self.jobDescription = jobDetails.JobDescription;

        self.jobViews = jobDetails.JobViews;
        self.applicants = jobDetails.ApplicantsNumber;
        self.applicantsSkillScore = jobDetails.ApplicantAverage;
        self.prerequisites = ko.observableArray();

        for (var k = 0; k < 3; k++) {
            self.prerequisites.push({ designExperience: '10 years of design experience' });
        }
        self.requiredSkills = ko.observableArray();
        if (jobSkillsDetails) {
            for (var i = 0; i < jobSkillsDetails.length; i++) {
                if (jobSkillsDetails[i].jobId() == objJobs.JobId) {

                    var name = getSkillName(jobSkillsDetails[i], dataobjJobSkillList);
                    self.requiredSkills.push({ skillName: name, skillScore: jobSkillsDetails[i].jobSeekerSkillScore() });
                }
            }
        }
    }
}

function getSkillName(jobSkillsDetails, dataobjJobSkillList) {

    var skillName = '';
    for (var i = 0; i < dataobjJobSkillList.length; i++) {
        if (dataobjJobSkillList[i].SkillMapId == jobSkillsDetails.skillMMapId()) {
            skillName = dataobjJobSkillList[i].SkillName;
        }
    }
    return skillName;
}
