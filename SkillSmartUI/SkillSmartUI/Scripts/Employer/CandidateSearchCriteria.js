$(document).ready(function () {
    initSeaechCriteriaSkill();
});

function initSeaechCriteriaSkill() {
    viewModel.jobSeekerList = ko.observableArray();
    viewModel.listJobSeeker = ko.observable('0');
    viewModel.dataCompetency = ko.observable(createListCompetency());
    viewModel.dataSkill = ko.observable();
    viewModel.dataProficiency = ko.observable(createListProficiency());

    viewModel.selectedCompetemcy = ko.observable(0);
    viewModel.selectedSkill = ko.observable(0);
    viewModel.selectedProficiency = ko.observable(0);

    viewModel.selectedCompetemcy.subscribe(function (newValue) {
        var competencyId = viewModel.dataCompetency()[viewModel.selectedCompetemcy()].value;
        if (competencyId != "") {
            var apiUrlSkill = GetWebAPIURL() + '/api/SkillMap/?specialityId=' + competencyId;

            //To get State for lookup
            $.ajax({
                url: apiUrlSkill,
                type: 'GET',
                async: false,
                success: function (data) {
                    viewModel.dataSkill(createListSkill(data));
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });
}

viewModel.searchBySkills = function () {

    var dataJobSeekerWithSkill;
    var apiUrlJobSeekerWithSkill = GetWebAPIURL() + '/api/GetJobSeekerSkillsWithSkillId?id=' + viewModel.dataSkill()[viewModel.selectedSkill()].value;

    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSeekerWithSkill,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataJobSeekerWithSkill = data;
            getUniqueJobSeekerId(data);
        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });
}
viewModel.expandJobSeekerList = function (objExpand) {
    if (objExpand.btnExpandJobSeekerList() == '+') {
        objExpand.btnExpandJobSeekerList('-');
    }
    else {
        objExpand.btnExpandJobSeekerList('+');
    }
}
viewModel.jobSeekerMarkFavourite = function () {
}
viewModel.jobSeekerWatch = function () {
}
viewModel.jobSeekerViewFullProfile = function () {
}
viewModel.jobSeekerMessages = function () {
}
viewModel.JobSeekerSendMessage = function () {
}
viewModel.JobSeekerInviteToApply = function () {
}

var jobSeekerIdArray = [];
function getUniqueJobSeekerId(dataJobSeekerWithSkill) {
    for (da in dataJobSeekerWithSkill) {
        if (jobSeekerIdArray.indexOf(dataJobSeekerWithSkill[da].JobSeekerId) == -1)
            jobSeekerIdArray.push(dataJobSeekerWithSkill[da].JobSeekerId);
    }
    if (jobSeekerIdArray.length > 0)
        createJobSeekerList(dataJobSeekerWithSkill);
}


function createJobSeekerList(dataJobSeekerWithSkill) {
    viewModel.jobSeekerList.removeAll();
    viewModel.jobSeekerDetails.removeAll();

    var dataObjJobSeekersWorkExpList = getJobSeekersWorkHistoryDetails();
    var dataObjJobSeekersOverviewList = getJobSeekersOverviewDetails();

    var dataObjEducationList = getJobSeekersEducationDetails();
    var dataObjTrainingList = getJobSeekersTrainingCourseDetails();
    var dataObjCertificationList = getJobSeekersCertificationDetails();

    for (var i = 0; i < jobSeekerIdArray.length; i++) {
        var overview;
        for (da in dataObjJobSeekersOverviewList) {
            if (dataObjJobSeekersOverviewList[da].JobSeekerId == jobSeekerIdArray[i]) {
                overview = dataObjJobSeekersOverviewList[da];
                break;
            }
        }
        var listJobSeeker = new fillJobSeekerDetails(overview, dataJobSeekerWithSkill, dataObjJobSeekersWorkExpList, dataObjEducationList, dataObjTrainingList, dataObjCertificationList);
        viewModel.jobSeekerList.push(listJobSeeker);
    }
}

function fillJobSeekerDetails(overview, dataJobSeekerSkillListObj,  dataObjJobSeekersWorkExpList, dataObjEducationList, dataObjTrainingList, dataObjCertificationList) {
    var self = this;
    self.btnExpandJobSeekerList = ko.observable('+');
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

    self.categoryArray = ko.observableArray();
    var categoryId;
    var specialityId;
    var currentCategoryObj;
    var currentSpecialityObj;

    for (da in dataJobSeekerSkillListObj) {
        if (overview.JobSeekerId == dataJobSeekerSkillListObj[da].JobSeekerId) {
            if (dataJobSeekerSkillListObj[da].CategoryId != categoryId) {
                specialityId = 0;
                var categoryObj = new createCategory(dataJobSeekerSkillListObj[da]);
                categoryId = dataJobSeekerSkillListObj[da].CategoryId;
                specialityId = dataJobSeekerSkillListObj[da].SpecialityId;
                self.categoryArray.push(categoryObj);
                currentCategoryObj = categoryObj;
            }

            else {
                if (dataJobSeekerSkillListObj[da].SpecialityId != specialityId) {
                    var skillObj = new createSpeciality(dataJobSeekerSkillListObj[da]);
                    specialityId = dataJobSeekerSkillListObj[da].SpecialityId;
                    currentSpecialityObj = skillObj;
                    currentCategoryObj.specialityArray.push(skillObj);
                }
                else {
                    var skillObj = new createSkil(dataJobSeekerSkillListObj[da]);
                    currentSpecialityObj.skillArray.push(skillObj);
                    categoryId = dataJobSeekerSkillListObj[da].CategoryId;

                }
            }
        }
    }
    function createCategory(skillCollection) {

        var self = this;
        self.categoryName = ko.observable();
        self.btnCategoryList = ko.observable('+');
        self.specialityArray = ko.observableArray();

        if (skillCollection) {
            var specialityObj = new createSpeciality(skillCollection);
            currentSpecialityObj = specialityObj;
            self.categoryName(skillCollection.CategoryName);
            self.specialityArray.push(specialityObj);
        }
    }

    function createSpeciality(skillCollection) {
        var self = this;

        self.specialityName = ko.observable('');
        self.btnSpecialityList = ko.observable('+');
        self.skillArray = ko.observableArray();
        var skillObj = new createSkil(skillCollection);
        if (skillCollection) {
            self.specialityName(skillCollection.SpecialityName);
            self.skillArray.push(skillObj);
        }
    }

    function createSkil(skillCollection) {

        var self = this;
        var score;
        self.skillName = ko.observable('');
        self.SkillId = ko.observable('');
        if (skillCollection.SkillScore == null) {
            score = 1;
        }
        else {
            score = skillCollection.SkillScore;
        }
        self.val = ko.observable(score);
        self.btnSkillList = ko.observable('+');
        self.validationFactor = ko.observable();
        if (skillCollection) {
            self.skillName(skillCollection.SkillName);
            self.SkillId(skillCollection.Id);
        }
    }

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

viewModel.expandSpecialityDetails = function (objExpand) {
    if (objExpand.btnSpecialityList() == '+') {
        objExpand.btnSpecialityList('-');
    }
    else {
        objExpand.btnSpecialityList('+');
    }
}

function getJobSeekersOverviewDetails() {
    var dataobjOverview;
    var apiUrlOverview = GetWebAPIURL() + '/api/GetJobSeekersOverview?JobSeekerId=' + jobSeekerIdArray.toString();

    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjOverview = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjOverview;
}
function getJobSeekersWorkHistoryDetails() {
    var dataobjWorkExpereince;
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/GetJobSeekerWorkHistory?JobSeekerId=' + jobSeekerIdArray.toString();
    
    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjWorkExpereince = data;

        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjWorkExpereince;
}
var parentid = "31ce822c-cebb-433e-91cd-16834ec4d8c4";
function getCompetencyList() {
    var apiUrlCategory = GetWebAPIURL() + '/api/Category?parentId=' + parentid;
    var dataCategoryObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlCategory,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataCategoryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataCategoryObj;

}

function createListCompetency() {
    var dataCompetencyObj = getCompetencyList();

    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataCompetencyObj) {
        list.push({
            label: dataCompetencyObj[da].CategoryName,
            value: dataCompetencyObj[da].Id
        });
    }
    return list;
}

function createListSkill(dataObjSkill) {
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjSkill) {
        list.push({
            label: dataObjSkill[da].SkillName,
            value: dataObjSkill[da].SkillMapId
        });
    }
    return list;
}

function createListSkill(dataObjSkill) {
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjSkill) {
        list.push({
            label: dataObjSkill[da].SkillName,
            value: dataObjSkill[da].SkillMapId
        });
    } 
    return list;
}

function createListProficiency(dataObjSkill) {
    var list = [];
    list.push({ label: "Select", value: "" });
    for (i = 1; i <= 10; i++) {
        list.push({
            label: i,
            value: i
        });
    } 
    return list;
}

function getSecurityClearanceLookup() {
    var apiUrlSecurityCleareance = GetWebAPIURL() + '/api/Lookup/?name=SecurityClearance';
    var dataSecurityCleareanceObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlSecurityCleareance,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataSecurityCleareanceObj = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataSecurityCleareanceObj;
}

function getWillingToRelocateLookup() {

    var apiUrlWillingToRelocate = GetWebAPIURL() + '/api/Lookup/?name=WillingToRelocate';
    var dataWillingToRelocate;

    //TO get details of willing to relocate lookup details
    $.ajax({
        url: apiUrlWillingToRelocate,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataWillingToRelocate = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataWillingToRelocate;
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

