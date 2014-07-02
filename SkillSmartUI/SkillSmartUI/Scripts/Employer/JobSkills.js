$(document).ready(function () {
    initJobSkills();
});

function initJobSkills()
{
    viewModel.skillCheck = ko.observable(0);

    viewModel.dataCompetency = ko.observable(createListCompetency());
    viewModel.selectedIndexCompetency = ko.observable(0);
   
    viewModel.addCompetencyCheck = ko.observable('0');
    viewModel.competencyList = ko.observableArray();

    viewModel.dataExperience = ko.observable(createListExperience());
    viewModel.dataImportance = ko.observable(createListImportance());

    viewModel.experience = ko.observableArray();
    for (var i = 1; i <= 10; i++) {
        viewModel.experience.push({

            name: i,
            id: i
        });
    }

    viewModel.importance = ko.observableArray();
    for (var i = 1; i <= 10; i++) {
        viewModel.importance.push({

            name: i,
            id: i
        });
    }
}


function createCompetency(selectedCompetency)
{
    var self = this;
    self.competency = ko.observable();
    self.skillArray = ko.observableArray();
    self.addSkillCheck = ko.observable('0');
    self.CompetencyName = ko.computed(function () {
        return viewModel.dataCompetency()[selectedCompetency].label;
    }, this);

    self.competencyId = ko.computed(function () {
        return viewModel.dataCompetency()[selectedCompetency].value;
    }, this);

   self.addSkill = function (objCompetency)
   {
       var objSpeciality = ko.toJS(objCompetency);
       self.dataSkill = ko.observable(createListSkill(objSpeciality.competencyId));
       self.selectedIndexSkill = ko.observable(0);
       objCompetency.addSkillCheck('1');
   }

   self.saveSkill = function (objSkill) {
       var newSkill = new createSkill(self.dataSkill(), self.selectedIndexSkill());
       self.skillArray.push(newSkill);
       objSkill.addSkillCheck('0');
      
   }
}

function createSkill(dataSkill, selectedIndexSkill) {
    var self = this;
   

    self.skillExperience = ko.observable();
    self.skillImportance = ko.observable();
    self.val = ko.observable();
    self.min = ko.observable(0);
    self.max = ko.observable(10);

    self.requiredSkill = ko.observable();
    self.btnSkillList = ko.observable('+');

    self.selectedIndexExperience = ko.observable(0);
    self.selectedIndexImportance = ko.observable(0);

    self.skillMapId = ko.computed(function () {
        return dataSkill[selectedIndexSkill].value;
    }, this);
    self.skillName = ko.computed(function () {
        return dataSkill[selectedIndexSkill].label;
    }, this);
   
}
viewModel.addCompetency = function ()
{
    viewModel.addCompetencyCheck('1');
}

viewModel.saveCompetency = function () {
    viewModel.addCompetencyCheck('0');
    var specility = new createCompetency(viewModel.selectedIndexCompetency());
    viewModel.competencyList.push(specility);
}

viewModel.expandSkillDetails = function (objExpand)
{
    if (objExpand.btnSkillList() == '+') {
        objExpand.btnSkillList('-');
        
    }
    else {
        objExpand.btnSkillList('+');
    }
}

viewModel.deleteSkillDetails = function ()
{ }

viewModel.saveSkillDetails = function (skillObj)
{
   

    var jsonObjectSKill = ko.toJS(skillObj);
  //  alert(JSON.stringify(jsonObjectSKill));

    var dataobjSkill;
    var jobSkillObj = {}
    
    jobSkillObj.JobId = viewModel.JobId();
    jobSkillObj.SkillMapId = skillObj.skillMapId();
    jobSkillObj.SkillScore = skillObj.val();
   
    jobSkillObj.SkillImportance = skillObj.selectedIndexImportance();
    jobSkillObj.SkillExperience = skillObj.selectedIndexExperience();

    if (skillObj.requiredSkill()) {
        jobSkillObj.Required = 1;
    }
    else {
        jobSkillObj.Required = 0;
    }


    dataobjSkill = JSON.stringify(jobSkillObj);
   // alert(dataobjSkill);

    var apiUrlWorkExperience = GetWebAPIURL() + '/api/JobSkills/';
    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjSkill,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            skillObj.btnSkillList('+');
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
    
}

viewModel.cancelSkillDetails = function (skillObj)
{
    skillObj.btnSkillList('+');
}

viewModel.addFirstSkill = function ()
{
    

    if (viewModel.saveJobCheck() == 0) {
        if (viewModel.jobPosition() != null && viewModel.jobDescription() != null) {
            viewModel.addCompetencyCheck('1');
            viewModel.skillCheck('1');
            var today = new Date();
            var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var datePosted = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();

            var jsonObjectaddJob = ko.toJS(viewModel);
            var dataobjJobList;
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.NoOfOpenings = jsonObjectaddJob.numberOfOpening;
            jobseekerworkExperienceObj.CompanyId = "503df823-4ee6-416f-82cd-cec253985bcc";
            jobseekerworkExperienceObj.JobDescription = jsonObjectaddJob.jobDescription;
            jobseekerworkExperienceObj.StartDate = jsonObjectaddJob.jobOpenDate;
            jobseekerworkExperienceObj.EndDate = jsonObjectaddJob.jobCloseDate;
            jobseekerworkExperienceObj.JobPosition = jsonObjectaddJob.jobPosition;

            jobseekerworkExperienceObj.JobViews = 25;
            jobseekerworkExperienceObj.ApplicantAverage = 60;
            jobseekerworkExperienceObj.ApplicantsNumber = 10;
            jobseekerworkExperienceObj.PostingDate = datePosted;
            jobseekerworkExperienceObj.PublishId = 1;
            jobseekerworkExperienceObj.JobType = viewModel.dataWorkType()[viewModel.selectedIndexWorkType()].value;
            jobseekerworkExperienceObj.JobSalary = viewModel.dataSalary()[viewModel.selectedIndexSalary()].value;


            dataobjJobList = JSON.stringify(jobseekerworkExperienceObj);
            var apiUrlJobList = GetWebAPIURL() + '/api/JobsList/';
            //alert(dataobjJobList);

            //To create WorkHistory table
            $.ajax({
                url: apiUrlJobList,
                type: "POST",
                data: dataobjJobList,

                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.JobId(data);


                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            alert("enter value");
        }
    }
    else {

        viewModel.addCompetencyCheck('1');
        viewModel.skillCheck('1');
    }
   
}

var parentid = "31ce822c-cebb-433e-91cd-16834ec4d8c4";
function getCategoryList() {
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

function getSpecialityList(newValue)
{

    var apiUrlSkill = GetWebAPIURL() + '/api/SkillMap/?specialityId=' + newValue;
    var dataSkillObj;

    //To get State for lookup
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

function createListSkill(objSpecialityId) {

    
    var dataSkillObj = getSpecialityList(objSpecialityId);
    
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataSkillObj) {

        list.push({

            label: dataSkillObj[da].SkillName,
            value: dataSkillObj[da].SkillMapId
        });
    }
    return list;
}

function createListCompetency() {
    var dataCategoryObj = getCategoryList();

    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataCategoryObj) {

        list.push({

            label: dataCategoryObj[da].CategoryName,
            value: dataCategoryObj[da].Id
        });
    }
    return list;
}



function createListExperience() {
    var list = [];
    list.push({ label: "Select", value: "" });
    for (var i = 1; i <= 10; i++) {
        list.push({

            label: i,
            value: i
        });
    }

    return list;
}

function createListImportance() {
    var list = [];
    list.push({ label: "Select", value: "" });
    for (var i = 1; i <= 10; i++) {
        list.push({

            label: i,
            value: i
        });
    }
    return list;
}

