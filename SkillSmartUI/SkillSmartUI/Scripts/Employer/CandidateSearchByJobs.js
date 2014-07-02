$(document).ready(function () {
    initSeaechCriteriaJobs();
});

function initSeaechCriteriaJobs() {
    viewModel.jobSeekerDetails = ko.observableArray();

    viewModel.dataJobs = ko.observable(createListJobs());
    viewModel.selectedjob = ko.observable(0);

}

viewModel.searchByJobs = function () {
    var apiUrlJobSeekerWithSkill = GetWebAPIURL() + '/api/GetJobSeekerSkillsForJobId?jobId=' + viewModel.dataJobs()[viewModel.selectedjob()].value;

    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSeekerWithSkill,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            getIndividualJobSeekerId(data);
        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });
}
viewModel.expandDetails = function (objExpand)
{
    if (objExpand.btnExpandDetails() == '+') {
        objExpand.btnExpandDetails('-');
    }
    else {
        objExpand.btnExpandDetails('+');
    }
}
viewModel.markFavourite = function () {
}
viewModel.watch = function () {
}
viewModel.viewFullProfile = function () {
}
viewModel.messages = function () {
}
viewModel.sendMessage = function () {
}
viewModel.inviteToApply = function () {
}
var jobSeekerIdArray = [];
function getIndividualJobSeekerId(dataJobSeekerWithSkill) {
    for (da in dataJobSeekerWithSkill) {
        if (jobSeekerIdArray.indexOf(dataJobSeekerWithSkill[da].JobSeekerId) == -1)
            jobSeekerIdArray.push(dataJobSeekerWithSkill[da].JobSeekerId);
    }
    if (jobSeekerIdArray.length > 0)
        createListJobSeeker(dataJobSeekerWithSkill);
}

var dataObjIndustryLookUp = getIndustryTypeLookup();
var dataObjSecurityLookUp = getSecurityClearanceLookup();
var dataObjRelocateLookUp = getWillingToRelocateLookup();
var dataObjWorkTypeLookUp = getWorkTypeLookup();

var dataDegreeTypeObj = getDegreeTypeLookup();
var dataProgramTypeObj = getProgramTypeLookUp();

function createListJobSeeker(dataJobSeekerWithSkill) {
    viewModel.jobSeekerList.removeAll();
    viewModel.jobSeekerDetails.removeAll();

    var dataObjJobSeekersWorkExpList = getJobSeekersWorkHistoryDetails();
    var dataObjJobSeekersOverviewList = getJobSeekersOverviewDetails();
    var dataJobSkills = getJobSkillsDetails();

    var dataObjEducationList = getJobSeekersEducationDetails();
    var dataObjTrainingList = getJobSeekersTrainingCourseDetails();
    var dataObjCertificationList = getJobSeekersCertificationDetails();
    for (var i = 0; i < jobSeekerIdArray.length; i++) {
        var overview;
        var currentJobSeekerSkills =[];

        for (da in dataObjJobSeekersOverviewList) {
            if (dataObjJobSeekersOverviewList[da].JobSeekerId == jobSeekerIdArray[i]) {
                overview = dataObjJobSeekersOverviewList[da];
                break;
            }
        }
        for (da in dataJobSeekerWithSkill) {
            if (dataJobSeekerWithSkill[da].JobSeekerId == jobSeekerIdArray[i]) {
                currentJobSeekerSkills.push(dataJobSeekerWithSkill[da]);
            }
        }
        var listJobSeeker = new JobSeekerDetails(overview, dataJobSkills, currentJobSeekerSkills, dataObjJobSeekersWorkExpList, dataObjEducationList, dataObjTrainingList, dataObjCertificationList);
        viewModel.jobSeekerDetails.push(listJobSeeker);
    }
    viewModel.jobSeekerDetails.sort(function (left, right) {
        return left.totalSkillScoreJobSeeker == right.totalSkillScoreJobSeeker ? 0 : (left.totalSkillScoreJobSeeker < right.totalSkillScoreJobSeeker ? 1 : -1)
    });
}

function JobSeekerDetails(overview, dataJobSkills, currentJobSeekerSkills, dataObjJobSeekersWorkExpList, dataObjEducationList, dataObjTrainingList, dataObjCertificationList) {
    var self = this;
    self.btnExpandDetails = ko.observable('+');
    self.IndustryName = ko.observableArray();
    self.jobSeekerName = "Job Seeker";
    for (da in dataObjJobSeekersWorkExpList) {
        if (overview.JobSeekerId == dataObjJobSeekersWorkExpList[da].JobSeekerId) {
            self.companyNames = dataObjJobSeekersWorkExpList[da].CompanyName;
            self.currentPositions = dataObjJobSeekersWorkExpList[da].EndingPosition;
            self.startDates = dataObjJobSeekersWorkExpList[da].StartDate;
            self.endDates = dataObjJobSeekersWorkExpList[da].EndDate;
            self.companyLocations = dataObjJobSeekersWorkExpList[da].CompanyLocation;
            break;
        }
    }

    self.summary = overview.Summary;
    self.specialityName = overview.Speciality;
    for (var j = 0; j < dataObjSecurityLookUp.length; j++) {
        if (dataObjSecurityLookUp[j].Id == overview.SecurityClearanceId) {
            self.securityCleareance = dataObjSecurityLookUp[j].Name;
            break;
        }
    }
    for (var j = 0; j < dataObjRelocateLookUp.length; j++) {
        if (dataObjRelocateLookUp[j].Id == overview.WillingToRelocateId) {
            self.relocate = dataObjRelocateLookUp[j].Name;
            break;
        }
    }
    var getIndustryId = overview.Industry.split(',');
    for (var j = 0; j < dataObjIndustryLookUp.length; j++) {
        for (var index = 0; index < getIndustryId.length; index++) {
            if (dataObjIndustryLookUp[j].Id == getIndustryId[index]) {
                self.IndustryName.push(dataObjIndustryLookUp[j].Name);
            }
        }
    }

    self.scoreDetails = ko.observableArray();
    self.jobSkillsDetails = ko.observableArray();

    for (da in dataJobSkills) {
        var score = new fillScoreDetails(dataJobSkills[da], currentJobSeekerSkills);
        self.scoreDetails.push(score);
    }

    var totalSkillScoreJobSeeker = 0;
    var totalSkillScoreEmployer = 0;
    for (var i = 0; i < self.scoreDetails().length; i++) {
        var gaf = 1;
        var res = 0;
        var skillScoreJobSeeker = 0;
        var skillScoreEmployer = 0;
        if (self.scoreDetails()[i].jobSeekerSkillScore() > 0) {
            res = Math.abs(self.scoreDetails()[i].jobSeekerSkillScore() - self.scoreDetails()[i].employerSkillProficiency());
            skillScoreJobSeeker = ((self.scoreDetails()[i].employerSkillProficiency() - res) * self.scoreDetails()[i].employerSkillImportance()) / gaf;
            totalSkillScoreJobSeeker = totalSkillScoreJobSeeker + skillScoreJobSeeker;
            skillScoreEmployer = self.scoreDetails()[i].employerSkillProficiency() * self.scoreDetails()[i].employerSkillImportance();
            totalSkillScoreEmployer = totalSkillScoreEmployer + skillScoreEmployer;
        }
        else {
            skillScoreJobSeeker = 0;
            totalSkillScoreJobSeeker = totalSkillScoreJobSeeker + 0;
            skillScoreEmployer = self.scoreDetails()[i].employerSkillProficiency() * self.scoreDetails()[i].employerSkillImportance();
            totalSkillScoreEmployer = totalSkillScoreEmployer + skillScoreEmployer;
        }
        var skillValues = new computedJobSkillScore(self.scoreDetails()[i], skillScoreJobSeeker, skillScoreEmployer);
        self.jobSkillsDetails.push(skillValues);
    }
    self.scoreDetails.removeAll();
    self.totalSkillScoreJobSeeker = Math.round((totalSkillScoreJobSeeker * 100) / totalSkillScoreEmployer);;
    self.workExperienceDetails = ko.observableArray();
    for (da in dataObjJobSeekersWorkExpList) {
        if (dataObjJobSeekersWorkExpList[da].JobSeekerId == overview.JobSeekerId) {
            var workExp = new createWorkExp(dataObjJobSeekersWorkExpList[da]);
            self.workExperienceDetails.push(workExp);
        }
    }

    self.educationDetails = ko.observableArray();
    for (da in dataObjEducationList) {
        if (dataObjEducationList[da].JobSeekerId == overview.JobSeekerId) {
            var education = new createEducation(dataObjEducationList[da]);
            self.educationDetails.push(education);
        }
    }

    self.trainingCourse = ko.observableArray();
    for (da in dataObjTrainingList) {
        if (dataObjTrainingList[da].JobSeekerId == overview.JobSeekerId) {
            var trainingCourse = new createtTrainingCourse(dataObjTrainingList[da]);
            self.trainingCourse.push(trainingCourse);
        }
    }

    self.certification = ko.observableArray();
    for (da in dataObjCertificationList) {
        if (dataObjCertificationList[da].JobSeekerId == overview.JobSeekerId) {
            var certification = new createCertification(dataObjCertificationList[da]);
            self.certification.push(certification);
        }
    }
}

function createWorkExp(dataObjWorkExp) {
    var self = this;
    self.companyName = dataObjWorkExp.CompanyName;
    self.currentPosition = dataObjWorkExp.EndingPosition;
    self.startDate = dataObjWorkExp.StartDate;
    self.endDate = dataObjWorkExp.EndDate;
    self.companyLocation = dataObjWorkExp.CompanyLocation;
    self.currentSalary = dataObjWorkExp.EndingSalary;
    self.salaryType = dataObjWorkExp.SalaryType;
    for (var j = 0; j < dataObjWorkTypeLookUp.length; j++) {
        if (dataObjWorkTypeLookUp[j].Id == dataObjWorkExp.WorkTypeId) {
            self.workTypeName = dataObjWorkTypeLookUp[j].Name;
            break;
        }
    }
    for (var j = 0; j < dataObjIndustryLookUp.length; j++) {
        if (dataObjIndustryLookUp[j].Id == dataObjWorkExp.IndustryId) {
            self.industryTypeName = dataObjIndustryLookUp[j].Name;
            break;
        }
    }
    self.jobDescription = dataObjWorkExp.JobDuties;
}

function createEducation(dataObjEdu) {
    var self = this;
    self.universityName = dataObjEdu.InstitutionName;
    for (da in dataDegreeTypeObj) {
        if (dataObjEdu.DegreeId == dataDegreeTypeObj[da].Id) {
            self.degreeName = dataDegreeTypeObj[da].Name;
            break;
        }
    }
    self.startDate = dataObjEdu.StartDate;
    self.endDate = dataObjEdu.EndDate;
    self.universityLocation = dataObjEdu.InstitutionLocation;
    self.majorFocus = dataObjEdu.MajorFocus;

}

function createCertification(objCertification) {
    var self = this;
    self.certificationName = objCertification.CertificationName;
    self.certificationInstituion = objCertification.InstitutionName;
    self.completedDate = objCertification.CompletionDate;
    self.expireDate = objCertification.ExpirationDate;
    self.certificationDetails = objCertification.CertificationDetails;
}

function createtTrainingCourse(objTrainingCourse) {
    var self = this;
    for (da in dataProgramTypeObj) {
        if (objTrainingCourse.ProgramTypeId == dataProgramTypeObj[da].Id) {
            self.programTypeName = dataProgramTypeObj[da].Name;
            break;
        }
    }
    self.focus = objTrainingCourse.Focus;

    self.certificationInstituion = objTrainingCourse.InstitutionName;
    self.completedDate = objTrainingCourse.CompletionDate;
    self.expireDate = objTrainingCourse.ExpirationDate;
    self.certificationDetails = objTrainingCourse.TrainingDetails;

}

function computedJobSkillScore(objComputedScore, skillScoreJobSeeker, skillScoreEmployer) {
    var self = this;
    var tempRes = 0;
    self.skillMMapId = ko.observable();
    self.skillName = ko.observable();
    self.skillScore = ko.observable();
    
    if (objComputedScore) {
        self.skillName(objComputedScore.skillName());
        self.skillMMapId(objComputedScore.skillMMapId());
        tempRes = Math.round((skillScoreJobSeeker * 100) / skillScoreEmployer);
        self.skillScore(tempRes);
    }
}

function fillScoreDetails(objScore, dataJobSeekerSkillListObj) {
    var self = this;
    self.employerSkillProficiency = ko.observable();
    self.employerSkillImportance = ko.observable();
    self.jobSeekerSkillScore = ko.observable();
    self.skillMMapId = ko.observable();
    self.skillName = ko.observable();
    

    if (objScore) {
        self.employerSkillProficiency(objScore.SkillScore);
        self.employerSkillImportance(objScore.SkillImportance);
        self.skillMMapId(objScore.SkillMapId);
        self.skillName(objScore.SkillName);
        for (da in dataJobSeekerSkillListObj) {
            if (dataJobSeekerSkillListObj[da].SkillMapId == objScore.SkillMapId) {
                self.jobSeekerSkillScore(dataJobSeekerSkillListObj[da].SkillScore);
                break;
            }

        }
        if (!self.jobSeekerSkillScore() > 0) {
            self.jobSeekerSkillScore(0)
        }
    }
}

function getJobList() {
    var companyId = "419b31b2-d199-4507-ab00-193469e5d924";
    var dataobjJobList;
    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList?companyId=' + companyId;

    //To get workhistory details from workhistory table
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

function createListJobs() {
    var dataJobsObj = getJobList();

    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataJobsObj) {
        list.push({
            label: dataJobsObj[da].JobPosition,
            value: dataJobsObj[da].Id
        });
    }
    return list;
}

function getJobSkillsDetails() {
    var apiUrlJobSkill = GetWebAPIURL() + '/api/GetJobSkillsForJobId?jobId=' + viewModel.dataJobs()[viewModel.selectedjob()].value;
    var dataJobSkills
    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSkill,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataJobSkills = data;
        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });
    return dataJobSkills;
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

function getJobSeekersEducationDetails() {
    var dataobjEducation;
    var apiUrlEducation = GetWebAPIURL() + '/api/GetJobSeekersEducation?JobSeekerId=' + jobSeekerIdArray.toString();

    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlEducation,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjEducation = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjEducation;
}

function getJobSeekersTrainingCourseDetails() {
    var dataobjTrainingCourse;
    var apiUrlTrainingCourse = GetWebAPIURL() + '/api/GetJobSeekersTrainingCourse?JobSeekerId=' + jobSeekerIdArray.toString();

    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlTrainingCourse,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjTrainingCourse = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjTrainingCourse;
}

function getJobSeekersCertificationDetails() {
    var dataobjCertification;
    var apiUrlCertification = GetWebAPIURL() + '/api/GetJobSeekersCertification?JobSeekerId=' + jobSeekerIdArray.toString();

    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlCertification,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjCertification = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjCertification;
}

function getDegreeTypeLookup() {
    var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
    var dataDegreeTypeObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlDegreeType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataDegreeTypeObj = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataDegreeTypeObj;
}

function getProgramTypeLookUp() {
    var apiUrlProgramType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
    var dataProgramTypeObj;

    //To get details of ProgramType lookup
    $.ajax({
        url: apiUrlProgramType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataProgramTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataProgramTypeObj;
}