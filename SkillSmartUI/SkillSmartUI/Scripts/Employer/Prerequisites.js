$(document).ready(function () {

    initPrerequisites();
});



function initPrerequisites()
{
    viewModel.prerequisiteCheck = ko.observable('0');

    viewModel.isEditableJobPrerequisites = ko.observable(false);

    //viewModel.selectedIndexPrerequisite = ko.observable(0);

  /*  viewModel.dataPrerequisite = ko.observable(createListPrerequisite());
    viewModel.dataFirstLevelPrerequisite = ko.observable();
    viewModel.dataSecondLevelPrerequisite = ko.observable();*/

    viewModel.prerequisiteList = ko.observableArray();
    viewModel.btnPrerequisite = ko.observable("Edit");
    viewModel.addMorePrerequisiteCheck = ko.observable('1');

    viewModel.JobId = ko.observable();

    viewModel.saveJobCheck = ko.observable(0);

}


function createPrerequisite(objPrerequisite) {
  
    var self = this;
    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');

    self.selectedIndexPrerequisite = ko.observable(0);
    self.selectedIndexSecondLevelPrerequisite = ko.observable(0);
    self.selectedIndexThirdLevelPrerequisite = ko.observable(0);
    self.requiredPrerequisite = ko.observable();


    self.Id = ko.observable('');
   
    self.dataPrerequisite = ko.observable(createListPrerequisite());
    self.dataSecondLevelPrerequisite = ko.observable();
    self.dataThirdLevelPrerequisite = ko.observable();
    self.selectedIndexPrerequisite.subscribe(function (newValue) {
        var PrerequisiteId = self.dataPrerequisite()[self.selectedIndexPrerequisite()].value;
        if (PrerequisiteId != "") {
            var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + PrerequisiteId;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlPrerequisite,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.dataSecondLevelPrerequisite(createSecondLevelPrerequisiteLst(data));
                    self.PrerequisiteSecondName = ko.computed(function () {
                        return self.dataSecondLevelPrerequisite()[self.selectedIndexSecondLevelPrerequisite()].label;
                    }, this);
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

            var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + PrerequisiteId;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlPrerequisite,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    self.dataThirdLevelPrerequisite(createThirdLevelPrerequisiteLst(data));
                    self.PrerequisiteName = ko.computed(function () {

                        return self.dataThirdLevelPrerequisite()[self.selectedIndexThirdLevelPrerequisite()].label;
                    }, this);
                },
                error: function (xhr, status, error) {
                    alert('Errorskill :' + status);
                }
            });
        }
    });
   
   
    
}



viewModel.clickButtonPrerequisites = function () {

    if (viewModel.btnPrerequisite() == "Add More") {

        var prerequisite = new createPrerequisite();

        prerequisite.isEdit('1');
        prerequisite.deleteCheck('0');
        viewModel.prerequisiteList.splice(0, 0, prerequisite);
        viewModel.addMorePrerequisiteCheck('0');

     }

    else {
       

        viewModel.addMorePrerequisiteCheck('1');
        viewModel.btnPrerequisite("Add More");
        viewModel.isEditableJobPrerequisites(true);
    }
}

viewModel.addFirstPrerequisite = function () {
    
  
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
    
    if (viewModel.jobPosition() != null && viewModel.jobDescription() != null)
    {
       
        var prerequisite = new createPrerequisite();
     
        prerequisite.isEdit('1');
        prerequisite.deleteCheck('0');
        viewModel.prerequisiteList.push(prerequisite);
      
        viewModel.isEditableJobPrerequisites(true);
        
         $.ajax({
        url: apiUrlJobList,
        type: "POST",
        data: dataobjJobList,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
         viewModel.JobId(data);
           
             viewModel.saveJobCheck(1);
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
    
    }
    else
    {
        alert("enter value");
    }
    //alert(dataobjJobList);

    //To create WorkHistory table
    
}

viewModel.savePrerequisites = function (objPrerequisite)
{
    objPrerequisite.isEdit('0');
    viewModel.addMorePrerequisiteCheck('1');
    viewModel.prerequisiteCheck('1');

    //alert(viewModel.JobId());
    //alert(objPrerequisite.dataSecondLevelPrerequisite()[objPrerequisite.selectedIndexSecondLevelPrerequisite()].value);

    var jsonObjectWorkExperience = ko.toJS(objPrerequisite);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}

    jobseekerworkExperienceObj.JobId = viewModel.JobId();
    jobseekerworkExperienceObj.PrerequisiteTypeId = objPrerequisite.dataThirdLevelPrerequisite()[objPrerequisite.selectedIndexThirdLevelPrerequisite()].value;

    if (objPrerequisite.requiredPrerequisite()) {
        jobseekerworkExperienceObj.Required = 1;
    }
    else {
        jobseekerworkExperienceObj.Required = 0;
    }


    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
   


    var apiUrlWorkExperience = GetWebAPIURL() + '/api/JobPrerequisite/';
    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjWorkExpereince,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}

var SelectedPrerequisite = [];

viewModel.editPrerequisiteDetails = function (objPrerequisite) {

   
    objPrerequisite.isEdit('1');
    objPrerequisite.deleteCheck('1');
       

    var selectedPrerequisiteObj = ko.toJS(objPrerequisite);
    SelectedPrerequisite.push(selectedPrerequisiteObj);
    

}

viewModel.cancelPrerequisites = function (objPrerequisite)
{
    objPrerequisite.isEdit('0');


   /* var jsonObjectPrerequisite = ko.toJS(objPrerequisite);
    if (jsonObjectPrerequisite.Id) {

        objPrerequisite.isEdit('0');
    }
    else {
        viewModel.prerequisiteList.remove(objPrerequisite);
    }

    if (viewModel.prerequisiteList().length == 0) {
        //viewModel.workCheck('0');
    }
    else {
        //viewModel.workButtonCheck(1);
    }
    

    for (var i = 0; i < SelectedPrerequisite.length; i++) {

        if (SelectedPrerequisite[i].Id == objPrerequisite.Id()) {

           
            objPrerequisite.selectedIndexPrerequisite(SelectedPrerequisite[i].selectedIndexPrerequisite);
            objPrerequisite.selectedIndexFirstLevelPrerequisite(SelectedPrerequisite[i].selectedIndexSecondLevelPrerequisite);
            objPrerequisite.selectedIndexSecondLevelPrerequisite(SelectedPrerequisite[i].selectedIndexSecondLevelPrerequisite);

        }

    }*/
}

viewModel.deletePrerequisites = function (objPrerequisite)
{ }

viewModel.whichTemplateToUsePrerequisites = function () {
    return viewModel.isEditableJobPrerequisites() ? "EditPrerequisites" : "ViewPrerequisites";
}

function getPrequisiteList() {

    var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite?parentId=0';
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
function createSecondLevelPrerequisiteLst(data) {
    var list = [];
    list.push({ label: "Select", value: "" });

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
    list.push({ label: "Select", value: "" });
    for (da in data) {
        list.push({

            label: data[da].PrerequisiteName,
            value: data[da].Id
        });
    }
    return list;
}

function createListPrerequisite() {
    var dataPrerequisiteObj = getPrequisiteList();

    var list = [];
    list.push({ label: "Prerequisite", value: "" });
    for (da in dataPrerequisiteObj) {      

        list.push({
            label: dataPrerequisiteObj[da].PrerequisiteName,
            value: dataPrerequisiteObj[da].Id
        });
    }
    return list;
}