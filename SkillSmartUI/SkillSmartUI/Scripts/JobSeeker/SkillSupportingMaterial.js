viewModel.whichTemplateToUseSupportingMaterial = function (supportingMaterialObj) {
    selectedSupportingMaterial = ko.toJS(supportingMaterialObj);
    return selectedSupportingMaterial.isEditableSupportingMaterial ? "ViewSupportingMaterial" : "EditSupportingMaterial";
}

viewModel.addFirstSupportingMaterial = function (supportingMaterialObj) {
    selectedSupportingMaterial = ko.toJS(supportingMaterialObj);
    supportingMaterialObj.btnSupportingMaterial("Add More");
    supportingMaterialObj.isEditableSupportingMaterial(false);

    var supportingMaterial = new createSupportingMaterial();
    supportingMaterial.deleteCheck('0');
    supportingMaterial.isEdit('1');
    supportingMaterial.jobSeekerSkillId(selectedSupportingMaterial.SkillId);

    supportingMaterialObj.supportingMaterialArray.push(supportingMaterial);
}

function createSupportingMaterial(da) {
    var self = this;
    self.Id = ko.observable('');
    self.jobSeekerSkillId = ko.observable('');
    self.title = ko.observable('').extend({ required: { message: "Title required" } });
    self.webURL = ko.observable('').extend({ required: { message: "Wesite required" } });
    self.description = ko.observable('').extend({ required: { message: "Description required" } });
    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');
    self.errorSupporting = ko.validation.group({ p1: self.title, p2: self.webURL, p3: self.description });

    if (da) {
        self.Id(da.Id);
        self.jobSeekerSkillId(da.JobSeekerSkillId);
        self.title(da.MaterialTitle);
        self.webURL(da.WebsiteUrl);
        self.description(da.Description);
        self.isEdit('0');
    }
}


viewModel.clickButtonSkillSupportingMaterial = function (supportingMaterialObj) {
    selectedSupportingMaterial = ko.toJS(supportingMaterialObj);
    if (supportingMaterialObj.btnSupportingMaterial() == "Add More") {

        var supportingMaterial = new createSupportingMaterial();
        supportingMaterial.deleteCheck('0');
        supportingMaterial.isEdit('1');
        supportingMaterial.jobSeekerSkillId(selectedReference.SkillId);
        supportingMaterialObj.supportingMaterialArray.splice(0, 0, supportingMaterial);
    }

    else {
        supportingMaterialObj.btnSupportingMaterial("Add More");
        supportingMaterialObj.isEditableSupportingMaterial(false);
    }
}
var currentSupportingMaterial;
viewModel.editSupportingMaterialDetails = function (supportingMaterialObj) {
    currentSupportingMaterial = ko.toJS(supportingMaterialObj);
    supportingMaterialObj.isEdit('1');
    supportingMaterialObj.deleteCheck('1');
}

viewModel.saveSupportingMaterial = function (supportingMaterialObj) {
    if (supportingMaterialObj.title.isValid() && supportingMaterialObj.webURL.isValid() && supportingMaterialObj.description.isValid()) {
        jsonObjectSupportingMaterial = ko.toJS(supportingMaterialObj);
        if (jsonObjectSupportingMaterial.Id) {
            alert("hi");
            var dataObjSupportingMaterial;
            var jobSeekerSupportingMaterialObj = {}

            jobSeekerSupportingMaterialObj.JobSeekerSkillId = jsonObjectSupportingMaterial.jobSeekerSkillId;
            jobSeekerSupportingMaterialObj.MaterialTitle = jsonObjectSupportingMaterial.title;
            jobSeekerSupportingMaterialObj.WebsiteUrl = jsonObjectSupportingMaterial.webURL;
            jobSeekerSupportingMaterialObj.Description = jsonObjectSupportingMaterial.description;

            dataObjSupportingMaterial = JSON.stringify(jobSeekerSupportingMaterialObj);
            alert(dataObjSupportingMaterial);
        var apiUrlSupportingMaterial = GetWebAPIURL() + '/api/SkillSupportingMaterial?Id=' + jsonObjectSupportingMaterial.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlSupportingMaterial,
            type: "PUT",
            data: dataObjSupportingMaterial,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                supportingMaterialObj.isEdit('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
            var dataObjSupportingMaterial;
            var jobSeekerSupportingMaterialObj = {}

            jobSeekerSupportingMaterialObj.JobSeekerSkillId = jsonObjectSupportingMaterial.jobSeekerSkillId;
            jobSeekerSupportingMaterialObj.MaterialTitle = jsonObjectSupportingMaterial.title;
            jobSeekerSupportingMaterialObj.WebsiteUrl = jsonObjectSupportingMaterial.webURL;
            jobSeekerSupportingMaterialObj.Description = jsonObjectSupportingMaterial.description;

            dataObjSupportingMaterial = JSON.stringify(jobSeekerSupportingMaterialObj);
        var apiUrlSupportingMaterial = GetWebAPIURL() + '/api/SkillSupportingMaterial';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlSupportingMaterial,
            type: "POST",
            data: dataObjSupportingMaterial,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                supportingMaterialObj.isEdit('0');
                supportingMaterialObj.Id(data);
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
    }
    else {
        supportingMaterialObj.errorSupporting.showAllMessages();
    }
}
viewModel.cancelSupportingMaterial = function (supportingMaterialObj) {
    jsonObjectSupportingMaterialObj = ko.toJS(supportingMaterialObj);

    if (jsonObjectSupportingMaterialObj.Id) {
        supportingMaterialObj.isEdit('0');


        supportingMaterialObj.title(currentSupportingMaterial.title);
        supportingMaterialObj.webURL(currentSupportingMaterial.webURL);
        supportingMaterialObj.description(currentSupportingMaterial.description);
    }
    else {
        $.each(viewModel.categoryArray(), function () {
            $.each(this.specialityArray(), function () {
                $.each(this.skillArray(), function () {
                    this.supportingMaterialArray.remove(supportingMaterialObj);
                    if (this.supportingMaterialArray().length == 0) {
                        this.supportingMaterialCheck('0');
                        this.isEditableSupportingMaterial(true);
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
viewModel.deleteSupportingMaterial = function (supportingMaterialObj) {
    
    var jsonObjectSupportingMaterial = ko.toJS(supportingMaterialObj);

    var SupportingDelete = confirm("Do you want to delete!");
    if (SupportingDelete == true)
    {
        if (jsonObjectSupportingMaterial.Id) {
            var apiUrlSupportingMaterial = GetWebAPIURL() + '/api/SkillSupportingMaterial?Id=' + jsonObjectSupportingMaterial.Id;
            //To delete data from Language Table
            $.ajax({
                url: apiUrlSupportingMaterial,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    $.each(viewModel.categoryArray(), function () {
                        $.each(this.specialityArray(), function () {
                            $.each(this.skillArray(), function () {
                                this.supportingMaterialArray.remove(supportingMaterialObj);
                                if (this.supportingMaterialArray().length == 0) {
                                    this.supportingMaterialCheck('0');
                                    this.isEditableSupportingMaterial(true);
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

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});