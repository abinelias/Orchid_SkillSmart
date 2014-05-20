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

function createRelatedExperience(da) {
    var self = this;
    self.Id = ko.observable('');
    self.JobSeekerId = ko.observable(userId);
    self.jobSeekerSkillId = ko.observable('');
    self.companyName = ko.observable('');
    self.position = ko.observable('');
    self.startDate = ko.observable('');
    self.endDate = ko.observable('');
    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');
    if (da) {
        self.Id(da.Id);
        self.JobSeekerId(da.JobSeekerId);
        self.jobSeekerSkillId(da.JobSeekerSkillId);
        self.companyName(da.CompanyName);
        self.position(da.Position);
        self.startDate(da.StartDate);
        self.endDate(da.EndDate);
        self.isEdit('0');
    }
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
    jsonObjectRelatedExperience = ko.toJS(relatedExperienceObj);
    if (jsonObjectRelatedExperience.Id) {
        alert("hi");
        var dataObjRelatedExperience;
        var jobSeekerRelatedExperienceObj = {}

        jobSeekerRelatedExperienceObj.JobSeekerId = jsonObjectRelatedExperience.JobSeekerId;
        jobSeekerRelatedExperienceObj.JobSeekerSkillId = jsonObjectRelatedExperience.jobSeekerSkillId;
        jobSeekerRelatedExperienceObj.CompanyName = jsonObjectRelatedExperience.companyName;
        jobSeekerRelatedExperienceObj.Position = jsonObjectRelatedExperience.position;
        jobSeekerRelatedExperienceObj.StartDate = convert(jsonObjectRelatedExperience.startDate);
        jobSeekerRelatedExperienceObj.EndDate = convert(jsonObjectRelatedExperience.endDate);

        dataObjRelatedExperience = JSON.stringify(jobSeekerRelatedExperienceObj);
        alert(dataObjRelatedExperience);
        var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience?Id=' + jsonObjectRelatedExperience.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlRelatedExperience,
            type: "PUT",
            data: dataObjRelatedExperience,
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
        alert("hi");
        var dataObjRelatedExperience;
        var jobSeekerRelatedExperienceObj = {}

        jobSeekerRelatedExperienceObj.JobSeekerId = jsonObjectRelatedExperience.JobSeekerId;
        jobSeekerRelatedExperienceObj.JobSeekerSkillId = jsonObjectRelatedExperience.jobSeekerSkillId;
        jobSeekerRelatedExperienceObj.CompanyName = jsonObjectRelatedExperience.companyName;
        jobSeekerRelatedExperienceObj.Position = jsonObjectRelatedExperience.position;
        jobSeekerRelatedExperienceObj.StartDate = jsonObjectRelatedExperience.startDate;
        jobSeekerRelatedExperienceObj.EndDate = jsonObjectRelatedExperience.endDate;

        dataObjRelatedExperience = JSON.stringify(jobSeekerRelatedExperienceObj);
        alert(dataObjRelatedExperience);
        var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlRelatedExperience,
            type: "POST",
            data: dataObjRelatedExperience,
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

function convert(str) {

    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join("/");

}