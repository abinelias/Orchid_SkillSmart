
function getAllJobs() {
    var companyId = "";
    var dataobjJobs;
    var apiUrlJobs = GetWebAPIURL() + '/api/JobsList?companyId=' + companyId;


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
var dataAllCompany = getAllCompanyDetails();
var dataobjJobPrerequisiteList = getPrerequisiteList();

function initJobSkillScoreCalculation(dataobjJobs) {
    viewModel.jobsList.removeAll();
    var dataobjJobSkillList = getSkillList();
    var dataJobSeekerSkillListObj = getJobSeekerSkills();
    var gaf = 1;
    viewModel.scoreDetails = ko.observableArray();
    viewModel.jobSkillsDetails = ko.observableArray();

    for (daJobs in dataobjJobs) {
        for (daJobSkill in dataobjJobSkillList) {
            if (dataobjJobs[daJobs].Id == dataobjJobSkillList[daJobSkill].JobId) {
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
        createJobListForJobseeker(temp, dataobjJobs[daJobs], viewModel.jobSkillsDetails(), dataobjJobSkillList);

        viewModel.scoreDetails.removeAll();
    }
    viewModel.listJobs('1');
    viewModel.jobsList.sort(function (left, right) {
        return left.totalSkillScore == right.totalSkillScore ? 0 : (left.totalSkillScore < right.totalSkillScore ? 1 : -1)
    });
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
    if (totalSkillScoreJobSeeker) {
        var listJob = new createJobSeekerJobList(totalSkillScoreJobSeeker, dataobjJobs, jobSkillsDetails, dataobjJobSkillList);
        viewModel.jobsList.push(listJob);
    }
}

function createJobSeekerJobList(totalSkillScoreJobSeeker, objJobs, jobSkillsDetails, dataobjJobSkillList) {
    var self = this;
    if (objJobs) {

        self.jobId = objJobs.Id;
        self.totalSkillScore = totalSkillScoreJobSeeker;
        self.jobPosition = objJobs.JobPosition;
        for (var i = 0; i < dataAllCompany.length; i++) {
            if (objJobs.CompanyId == dataAllCompany[i].Id.toString()) {
                self.employerName = dataAllCompany[i].CompanyName;
                self.companyLocation = dataAllCompany[i].City;
            }
        }

        self.datePosted = objJobs.PostingDate;
        self.dateApplied = 'Feb 12,2014';
        self.jobStatus = 'Filled';
        self.salaryRange = ko.computed(function () {
            for (var j = 0; j < viewModel.salary().length; j++) {
                if (viewModel.salary()[j].id == objJobs.JobSalary) {
                    return viewModel.salary()[j].name;
                }
            }
        }, this);

        self.jobDescription = objJobs.JobDescription;

        self.jobViews = objJobs.JobViews;
        self.applicants = objJobs.ApplicantsNumber;
        self.applicantsSkillScore = objJobs.ApplicantAverage;
        self.prerequisites = ko.observableArray();
        for (var k = 0; k < dataobjJobPrerequisiteList.length; k++) {
            if (dataobjJobPrerequisiteList[k].JobId == objJobs.Id) {
                self.prerequisites.push({ designExperience: dataobjJobPrerequisiteList[k].PrerequisiteName });
            }
        }
        self.requiredSkills = ko.observableArray();
        if (jobSkillsDetails) {

            for (var i = 0; i < jobSkillsDetails.length; i++) {
                if (jobSkillsDetails[i].jobId() == objJobs.Id) {
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



function getAllCompanyDetails() {
    var dataobjJobs;
    var apiUrlJobs = GetWebAPIURL() + 'api/Company/';


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

function getPrerequisiteList() {
    var dataObjJobPrerequisite;
    var apiUrlPrerequisiteList = GetWebAPIURL() + '/api/ListJobPrerequisite';

    //To get Job list 
    $.ajax({
        url: apiUrlPrerequisiteList,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobPrerequisite = data;

        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });
    return dataObjJobPrerequisite;
}
