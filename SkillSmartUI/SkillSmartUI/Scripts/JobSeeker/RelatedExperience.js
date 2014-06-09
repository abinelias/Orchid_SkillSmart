var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);

viewModel.whichTemplateToUseRelatedExperience = function (relatedExperienceObj) {
    selectedRelatedExperience = ko.toJS(relatedExperienceObj);
    return selectedRelatedExperience.isEditableRelatedExperience ? "ViewRelatedExperience" : "EditRelatedExperience";
}

viewModel.addFirstRelatedExperience = function (relatedExperienceObj) {
    selectedRelatedExperience = ko.toJS(relatedExperienceObj);
    relatedExperienceObj.btnRelatedExperience("Add More");
    relatedExperienceObj.isEditableRelatedExperience(false);

    var relatedExperience = new createRelatedExperience();
    relatedExperience.deleteCheck('0');
    relatedExperience.isEdit('1');
    relatedExperience.jobSeekerSkillId(selectedRelatedExperience.SkillId);

    relatedExperienceObj.relatedExperienceArray.push(relatedExperience);
}
function getWorkHistoryCompany() {

    var apiUrlWorkHistory = GetWebAPIURL() + '/api/WorkHistory/';
    var dataWorkHistoryObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlWorkHistory,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataWorkHistoryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataWorkHistoryObj;

}

function createRelatedExperience(da) {
    var self = this;
    self.selectedIndexCompanyName = ko.observable(-1);

    self.Id = ko.observable('');
    self.jobSeekerSkillId = ko.observable('');
    self.companyName = ko.observable('').extend({ required: { message: "Company required" } });
    self.position = ko.observable('').extend({ required: { message: "Position required" } });
    self.startDate = ko.observable('');
    self.endDate = ko.observable('');
    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');
    self.errorRelatedExperience = ko.validation.group({ p1: self.companyName, p2: self.position });
    if (da) {
        self.Id(da.Id);
        self.jobSeekerSkillId(da.JobSeekerSkillId);
        self.companyName(da.CompanyName);
        self.position(da.Position);
        self.startDate(da.StartDate);
        self.endDate(da.EndDate);
        self.isEdit('0');
    }
}

function createListWorkHistory() {
    var dataWorkHistoryObj = getWorkHistoryCompany();
    var list = [];
    for (da in dataWorkHistoryObj) {
        list.push({
            label: dataWorkHistoryObj[da].CompanyName,
            value: dataWorkHistoryObj[da].Id
        });
    }

    return list;
}

viewModel.clickButtonSkillRelatedExperience = function (relatedExperienceObj) {
    if (relatedExperienceObj.btnRelatedExperience() == "Add More") {

        var relatedExperience = new createRelatedExperience();
        relatedExperience.deleteCheck('0');
        relatedExperience.isEdit('1');
        relatedExperience.jobSeekerSkillId(selectedReference.SkillId);
        relatedExperienceObj.relatedExperienceArray.splice(0, 0, relatedExperience);
    }

    else {
        relatedExperienceObj.btnRelatedExperience("Add More");
        relatedExperienceObj.isEditableRelatedExperience(false);
    }
}
var currentRelatedExperience;
viewModel.editRelatedExperienceDetails = function (relatedExperienceObj) {
    currentRelatedExperience = ko.toJS(relatedExperienceObj);

    relatedExperienceObj.isEdit('1');
    relatedExperienceObj.deleteCheck('1');
}

viewModel.saveRelatedExperience = function (relatedExperienceObj) {
    if (relatedExperienceObj.companyName.isValid() && relatedExperienceObj.position.isValid()) {
        jsonObjectRelatedExperience = ko.toJS(relatedExperienceObj);

        if (jsonObjectRelatedExperience.Id) {
            var dataObjRelatedExperience;
            var jobSeekerRelatedExperienceObj = {}

            jobSeekerRelatedExperienceObj.JobSeekerSkillId = jsonObjectRelatedExperience.jobSeekerSkillId;
            jobSeekerRelatedExperienceObj.CompanyName = jsonObjectRelatedExperience.companyName;
            jobSeekerRelatedExperienceObj.Position = jsonObjectRelatedExperience.position;
            jobSeekerRelatedExperienceObj.StartDate = convertRelatedExperience(jsonObjectRelatedExperience.startDate);
            jobSeekerRelatedExperienceObj.EndDate = convertRelatedExperience(jsonObjectRelatedExperience.endDate);

            dataObjRelatedExperience = JSON.stringify(jobSeekerRelatedExperienceObj);
        var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience?Id=' + jsonObjectRelatedExperience.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlRelatedExperience,
            type: "PUT",
            data: dataObjRelatedExperience,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                relatedExperienceObj.isEdit('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
            var dataObjRelatedExperience;
            var jobSeekerRelatedExperienceObj = {}

            jobSeekerRelatedExperienceObj.JobSeekerSkillId = jsonObjectRelatedExperience.jobSeekerSkillId;
            jobSeekerRelatedExperienceObj.CompanyName = jsonObjectRelatedExperience.companyName;
            jobSeekerRelatedExperienceObj.Position = jsonObjectRelatedExperience.position;
            jobSeekerRelatedExperienceObj.StartDate = jsonObjectRelatedExperience.startDate;
            jobSeekerRelatedExperienceObj.EndDate = jsonObjectRelatedExperience.endDate;

            dataObjRelatedExperience = JSON.stringify(jobSeekerRelatedExperienceObj);
        var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlRelatedExperience,
            type: "POST",
            data: dataObjRelatedExperience,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                relatedExperienceObj.isEdit('0');
                relatedExperienceObj.Id(data);
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
        if (jsonObjectRelatedExperience.selectedIndexCompanyName > -1) {
            var dataObjSkill = getJobseekerSkillDetailsById(jsonObjectRelatedExperience.jobSeekerSkillId);
            var jobSeekerSkillProficiencyObj = {}
            jobSeekerSkillProficiencyObj.JobSeekerId = dataObjSkill.JobSeekerId;
            jobSeekerSkillProficiencyObj.SkillMapId = dataObjSkill.SkillMapId;
            jobSeekerSkillProficiencyObj.ExperienceId = dataObjSkill.ExperienceId;
            jobSeekerSkillProficiencyObj.SkillAcquiredId = "63ac0887-82d4-43c6-8914-af47af0fab18";
            jobSeekerSkillProficiencyObj.SkillParentCollectionId = viewModel.dataCompanyName()[jsonObjectRelatedExperience.selectedIndexCompanyName].value;
            jobSeekerSkillProficiencyObj.ProficiencyId = dataObjSkill.val;

            dataObjSkill = JSON.stringify(jobSeekerSkillProficiencyObj);
            var apiUrlSkill = GetWebAPIURL() + '/api/JobSeekerSkillList?Id=' + jsonObjectRelatedExperience.jobSeekerSkillId;
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
        }
    }
    else {
        relatedExperienceObj.errorRelatedExperience.showAllMessages();
    }

}

viewModel.cancelRelatedExperience = function (relatedExperienceObj) {
    jsonObjectRelatedExperienceObj = ko.toJS(relatedExperienceObj);

    if (jsonObjectRelatedExperienceObj.Id) {

        relatedExperienceObj.isEdit('0');
        relatedExperienceObj.companyName(currentRelatedExperience.companyName);
        relatedExperienceObj.position(currentRelatedExperience.position);
        relatedExperienceObj.startDate(currentRelatedExperience.startDate);
        relatedExperienceObj.endDate(currentRelatedExperience.endDate);

    }
    else {
        $.each(viewModel.categoryArray(), function () {
            $.each(this.specialityArray(), function () {
                $.each(this.skillArray(), function () {
                    this.relatedExperienceArray.remove(relatedExperienceObj);
                    if (this.relatedExperienceArray().length == 0) {
                        this.relatedExperienceCheck('0');
                        this.isEditableRelatedExperience(true);
                    }
                })
            })
        })
    }
    /*else {
        viewModel.languages.remove(languageObj);
    }

    if (viewModel.languages().length == 0) {
        viewModel.languageCheck('0');
        viewModel.isEditableLanguage(false);
    }*/
}
viewModel.deleteRelatedExperience = function (relatedExperienceObj) {

    jsonObjectRelatedExperience = ko.toJS(relatedExperienceObj);

    var RelatedExperienceDelete = confirm("Do you want to delete!");
    if (RelatedExperienceDelete == true)
    {
        if (jsonObjectRelatedExperience.Id) {
            var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience?Id=' + jsonObjectRelatedExperience.Id;
            //To delete data from Language Table
            $.ajax({
                url: apiUrlRelatedExperience,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    $.each(viewModel.categoryArray(), function () {
                        $.each(this.specialityArray(), function () {
                            $.each(this.skillArray(), function () {
                                this.relatedExperienceArray.remove(relatedExperienceObj);
                                if (this.relatedExperienceArray().length == 0) {
                                    this.relatedExperienceCheck('0');
                                    this.isEditableRelatedExperience(true);
                                }
                            })
                        })
                    })
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
    }
 
}

function convertRelatedExperience(str) {

    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");

}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});