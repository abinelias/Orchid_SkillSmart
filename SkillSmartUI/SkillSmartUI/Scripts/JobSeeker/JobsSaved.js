$(document).ready(function () {
    initSavedJobSkillScoreCalculation();
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




var dataobjJobPrerequisiteList = getPrerequisiteList();
function initSavedJobSkillScoreCalculation() {
    var dataObjJobSeeker = getHeaderDetails();
    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName);
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName);

    var dataobjSavedJobList = getSavedJobsList();
    var dataobjJobSkillList = getSkillList();

    var dataJobSeekerSkillListObj = getJobSeekerSkills();
    var gaf = 1;
    viewModel.scoreDetails = ko.observableArray();

    viewModel.jobSkillsDetails = ko.observableArray();
    viewModel.savedJobs = ko.observableArray();
    viewModel.savedApplyCheck = ko.observable('1');
    viewModel.applyCheck = ko.observable('1');


    viewModel.salary = ko.observableArray();
    var dataSalaryObj = getSalaryLookup();

    for (da in dataSalaryObj) {
        viewModel.salary.push({ name: dataSalaryObj[da].Name, id: dataSalaryObj[da].Id });
    }
    for (daJobs in dataobjSavedJobList) {
        for (daJobSkill in dataobjJobSkillList) {

            if (dataobjSavedJobList[daJobs].JobId == dataobjJobSkillList[daJobSkill].JobId) {
                var score = new fillSavedJobScoreDetails(dataobjJobSkillList[daJobSkill], dataJobSeekerSkillListObj);
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
            var skillValues = new computedJobSkillScoreSavedJobs(viewModel.scoreDetails()[i], skillScoreJobSeeker, skillScoreEmployer);
            viewModel.jobSkillsDetails.push(skillValues);
        }
        var temp = 0;
        temp = Math.round((totalSkillScoreJobSeeker * 100) / totalSkillScoreEmployer);
        createJobListForJobseekerSavedJobs(temp, dataobjSavedJobList[daJobs], viewModel.jobSkillsDetails(), dataobjJobSkillList);


        viewModel.scoreDetails.removeAll();
    }

    viewModel.noOfSavedJobs = dataobjSavedJobList.length;
}

function fillSavedJobScoreDetails(objScore, dataJobSeekerSkillListObj) {

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

function computedJobSkillScoreSavedJobs(objComputedScore, skillScoreJobSeeker, skillScoreEmployer) {

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

function createJobListForJobseekerSavedJobs(totalSkillScoreJobSeeker, dataobjJobs, jobSkillsDetails, dataobjJobSkillList) {

    var listJob = new createJobSeekerJobsSavedList(totalSkillScoreJobSeeker, dataobjJobs, jobSkillsDetails, dataobjJobSkillList);
    viewModel.savedJobs.push(listJob);

}

function createJobSeekerJobsSavedList(totalSkillScoreJobSeeker, objJobs, jobSkillsDetails, dataobjJobSkillList) {
    var self = this;
    if (objJobs) {
        var jobDetails = getJobDetails(objJobs.JobId);

        var dataObjCompanyDetails = getCompanyDetails(jobDetails.CompanyId);

        self.jobId = objJobs.JobId;
        self.totalSkillScore = totalSkillScoreJobSeeker;
        self.employerName = dataObjCompanyDetails.CompanyName;
        self.jobPosition = jobDetails.JobPosition;
        self.companyLocation = dataObjCompanyDetails.City;
        self.datePosted = jobDetails.PostingDate;
        self.dateApplied = 'Feb 12,2014';
        self.jobStatus = 'Filled';
        self.salaryRange = ko.computed(function () {
            for (var j = 0; j < viewModel.salary().length; j++) {
                if (viewModel.salary()[j].id == jobDetails.JobSalary) {
                    return viewModel.salary()[j].name;
                }
            }
        }, this);
        self.jobDescription = jobDetails.JobDescription;

        self.jobViews = jobDetails.JobViews;
        self.applicants = jobDetails.ApplicantsNumber;
        self.applicantsSkillScore = jobDetails.ApplicantAverage;
        self.prerequisites = ko.observableArray();
        for (var k = 0; k < dataobjJobPrerequisiteList.length; k++) {
            if (dataobjJobPrerequisiteList[k].JobId == objJobs.JobId) {
                self.prerequisites.push({ designExperience: dataobjJobPrerequisiteList[k].PrerequisiteName });
            }
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

    if (jobApplyCheck == 1) {
        window.location = "AppliedJobs.html?&jobId=" + objExpand.jobId;
    }
}
