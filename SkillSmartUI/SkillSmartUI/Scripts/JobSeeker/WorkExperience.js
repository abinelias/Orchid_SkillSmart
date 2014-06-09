$(document).ready(function () {
    
    initWorkExperience();
 
});

function getIndustryTypeLookup() {
    var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
    var dataIndustryTypeObj;

    //To get details of Industry lookup
    $.ajax({
        url: apiUrlIndustryType,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        success: function (data) {
            dataIndustryTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataIndustryTypeObj;
}

function getWorkTypeLookup() {
    var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
    var dataWorkTypeObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlWorkType,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        success: function (data) {
            dataWorkTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataWorkTypeObj;
}

function getJobseekerWorkExperience() {
    var dataobjWorkExpereince;
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory/';


    //To get workhistory details from workhistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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
function initWorkExperience() {


    viewModel.disabled = ko.observable(false);
    viewModel.collapsible = ko.observable(false);

    viewModel.WorkType = ko.observableArray();
    viewModel.workHistory = ko.observableArray();
    viewModel.workCheck = ko.observable('0');
    viewModel.workButtonCheck = ko.observable('0');

    viewModel.dataIndustry = ko.observable(createListIndustry());
    viewModel.dataWorkType = ko.observable(createListWorkType());

    var dataIndustryTypeObj = getIndustryTypeLookup();
    var dataWorkTypeObj = getWorkTypeLookup();


    var dataobjWorkExpereince = getJobseekerWorkExperience();
    if (dataobjWorkExpereince.length != 0) {
        viewModel.workCheck('1');
    }


    if (dataobjWorkExpereince) {
        for (var i = 0; i < dataobjWorkExpereince.length; i++) {
            viewModel.workButtonCheck('1');
            var workhistory = new workHistoryCreate(dataobjWorkExpereince[i]);
            viewModel.workHistory.push(workhistory);

        }
    }
}

function createListIndustry() {

    var dataIndustryTypeObj = getIndustryTypeLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataIndustryTypeObj) {
        list.push({
            label: dataIndustryTypeObj[da].Name,
            value: dataIndustryTypeObj[da].Id
        });
    }
    return list;
}

function createListWorkType() {
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

var dataIndustryTypeObj = getIndustryTypeLookup();
var dataWorkTypeObj = getWorkTypeLookup();

function workHistoryCreate(objWork) {

    var self = this;
    self.companyName = ko.observable('').extend({ required: { message: "Company Name  required" } });
    self.currentPosition = ko.observable('').extend({ required: { message: "Current Position  required" } });
    self.startDate = ko.observable('').extend({ required: { message: "startDate  required" } });
    self.endDate = ko.observable('').extend({ required: { message: "endDate  required" } });
    self.companyLocation = ko.observable('').extend({ required: { message: "Company Location required" } });
    self.currentSalary = ko.observable('').extend({ required: { message: "CurrentSalary required" } });
    self.salaryType = ko.observable('Annually');
    self.selectedIndexIndustry = ko.observable(0).extend({ required: { message: "select industry  required" } });
    self.selectedIndexWorkType = ko.observable(0).extend({ required: { message: "select work  required" } });

    self.jobDescription = ko.observable('').extend({ required: { message: "Job Description required" } });
    self.jobSeekerId = ko.observable();
    self.isEditWork = ko.observable('0');

    self.deleteCheck = ko.observable('1');
    self.btnSkill = ko.observable('+');


    self.workHistoryId = ko.observable('');

    self.currentlyWorking = ko.observable(false);

    self.errorWork = ko.validation.group({ p1: self.companyName, p2: self.currentPosition, p3: self.startDate, p4: self.endDate, p5: self.companyLocation, p7: self.currentSalary, p8: self.selectedIndexIndustry, p9: self.selectedIndexWorkType, p10: self.jobDescription });
    self.errorCheckWork = ko.observable('0');
    self.errorCheckIndustry = ko.observable('0');
    if (objWork) {
        self.companyName(objWork.CompanyName);
        self.currentPosition(objWork.EndingPosition);
        self.startDate(objWork.StartDate);
        self.endDate(objWork.EndDate);
        self.companyLocation(objWork.CompanyLocation);
        self.currentSalary(objWork.EndingSalary);
        self.salaryType(objWork.SalaryType);

        self.jobDescription(objWork.JobDuties);
        self.workHistoryId(objWork.Id);

        for (da in dataIndustryTypeObj) {
            if (objWork.IndustryId == dataIndustryTypeObj[da].Id) {
                self.selectedIndexIndustry((parseInt(da) + 1));
            }
        }

        for (da in dataWorkTypeObj) {
            if (objWork.WorkTypeId == dataWorkTypeObj[da].Id) {
                self.selectedIndexWorkType((parseInt(da) + 1));
            }
        }
        self.isEditWork('0');
        if (objWork.EndDate == 'present') {
            self.currentlyWorking(true);
        }
    }
    self.industryTypeName = ko.computed(function () {
        return viewModel.dataIndustry()[self.selectedIndexIndustry()].label;
    });
    self.workTypeName = ko.computed(function () {
        return viewModel.dataWorkType()[self.selectedIndexWorkType()].label;
    });

    self.currentlyWorking.subscribe(function (newValue) {
        if (self.currentlyWorking() == true) {
            $("#end_Date").hide();

        }
    });

}

viewModel.addfirstWorkExp = function () {
    var workhistory = new workHistoryCreate();
    workhistory.isEditWork('1');
    workhistory.deleteCheck('0')

    viewModel.workHistory.push(workhistory);

    viewModel.workCheck('1');
}

viewModel.addMoreWorkHistory = function () {

    var workhistory = new workHistoryCreate();
    workhistory.isEditWork('1');
    workhistory.deleteCheck('0');
    viewModel.workHistory.splice(0, 0, workhistory);
    //document.getElementById("addMoreWorkHistory").disabled = true;

    viewModel.workButtonCheck(0);

}

viewModel.saveWorkExperience = function (workExperienceobj) {
   
    if (workExperienceobj.companyName.isValid() && workExperienceobj.companyLocation.isValid() && workExperienceobj.currentPosition.isValid() && workExperienceobj.startDate.isValid()  && workExperienceobj.jobDescription.isValid() && workExperienceobj.selectedIndexWorkType() > 0 && workExperienceobj.selectedIndexWorkType() > 0) {
        
        viewModel.workButtonCheck(1);
       
        
        var jsonObjectWorkExperience = ko.toJS(workExperienceobj);
        var jsonObjectVM = ko.toJS(viewModel);

        if (jsonObjectWorkExperience.workHistoryId) {
            var dataobjWorkExpereince;
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.CompanyName = jsonObjectWorkExperience.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObjectWorkExperience.currentPosition;
            jobseekerworkExperienceObj.StartDate = convert(jsonObjectWorkExperience.startDate);
            jobseekerworkExperienceObj.EndDate = convert(jsonObjectWorkExperience.endDate);

            jobseekerworkExperienceObj.CompanyLocation = jsonObjectWorkExperience.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObjectWorkExperience.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObjectWorkExperience.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObjectWorkExperience.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = viewModel.dataWorkType()[workExperienceobj.selectedIndexWorkType()].value;
            jobseekerworkExperienceObj.IndustryId = viewModel.dataIndustry()[workExperienceobj.selectedIndexIndustry()].value;

            if (jsonObjectWorkExperience.currentlyWorking) {

                jobseekerworkExperienceObj.EndDate = "present";
                jsonObjectWorkExperience.endDate = "present";
            }
            else {
                
                jobseekerworkExperienceObj.EndDate = convert(jsonObjectWorkExperience.endDate);
            }
            
            
            dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);


        var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?Id=' + jsonObjectWorkExperience.workHistoryId;

        //To update Workhistory table
        $.ajax({
            url: apiUrlWorkExperience,
            type: "PUT",
            data: dataobjWorkExpereince,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                workExperienceobj.isEditWork('0');
                workExperienceobj.startDate(convert(jsonObjectWorkExperience.startDate));
                workExperienceobj.endDate(convert(jsonObjectWorkExperience.endDate));


            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
    else {
            var dataobjWorkExpereince;
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.CompanyName = jsonObjectWorkExperience.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObjectWorkExperience.currentPosition;
            jobseekerworkExperienceObj.StartDate = convert(jsonObjectWorkExperience.startDate);
            jobseekerworkExperienceObj.EndDate = convert(jsonObjectWorkExperience.endDate);

            jobseekerworkExperienceObj.CompanyLocation = jsonObjectWorkExperience.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObjectWorkExperience.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObjectWorkExperience.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObjectWorkExperience.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = viewModel.dataWorkType()[workExperienceobj.selectedIndexWorkType()].value;
            jobseekerworkExperienceObj.IndustryId = viewModel.dataIndustry()[workExperienceobj.selectedIndexIndustry()].value;
            if (jsonObjectWorkExperience.currentlyWorking) {
                jobseekerworkExperienceObj.EndDate = "present";
                jsonObjectWorkExperience.endDate = "present";
            }
            else {
                jobseekerworkExperienceObj.EndDate = convert(jsonObjectWorkExperience.endDate);
            }

            dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
        var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory/';

        //To create WorkHistory table
        $.ajax({
            url: apiUrlWorkExperience,
            type: "POST",
            data: dataobjWorkExpereince,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                workExperienceobj.workHistoryId(data);
                workExperienceobj.isEditWork('0');
                workExperienceobj.startDate(convert(jsonObjectWorkExperience.startDate));
                workExperienceobj.endDate(convert(jsonObjectWorkExperience.endDate));
                viewModel.workButtonCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
        workExperienceobj.errorCheckWork('0');
        workExperienceobj.errorCheckIndustry('0');
    }
    else {
        workExperienceobj.errorWork.showAllMessages();
        if (workExperienceobj.selectedIndexIndustry() <= 0) {
            workExperienceobj.errorCheckIndustry('1');
        }
        else { workExperienceobj.errorCheckIndustry('0'); }

        if (workExperienceobj.selectedIndexWorkType() <= 0) {
            workExperienceobj.errorCheckWork('1');
        }
        else { workExperienceobj.errorCheckWork('0'); }
    }
}

var SelectedWorkExperience = [];

viewModel.cancelWorkExperience = function (workExperienceobj) {

    var jsonObjectworkExperience = ko.toJS(workExperienceobj);
    if (jsonObjectworkExperience.workHistoryId) {

        workExperienceobj.isEditWork('0');
    }
    else {
        viewModel.workHistory.remove(workExperienceobj);
    }

    if (viewModel.workHistory().length == 0) {
        viewModel.workCheck('0');
    }
    else {
        viewModel.workButtonCheck(1);
    }
    workExperienceobj.errorCheckWork('0');
    workExperienceobj.errorCheckIndustry('0');

    for (var i = 0; i < SelectedWorkExperience.length; i++) {

        if (SelectedWorkExperience[i].workHistoryId == workExperienceobj.workHistoryId()) {

            workExperienceobj.companyName(SelectedWorkExperience[i].companyName);
            workExperienceobj.currentPosition(SelectedWorkExperience[i].currentPosition);
            workExperienceobj.selectedIndexIndustry(SelectedWorkExperience[i].selectedIndexIndustry);
            workExperienceobj.selectedIndexWorkType(SelectedWorkExperience[i].selectedIndexWorkType);
            workExperienceobj.companyLocation(SelectedWorkExperience[i].companyLocation);
            workExperienceobj.jobDescription(SelectedWorkExperience[i].jobDescription);
            workExperienceobj.salaryType(SelectedWorkExperience[i].salaryType);
            workExperienceobj.currentSalary(SelectedWorkExperience[i].currentSalary);
            workExperienceobj.startDate(SelectedWorkExperience[i].startDate);
            workExperienceobj.endDate(SelectedWorkExperience[i].endDate);
        }

    }
}

viewModel.editWorkHistoryDetails = function (workExperienceobj) {


    var SelectedWorkExperienceobj = ko.toJS(workExperienceobj);
    SelectedWorkExperience.push(SelectedWorkExperienceobj);
    workExperienceobj.isEditWork('1');
    workExperienceobj.deleteCheck('1');
}


viewModel.deleteWorkExperience = function (workExperienceobj) {
    var jsonObjectWorkExperience = ko.toJS(workExperienceobj);
    var jsonObjectVM = ko.toJS(viewModel);

   
    var deleteWork = confirm("Do you want to delete!");
   
    if (deleteWork == true) {

        if (jsonObjectWorkExperience.workHistoryId) {
            var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?Id=' + jsonObjectWorkExperience.workHistoryId;
            $.ajax({
                url: apiUrlWorkExperience,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.workHistory.remove(workExperienceobj);
                    if (viewModel.workHistory().length == 0) {
                        viewModel.workCheck('0');
                        viewModel.workButtonCheck('0');
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            viewModel.workHistory.remove(workExperienceobj);
        }
    }
}


viewModel.expandWorkSkill = function (workExperienceobj) {
    if (workExperienceobj.btnSkill() == '+') {
        workExperienceobj.btnSkill('-');
    }
    else {
        workExperienceobj.btnSkill('+');
    }
}

function convert(str) {

    if (str == 'present') {
        return str;
    }
    else {

        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    }
}
ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});

function AddSkills(workHistoryId, acquiredId) {
  //  alert(userId);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&acquiredId=" + acquiredId + "&workHistoryId" + workHistoryId);
    $('#ManageHoldingsDiv').dialog(
        {
            open: function () {
                $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").css("background-color", "#C4E1F1");
            },
            width: 950,
            minWidth: 700,
            minHeight: 380,
            modal: true,
            hideTitleBar: false,
            resizable: true,
            title: "Add Skill",
            closeOnEscape: true,
            close: function (event, ui) { $(this).dialog('destroy'); },
            buttons: {
                'Close': function (ev, ui) {
                    $(this).dialog('destroy');
                    window.location.reload()
                }
            }
        });

    $("#ManageHoldingsFrame").show();
}