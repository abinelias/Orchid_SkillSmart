$(document).ready(function () {

    initWorkExperience();

});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);


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

function getJobseekerWorkExperience() {
    var dataobjWorkExpereince;
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?jobSeekerId=' + userId;


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
    self.companyLocation = ko.observable('').extend({ required: { message: "companyLocation required" } });
    self.currentSalary = ko.observable('').extend({ required: { message: "currentSalary required" } });
    self.salaryType = ko.observable('');
    self.selectedIndexIndustry = ko.observable(0).extend({ required: { message: "select industry  required" } });
    self.selectedIndexWorkType = ko.observable(0).extend({ required: { message: "select work  required" } });

    self.jobDescription = ko.observable('').extend({ required: { message: "jobDescription required" } });
    self.jobSeekerId = ko.observable(userId);
    self.isEditWork = ko.observable('0');

    self.deleteCheck = ko.observable('1');



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
        self.jobSeekerId(objWork.JobSeekerId);
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
    document.getElementById("addMoreWorkHistory").disabled = true;

}

viewModel.saveWorkExperience = function (workExperienceobj) {
    if (workExperienceobj.companyName.isValid() && workExperienceobj.companyLocation.isValid() && workExperienceobj.currentPosition.isValid() && workExperienceobj.startDate.isValid() && workExperienceobj.endDate.isValid() && workExperienceobj.jobDescription.isValid() && workExperienceobj.selectedIndexWorkType() > 0 && workExperienceobj.selectedIndexWorkType() > 0) {
        if (viewModel.workButtonCheck() == 1) {
            document.getElementById("addMoreWorkHistory").disabled = false;
        }

        var jsonObjectWorkExperience = ko.toJS(workExperienceobj);
        var jsonObjectVM = ko.toJS(viewModel);

        if (jsonObjectWorkExperience.workHistoryId) {
            var dataobjWorkExpereince;
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.JobSeekerId = jsonObjectWorkExperience.jobSeekerId;
            jobseekerworkExperienceObj.CompanyName = jsonObjectWorkExperience.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObjectWorkExperience.currentPosition;
            jobseekerworkExperienceObj.StartDate = convert(jsonObjectWorkExperience.startDate);

            jobseekerworkExperienceObj.CompanyLocation = jsonObjectWorkExperience.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObjectWorkExperience.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObjectWorkExperience.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObjectWorkExperience.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = viewModel.dataWorkType()[workExperienceobj.selectedIndexWorkType()].value;
            jobseekerworkExperienceObj.IndustryId = viewModel.dataIndustry()[workExperienceobj.selectedIndexIndustry()].value;

            if (jsonObjectWorkExperience.currentlyWorking) {

                jobseekerworkExperienceObj.EndDate = "present";
                workExperienceobj.endDate = "present";

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
            jobseekerworkExperienceObj.JobSeekerId = jsonObjectVM.jobseekerId;
            jobseekerworkExperienceObj.CompanyName = jsonObjectWorkExperience.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObjectWorkExperience.currentPosition;
            jobseekerworkExperienceObj.StartDate = convert(jsonObjectWorkExperience.startDate);
            jobseekerworkExperienceObj.CompanyLocation = jsonObjectWorkExperience.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObjectWorkExperience.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObjectWorkExperience.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObjectWorkExperience.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = viewModel.dataWorkType()[workExperienceobj.selectedIndexWorkType()].value;
            jobseekerworkExperienceObj.IndustryId = viewModel.dataIndustry()[workExperienceobj.selectedIndexIndustry()].value;
            if (jsonObjectWorkExperience.currentlyWorking) {
                jobseekerworkExperienceObj.EndDate = "present";
                workExperienceobj.endDate = "present";
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

var SelectedWorkExperienceobj;

viewModel.cancelWorkExperience = function (workExperienceobj) {


    if (viewModel.workButtonCheck() == 1) {
        document.getElementById("addMoreWorkHistory").disabled = false;
    }
    else {
        viewModel.workCheck('0');
    }
    var jsonObjectworkExperience = ko.toJS(workExperienceobj);
    if (jsonObjectworkExperience.workHistoryId) {
        workExperienceobj.companyName(SelectedWorkExperienceobj.companyName);
        workExperienceobj.currentPosition(SelectedWorkExperienceobj.currentPosition);
        workExperienceobj.selectedIndexIndustry(selectedIndustry);
        workExperienceobj.selectedIndexWorkType(selectedWork);
        workExperienceobj.companyLocation(SelectedWorkExperienceobj.companyLocation);
        workExperienceobj.jobDescription(SelectedWorkExperienceobj.jobDescription);
        workExperienceobj.salaryType(SelectedWorkExperienceobj.salaryType);
        workExperienceobj.currentSalary(SelectedWorkExperienceobj.currentSalary);
        workExperienceobj.startDate(SelectedWorkExperienceobj.startDate);
        workExperienceobj.endDate(SelectedWorkExperienceobj.endDate);
        workExperienceobj.isEditWork('0');
    }
    else {
        viewModel.workHistory.remove(workExperienceobj);
    }
    SelectedWorkExperienceobj = "";
    workExperienceobj.errorCheckWork('0');
    workExperienceobj.errorCheckIndustry('0');
}
var selectedIndustry;
var selectedWork;
viewModel.editWorkHistoryDetails = function (workExperienceobj) {
    selectedIndustry = workExperienceobj.selectedIndexIndustry();
    selectedWork = workExperienceobj.selectedIndexWorkType();

    SelectedWorkExperienceobj = ko.toJS(workExperienceobj);

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

function AddSkills(workHistoryId, acquiredId, userId) {
    //  alert(userId);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&userid=" + userId + "&acquiredId=" + acquiredId + "&workHistoryId" + workHistoryId);
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
                'Close': function () {

                    $(this).dialog('destroy');
                }
            }
        });

    $("#ManageHoldingsFrame").show();
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});
