$(document).ready(function () {

    initJobsOpen();
   
});

function initJobsOpen()
{
    viewModel.btnOpenJobs = ko.observable('+');   
    viewModel.openJobs = ko.observableArray();
    viewModel.editjobDescription = ko.observable();
    viewModel.editjobPosition = ko.observable();
    viewModel.editnumberOfOpening = ko.observable();
    viewModel.editjobOpenDate = ko.observable();
    viewModel.editjobCloseDate = ko.observable();
   
    viewModel.editdataSalary = ko.observable(editcreateListSalary());
    viewModel.editdataWorkType = ko.observable(editcreateListWorkType());

    var dataJobListObj = getJobList();
    var dataObjCompanyInfo = getCompanyLists();
   
    var dataSkillObj = getSkillList();
    var dataPrerequisiteObj = getJobPrequisiteList();
    if (dataJobListObj) {
        for (da in dataJobListObj) {
            var jobLists = new createJobList(dataJobListObj[da], dataObjCompanyInfo, dataSkillObj, dataPrerequisiteObj);
            viewModel.openJobs.push(jobLists);
        }
    }
    viewModel.jobexperience = ko.observableArray();
    for (var i = 1; i <= 10; i++) {
        viewModel.jobexperience.push({
            name: i,
            id: i
        });
    }

    viewModel.jobimportance = ko.observableArray();
    for (var i = 1; i <= 10; i++) {
        viewModel.jobimportance.push({
            name: i,
            id: i
        });
    }


    viewModel.changeProficiency = function (skillObj) {
        setTimeout(function () {
            jsonObjectSkill = ko.toJS(skillObj);
            var dataObjSkill = getJobSkillDetailsById(jsonObjectSkill.skillId);

            var jobSeekerSkillProficiencyObj = {}
            jobSeekerSkillProficiencyObj.SkillMapId = dataObjSkill.SkillMapId;
            jobSeekerSkillProficiencyObj.SkillScore = jsonObjectSkill.val;
            jobSeekerSkillProficiencyObj.SkillImportance = dataObjSkill.SkillImportance;
            jobSeekerSkillProficiencyObj.SkillExperience = dataObjSkill.SkillExperience;
            jobSeekerSkillProficiencyObj.JobId = dataObjSkill.JobId;

            dataObjSkill = JSON.stringify(jobSeekerSkillProficiencyObj);

            var apiUrlSkill = GetWebAPIURL() + '/api/JobSkills?Id=' + jsonObjectSkill.skillId;
            //To insert data into scholarship table
            $.ajax({
                url: apiUrlSkill,
                type: "PUT",
                data: dataObjSkill,

                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }, 100);
    }

}


viewModel.expandOpenJobs = function () {
    if (viewModel.btnOpenJobs() == '+') {
        viewModel.btnOpenJobs('-');
    }
    else {
        viewModel.btnOpenJobs('+');
    }
}
viewModel.editJobs = function (objJobDetails)
{
    objJobDetails.editJobsCheck('1');
}
viewModel.expandJobDetails = function (objJobDetails) {
    if (objJobDetails.btnJobDetails() == '+') {
        objJobDetails.btnJobDetails('-');
    }
    else {
        objJobDetails.btnJobDetails('+');
    }
}
viewModel.expandJobSkillDetails = function (objExpand) {
    if (objExpand.btnSkillList() == '+') {
        objExpand.btnSkillList('-');

    }
    else {
        objExpand.btnSkillList('+');
    }
}
viewModel.deleteJobSkillDetails = function (objSkillDetails) {


    var apiUrlJobSkill = GetWebAPIURL() + '/api/JobSkills?Id=' + objSkillDetails.skillId;
    //To create WorkHistory table
     $.ajax({
         url: apiUrlJobSkill,
         type: "DELETE",         
         contentType: "application/json; charset=utf-8",
         async: false,
         success: function (data) {
             $.each(viewModel.openJobs(), function () {
                 this.skillArray.remove(objSkillDetails);
             });
             objSkillDetails.btnSkillList('+');
         },
         error: function (xhr, error) {
             alert('Error :' + error);
         }
     });
}
viewModel.saveJobSkillDetails = function (objSkillDetails) {
    var jsonObjectSKill = ko.toJS(objSkillDetails);
    var dataobjSkill;
    var jobSkillObj = {}

    jobSkillObj.JobId = jsonObjectSKill.jobId;
    jobSkillObj.SkillMapId = jsonObjectSKill.skillMapId;
    jobSkillObj.SkillScore = jsonObjectSKill.val;
   
    jobSkillObj.SkillImportance = jsonObjectSKill.skillImportance;
    jobSkillObj.SkillExperience = jsonObjectSKill.skillExperience;
   
    if (jsonObjectSKill.requiredSkill) {
        jobSkillObj.Required = 1;
    }
    else {
        jobSkillObj.Required = 0;
    }
   

    dataobjSkill = JSON.stringify(jobSkillObj);

     var apiUrlJobSkill = GetWebAPIURL() + '/api/JobSkills?Id=' + objSkillDetails.skillId;
   
    //To create WorkHistory table
    $.ajax({
        url: apiUrlJobSkill,
        type: "PUT",
        data: dataobjSkill,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            objSkillDetails.btnSkillList('+');
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}
viewModel.cancelJobSkillDetails = function (objSkillDetails) {
    objSkillDetails.btnSkillList('+');
}
viewModel.saveJobDetails = function (objJobDetails) {

    var jsonObjectaddJob = ko.toJS(objJobDetails);
    var dataobjJobList;
    var jobseekerworkExperienceObj = {}
    jobseekerworkExperienceObj.NoOfOpenings = parseInt(jsonObjectaddJob.noOfOpening);
    jobseekerworkExperienceObj.CompanyId = "503df823-4ee6-416f-82cd-cec253985bcc";
    jobseekerworkExperienceObj.JobDescription = jsonObjectaddJob.jobDescription;
    jobseekerworkExperienceObj.StartDate = jsonObjectaddJob.openDate;
    jobseekerworkExperienceObj.EndDate = jsonObjectaddJob.closeDate;
    jobseekerworkExperienceObj.JobPosition = jsonObjectaddJob.jobPosition;

    jobseekerworkExperienceObj.JobViews = 25;
    jobseekerworkExperienceObj.ApplicantAverage = 60;
    jobseekerworkExperienceObj.ApplicantsNumber = 10;
    jobseekerworkExperienceObj.PostingDate = jsonObjectaddJob.postedDate;
    jobseekerworkExperienceObj.PublishId = 1;

    jobseekerworkExperienceObj.JobType = viewModel.editdataWorkType()[objJobDetails.editselectedIndexWorkType()].value;
    jobseekerworkExperienceObj.JobSalary = viewModel.editdataSalary()[objJobDetails.editselectedIndexSalary()].value;


    dataobjJobList = JSON.stringify(jobseekerworkExperienceObj);

    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList?Id=' + objJobDetails.jobId;
    
    //To Update JobList table
    $.ajax({
        url: apiUrlJobList,
        type: "PUT",
        data: dataobjJobList,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            objJobDetails.editJobsCheck('0');
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
    
}
viewModel.cancelJobDetails = function (objJobDetails) {
    objJobDetails.editJobsCheck('0');
}
viewModel.deleteJobDetails = function (objJobDetails) {



    var jsonObjectJob = ko.toJS(objJobDetails);
  


    var deleteJob = confirm("Do you want to delete!");

    if (deleteJob == true) {

        if (jsonObjectJob.jobId) {
            var apiUrlJobList = GetWebAPIURL() + '/api/JobsList?Id=' + objJobDetails.jobId;
           /* $.ajax({
                url: apiUrlJobList,
                type: "DELETE",
                
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.openJobs.remove(objJobDetails);
                   
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });*/
        }
       
    }
}
viewModel.editJobPrerequisiteDetails = function (objPrerequisites)
{
    objPrerequisites.prerequisiteCheck(1);
}

viewModel.savePrerequisitesList = function (objPrerequisites) {
    


    var jsonObjectPrerequisite = ko.toJS(objPrerequisites);
    var dataobjPrerequisite;
    var PrerequisiteObj = {}

    PrerequisiteObj.JobId = objPrerequisites.jobId;
    PrerequisiteObj.PrerequisiteTypeId = objPrerequisites.dataSecondLevelPrerequisite()[objPrerequisites.selectedIndexSecondLevelPrerequisite()].value;

    if (objPrerequisites.requiredPrerequisite()) {
        PrerequisiteObj.Required = 1;
    }
    else {
        PrerequisiteObj.Required = 0;
    }


    dataobjPrerequisite = JSON.stringify(PrerequisiteObj);


    var apiUrlPrerequisite = GetWebAPIURL() + '/api/JobPrerequisite?Id=' + objPrerequisites.prerequisiteId;
    //To create WorkHistory table
    $.ajax({
        url: apiUrlPrerequisite,
        type: "PUT",
        data: dataobjPrerequisite,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            objPrerequisites.prerequisiteCheck(0);
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}
viewModel.cancelPrerequisitesList = function (objPrerequisites) {
  
    objPrerequisites.prerequisiteCheck(0);
}

viewModel.deletePrerequisitesList = function (objPrerequisites) {

    objPrerequisites.prerequisiteCheck(0);

    var apiUrlPrerequisite = GetWebAPIURL() + '/api/JobPrerequisite?Id=' + objPrerequisites.prerequisiteId;
   
    //To create WorkHistory table
    $.ajax({
        url: apiUrlPrerequisite,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            
            $.each(viewModel.openJobs(), function () {
                this.prerequisiteArray.remove(objPrerequisites);
            });
            objPrerequisites.prerequisiteCheck(0);
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });


}


var dataWorkTypeObj = getWorkTypeLookup();
var dataSalaryObj = getSalaryLookup();
function createJobList(objJobList, dataObjCompanyInfo, dataSkillObj, dataPrerequisiteObj)
{
    var self = this;
    
    self.jobPosition = objJobList.JobPosition;
    self.jobViews = objJobList.JobViews;
    self.postedDate = objJobList.PostingDate;
    self.companyName = dataObjCompanyInfo.CompanyName;
    self.city = dataObjCompanyInfo.City;
    self.jobId = objJobList.Id;
    self.btnJobDetails = ko.observable('+');
    self.jobDescription = objJobList.JobDescription;
    self.noOfOpening = ko.observable(objJobList.NoOfOpenings);
    self.openDate = ko.observable(objJobList.StartDate);
    self.closeDate = ko.observable(objJobList.EndDate);
    self.editselectedIndexWorkType = ko.observable(0);
    self.editJobsCheck = ko.observable(0);

    for (da in dataWorkTypeObj) {
        if (objJobList.JobType == dataWorkTypeObj[da].Id) {
            self.editselectedIndexWorkType((parseInt(da) + 1));
        }
    }
    self.editselectedIndexSalary = ko.observable(0);
    for (da in dataSalaryObj) {
        if (objJobList.JobSalary == dataSalaryObj[da].Id) {
            self.editselectedIndexSalary((parseInt(da) + 1));
        }
    }

    self.skillArray = ko.observableArray();
    self.prerequisiteArray = ko.observableArray();
    self.skillname;
    self.categoryName;
    self.specialityName;
    for (da in dataSkillObj) {
       if (dataSkillObj[da].JobId == objJobList.Id)
       {
           var skillLists = new createSkillList(dataSkillObj[da]);
           self.skillArray.push(skillLists);
       }
       
    }

    for (da in dataPrerequisiteObj) {
        if (dataPrerequisiteObj[da].JobId == objJobList.Id) {
            var prerequisiteLists = new createPrerequisiteList(dataPrerequisiteObj[da]);
            self.prerequisiteArray.push(prerequisiteLists);
        }

    }
    
}

function createSkillList(objSkill) {
    var self = this;
    self.val = ko.observable(objSkill.SkillScore);
    self.skillImportance = objSkill.SkillImportance;
    self.skillExperience = objSkill.SkillExperience;
    
    self.skillname = objSkill.SkillName
    self.categoryName = objSkill.CategoryName;
    self.specialityName = objSkill.SpecialityName;

    self.min = ko.observable(0);
    self.max = ko.observable(10);
    self.btnSkillList = ko.observable('+');
    self.requiredSkill = ko.observable();
    self.jobId = objSkill.JobId;
    self.skillMapId = objSkill.SkillMapId;
    self.skillId = objSkill.Id;
}
var dataPrerequisiteObj = getPrequisiteDetails();
function createPrerequisiteList(objPrerequisite)
{
    var self = this;
    self.prerequisiteName = objPrerequisite.PrerequisiteName;
    self.prerequisiteTypeName = objPrerequisite.TypeName;

    self.prerequisiteId = objPrerequisite.Id;
    self.prerequisiteJobId = objPrerequisite.JobId;
    self.prerequisiteCheck = ko.observable(0);

    self.jobId = objPrerequisite.JobId;
    self.selectedIndexPrerequisite = ko.observable(0);
    self.selectedIndexSecondLevelPrerequisite = ko.observable(0);
    self.selectedIndexThirdLevelPrerequisite = ko.observable(0);
    self.requiredPrerequisite = ko.observable();

    self.dataPrerequisite = ko.observable(createListJobPrerequisite());
    self.dataSecondLevelPrerequisite = ko.observable();
    self.dataThirdLevelPrerequisite = ko.observable();


    
    self.selectedIndexPrerequisite.subscribe(function (newValue) {
        var PrerequisiteId = self.dataPrerequisite()[self.selectedIndexPrerequisite()].value;
        if (PrerequisiteId != "") {
            var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + PrerequisiteId;
            var dataSpecialityObj;

            $.ajax({
                url: apiUrlPrerequisite,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.dataSecondLevelPrerequisite(createSecondLevelPrerequisiteLst(data));
                    for (da in data) {
                        if (objPrerequisite.TypeId == data[da].Id) {
                            
                            self.selectedIndexSecondLevelPrerequisite(parseInt(da)+1);
                        }
                    }
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });


    self.selectedIndexSecondLevelPrerequisite.subscribe(function (newValue) {

        var PrerequisiteId = self.dataSecondLevelPrerequisite()[self.selectedIndexSecondLevelPrerequisite()].value;
        if (newValue != "") {
            var apiUrlThirdLevelPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + PrerequisiteId;
            var dataSpecialityObj;

            $.ajax({
                url: apiUrlThirdLevelPrerequisite,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.dataThirdLevelPrerequisite(createThirdLevelPrerequisiteLst(data));
                    for (da in data) {
                        //alert(objPrerequisite.PrerequisiteId);
                        //alert(data[da].Id);
                        if (objPrerequisite.PrerequisiteId == data[da].Id) {
                            
                            self.selectedIndexThirdLevelPrerequisite(parseInt(da)+1);
                        }
                    }
                },
                error: function (xhr, status, error) {
                    alert('Errorskill :' + status);
                }
            });
        }
    });

    if (objPrerequisite.PrerequisiteIndustryId) {
        for (da in dataPrerequisiteObj) {
            if (objPrerequisite.PrerequisiteIndustryId == dataPrerequisiteObj[da].Id) {
                self.selectedIndexPrerequisite(parseInt(da) + 1);
            }
        }
    }
}
var companyId = "503df823-4ee6-416f-82cd-cec253985bcc";
function getJobList() {

    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList/?CompanyId=' + companyId;
    var dataJobListObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlJobList,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataJobListObj = data;
            getUniqueJobSeekerId(data);
            getUniqueJobId(data);
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataJobListObj;
}

function getCompanyLists() {

    var apiUrlCompanyInfo = GetWebAPIURL() + 'api/Company/?companyId=' + companyId;
    var dataObjCompanyInfo;

    $.ajax({
        url: apiUrlCompanyInfo,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjCompanyInfo = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataObjCompanyInfo;
}

function convert(str) {

        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
   
}

var jobSeekerIdArray = [];
function getUniqueJobSeekerId(dataJobSeekerWithSkill) {
    for (da in dataJobSeekerWithSkill) {
        if (jobSeekerIdArray.indexOf(dataJobSeekerWithSkill[da].Id) == -1)
            jobSeekerIdArray.push(dataJobSeekerWithSkill[da].Id);
    }
    
}

function getSkillList() {

    var apiUrlSkill = GetWebAPIURL() + '/api/GetJobSkillsForJobId?jobId=' + jobSeekerIdArray.toString();
    var dataSkillObj;
   
    $.ajax({
        url: apiUrlSkill,
        type: 'GET',
        async: false,
        // headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataSkillObj = data;

        },
        error: function (xhr, status, error) {
            alert('Errorskill :' + status);
        }
    });
    return dataSkillObj;
}

function editcreateListSalary() {

    var dataSalaryObj = getSalaryLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataSalaryObj) {

        list.push({
            label: dataSalaryObj[da].Name,
            value: dataSalaryObj[da].Id
        });
    }
    return list;
}

function editcreateListWorkType() {
    var dataWorkTypeObj = getWorkTypeLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataWorkTypeObj) {
        list.push({
            label: dataWorkTypeObj[da].Name,
            value: dataWorkTypeObj[da].Id
        });
    }
    return list;
}

function getSalaryLookup() {
    var apiUrlSalary = GetWebAPIURL() + '/api/Lookup/?name=Salary';
    var dataSalaryObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlSalary,
        type: 'GET',
        async: false,
        success: function (data) {
            dataSalaryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataSalaryObj;
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

function getJobSkillDetailsById(skillId) {
    var apiUrlSkillDetails = GetWebAPIURL() + '/api/JobSkills/' + skillId;
    var dataObjSkillDetails;
    $.ajax({
        url: apiUrlSkillDetails,
        type: 'GET',
        async: false,
        
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjSkillDetails = data;
        },
        error: function (xhr, status, error) {
            alert('Eroror :' + status);
        }
    });
    return dataObjSkillDetails;
}
var jobIdArray = [];
function getUniqueJobId(dataJobSeekerWithPrerequisite) {
    for (da in dataJobSeekerWithPrerequisite) {
        if (jobIdArray.indexOf(dataJobSeekerWithPrerequisite[da].Id) == -1)
            jobIdArray.push(dataJobSeekerWithPrerequisite[da].Id);
    }

}
function getJobPrequisiteList() {

    var apiUrlPrerequisite = GetWebAPIURL() + '/api/GetJobPrerequisiteForJobId?jobId=' + jobIdArray.toString();;
    var dataPrerequisiteObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlPrerequisite,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataPrerequisiteObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataPrerequisiteObj;
}

function createListJobPrerequisite() {

    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataPrerequisiteObj) {

        list.push({

            label: dataPrerequisiteObj[da].PrerequisiteName,
            value: dataPrerequisiteObj[da].Id
        });
    }
    return list;
}
function getPrequisiteDetails() {

    var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite?parentId=0';
    var dataPrerequisiteObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlPrerequisite,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataPrerequisiteObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataPrerequisiteObj;
}

function createSecondLevelPrerequisiteLst(data) {
    var list = [];
    list.push({ label: "Type", value: "" });
    for (da in data) {
        list.push({
            label: data[da].PrerequisiteName,
            value: data[da].Id
        });
    }
    return list;
}


function createThirdLevelPrerequisiteLst(data) {
    

    var list = [];
    list.push({ label: "Prerequisite", value: "" });
    for (da in data) {
       
        list.push({
            label: data[da].PrerequisiteName,
            value: data[da].Id
        });
    }
    return list;
}
