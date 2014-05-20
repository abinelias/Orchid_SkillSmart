
var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
viewModel.searchJobs = function () {
    worktype = [];
    salary = [];
    industry = [];
    degree = [];
    carrierLevel = [];
    distance = [];
    viewModel.searchCriteria.removeAll();

    if (viewModel.workTypeId() && viewModel.workTypeId() != "") {
        var createSearch = new createsearchCriteria(0);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.industryTypeId() && viewModel.industryTypeId() != "") {
        var createSearch = new createsearchCriteria(1);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.salaryId() && viewModel.salaryId() != "") {
        var createSearch = new createsearchCriteria(4);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexEducationLevel() && viewModel.selectedIndexEducationLevel() != "") {
        var createSearch = new createsearchCriteria(2);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexDistance() && viewModel.selectedIndexDistance() != -1) {
        var createSearch = new createsearchCriteria(3);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexCarrierLevel() && viewModel.selectedIndexCarrierLevel() != -1) {

        var createSearch = new createsearchCriteria(5);
        viewModel.searchCriteria.push(createSearch);
    }
    viewModel.jobCheck('1');
    if (worktype.length != 0 || salary.length != 0 || industry.length != 0 || degree.length != 0 || carrierLevel.length != 0 || distance.length != 0) {
        getFilteredJobsList()
    }
}

var dataobjJobList;
function getFilteredJobsList() {
    var dataObjFilter;
    var JobFilter = {};
    JobFilter.Salary = salary;
    JobFilter.Industry = industry;
    dataObjFilter = JSON.stringify(JobFilter);

    var apiUrlJobFilter = GetWebAPIURL() + '/api/JobFilter?filter=' + dataObjFilter;


    //To get Scholarship details
    $.ajax({
        url: apiUrlJobFilter,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjJobList = data;
            initJobsApplied();
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

var worktype = [];
function addContentForWorkType(i) {
    var self = this;
    self.lookUpId = ko.observable('');
    //self.Name = ko.observable('');

    self.Name = ko.computed(function () {
        for (var j = 0; j < viewModel.WorkType().length; j++) {
            if (viewModel.WorkType()[j].id == viewModel.workTypeId()[i]) {
                // alert(viewModel.WorkType()[j].name);
                return viewModel.WorkType()[j].name;
            }
        }
    }, this);
    self.lookUpId(viewModel.workTypeId()[i]);
    worktype.push(viewModel.workTypeId()[i]);
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


    self.lookUpId(viewModel.dataEducationLevel()[viewModel.selectedIndexCarrierLevel()].value);
    degree.push(viewModel.dataEducationLevel()[viewModel.selectedIndexCarrierLevel()].value);
}

var carrierLevel =[];
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


var dataobjSkillList = getSkillList();
var dataobjJobList = getJobsList();
function initJobsApplied() {
    
    viewModel.jobs = ko.observableArray();

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

