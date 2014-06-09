viewModel.searchJobs = function () {
    employment = [];
    salary = [];
    industry = [];
    degree = [];
    carrierLevel = [];
    distance = [];

    viewModel.searchCriteria.removeAll();

    if (viewModel.employmentTypeId() != "") {

        var createSearch = new createsearchCriteria(0);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.industryTypeId() != "") {
        var createSearch = new createsearchCriteria(1);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.selectedIndexEducationLevel() > 0) {
        var createSearch = new createsearchCriteria(2);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.selectedIndexDistance() > 0) {
        var createSearch = new createsearchCriteria(3);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.salaryId() != "") {
        var createSearch = new createsearchCriteria(4);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.selectedIndexCarrierLevel() > 0) {
        var createSearch = new createsearchCriteria(5);
        viewModel.searchCriteria.push(createSearch);
    }

    viewModel.jobCheck('1');
    if (employment.length != 0 || salary.length != 0 || industry.length != 0 || degree.length != 0 || carrierLevel.length != 0 || distance.length != 0) {
        //initJobSkillScoreCalculation();
        getFilteredJobsList();
    }
}

function createsearchCriteria(i) {
    var self = this;
    self.lookUpName = ko.observable('');
    self.contentArray = ko.observableArray();
    if (i == 0) {
        if (viewModel.employmentTypeId() != "") {

            self.lookUpName('EmploymentType');
            for (var i = 0; i < viewModel.employmentTypeId().length; i++) {
                var addContent = new addContentForEmploymentType(i);
                self.contentArray.push(addContent);
            }
        }
    }
    else if (i == 1) {
        if (viewModel.industryTypeId() != "") {
            self.lookUpName('IndustryType');
            for (var i = 0; i < viewModel.industryTypeId().length; i++) {
                var addContentIndustry = new addContentForIndustry(i);
                self.contentArray.push(addContentIndustry);
            }
        }
    }
    else if (i == 2) {
        if (viewModel.selectedIndexEducationLevel() != -1) {
            self.lookUpName('DegreeType');
            var addContentDegreeType = new addContentForDegree(i);
            self.contentArray.push(addContentDegreeType);
        }
    }
    else if (i == 3) {
        if (viewModel.selectedIndexDistance() != -1) {
            self.lookUpName('Distance');
            var addContentDistance = new addContentForDistance();
            self.contentArray.push(addContentDistance);
        }

    }

    else if (i == 4) {
        if (viewModel.salaryId() != "") {
            self.lookUpName('Salary');
            for (var i = 0; i < viewModel.salaryId().length; i++) {
                var addContentSalary = new addContentForSalary(i);
                self.contentArray.push(addContentSalary);
            }
        }
    }
    else {
        if (viewModel.selectedIndexCarrierLevel() != " ") {
            self.lookUpName('CareerLevel');
            var addContentCarrierLevel = new addContentForCarrierLevel();
            self.contentArray.push(addContentCarrierLevel);
        }
    }
}

var employment = [];
function addContentForEmploymentType(i) {
    var self = this;
    self.lookUpId = ko.observable('');

    self.Name = ko.computed(function () {
        for (var j = 0; j < viewModel.employmentType().length; j++) {
            if (viewModel.employmentType()[j].id == viewModel.employmentTypeId()[i]) {
                return viewModel.employmentType()[j].name;
            }
        }
    }, this);
    self.lookUpId(viewModel.employmentTypeId()[i]);
    employment.push(viewModel.employmentTypeId()[i]);
}

var salary = [];
function addContentForSalary(i) {
    var self = this;
    self.lookUpId = ko.observable('');
    self.Name = ko.observable('');

    self.Name = ko.computed(function () {
        for (var j = 0; j < viewModel.salary().length; j++) {
            if (viewModel.salary()[j].id == viewModel.salaryId()[i]) {
                return viewModel.salary()[j].name;
            }
        }
    }, this);
    self.lookUpId(viewModel.salaryId()[i]);
    salary.push(viewModel.salaryId()[i]);
}

var industry = [];
function addContentForIndustry(i) {
    var self = this;
    self.lookUpId = ko.observable('');
    self.Name = ko.observable('');

    self.Name = ko.computed(function () {
        for (var j = 0; j < viewModel.industryType().length; j++) {
            if (viewModel.industryType()[j].id == viewModel.industryTypeId()[i]) {
                return viewModel.industryType()[j].name;
            }
        }
    }, this);
    self.lookUpId(viewModel.industryTypeId()[i]);
    industry.push(viewModel.industryTypeId()[i]);
}

var degree = [];
function addContentForDegree(i) {
    var self = this;
    self.lookUpId = ko.observable('');
    self.Name = ko.observable('');

    self.Name = ko.computed(function () {
        return viewModel.dataEducationLevel()[viewModel.selectedIndexEducationLevel()].label;
    }, this);


    self.lookUpId(viewModel.dataEducationLevel()[viewModel.selectedIndexEducationLevel()].value);
    degree.push(viewModel.dataEducationLevel()[viewModel.selectedIndexEducationLevel()].value);
}

var carrierLevel = [];
function addContentForCarrierLevel() {
    var self = this;
    self.lookUpId = ko.observable('');
    self.Name = ko.observable('');

    self.Name = ko.computed(function () {
        return viewModel.dataCarrierLevel()[viewModel.selectedIndexCarrierLevel()].label;
    }, this);
    self.lookUpId(viewModel.dataCarrierLevel()[viewModel.selectedIndexCarrierLevel()].value);
    carrierLevel.push(viewModel.dataCarrierLevel()[viewModel.selectedIndexCarrierLevel()].value);
}

var distance = [];
function addContentForDistance() {

    var self = this;
    self.lookUpId = ko.observable('');

    self.Name = ko.computed(function () {
        return viewModel.dataDistance()[viewModel.selectedIndexDistance()].label;
    }, this);
    self.lookUpId(viewModel.dataDistance()[viewModel.selectedIndexDistance()].value);
    distance.push(viewModel.dataDistance()[viewModel.selectedIndexDistance()].value);
}

function getFilteredJobsList() {
    viewModel.jobs.removeAll();
    var dataObjFilter;
    var JobFilter = {};
    JobFilter.Salary = salary;
    JobFilter.Industry = industry;
    JobFilter.EducationalLevel = degree;
    JobFilter.EmployeementType = employment;
    JobFilter.CarrierLevel = carrierLevel;
    dataObjFilter = JSON.stringify(JobFilter);

    var apiUrlJobFilter = GetWebAPIURL() + '/api/JobFilter?filter=' + dataObjFilter;

    //To get Scholarship details
    $.ajax({
        url: apiUrlJobFilter,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            initJobsApplied(data);
            viewModel.listJobs('1');
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });
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

var dataobjSkillList = getSkillList();

function initJobsApplied(dataobjJobList) {
    if (dataobjJobList) {
        for (var i = 0; i < dataobjJobList.length; i++) {
            var listJob = new createJobList(dataobjJobList[i]);
            viewModel.jobs.push(listJob);
        }
    }
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
}

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

function getJobSeekerSavedJobs() {
    var apiUrlJobSeekerSavedJobs = GetWebAPIURL() + '/api/JobSeekerSavedJobs/';
    var dataObjJobSeekerSavedJobs;

    $.ajax({
        url: apiUrlJobSeekerSavedJobs,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobSeekerSavedJobs = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjJobSeekerSavedJobs;
}
