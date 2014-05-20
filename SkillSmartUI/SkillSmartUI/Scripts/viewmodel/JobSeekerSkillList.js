
var viewModel = {};
var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getJobseekerSkillReference() {
    var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference?jobSeekerId=' + userId;
    var dataObjSkillReference;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlSkillReference,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjSkillReference = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataObjSkillReference;
}

function getJobseekerSkillSupportingMaterial() {
    var apiUrlSkillSupportingMaterial = GetWebAPIURL() + '/api/SkillSupportingMaterial?jobSeekerId=' + userId;
    var dataObjSkillSupportingMaterial;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlSkillSupportingMaterial,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjSkillSupportingMaterial = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataObjSkillSupportingMaterial;
}

function getJobseekerSkillRelatedExperience() {
    var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience?jobSeekerId=' + userId;
    var dataObjSkillRelatedExperience;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlRelatedExperience,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjSkillRelatedExperience = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataObjSkillRelatedExperience;
}

function getJobseekerSkillDetailsById(skillId) {

    var apiUrlSkillDetails = GetWebAPIURL() + '/api/JobSeekerSkillList/' + skillId;
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

function AddSkills(userId) {
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&userid=" + userId);
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

$(document).ready(function () {

    var dataJobSeekerSkillListObj;
    var apiUrlJobSeekerSkillLists = GetWebAPIURL() + '/api/ListJobSeekerSkill?jobSeekerId=' + userId;

    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSeekerSkillLists,
        type: 'GET',
        async: false,
        success: function (data) {
            dataJobSeekerSkillListObj = data;

        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });

    var dataObjSkillReference = getJobseekerSkillReference();
    var dataObjSkillSupportingMaterial = getJobseekerSkillSupportingMaterial();
    var dataObjSkillRelatedExperience = getJobseekerSkillRelatedExperience();

    viewModel.categoryArray = ko.observableArray();
   
    var categoryId;
    var specialityId;
    var currentCategoryObj;
    var currentSpecialityObj;

    for (da in dataJobSeekerSkillListObj) {

        if (dataJobSeekerSkillListObj[da].CategoryId != categoryId) {
            specialityId = 0;
            var categoryObj = new createCategory(dataJobSeekerSkillListObj[da]);
            categoryId = dataJobSeekerSkillListObj[da].CategoryId;
            specialityId = dataJobSeekerSkillListObj[da].SpecialityId;
            viewModel.categoryArray.push(categoryObj);
            currentCategoryObj = categoryObj;

        }

        else
            if (dataJobSeekerSkillListObj[da].SpecialityId != specialityId) {

                var skillObj = new createSpeciality(dataJobSeekerSkillListObj[da]);
                specialityId = dataJobSeekerSkillListObj[da].SpecialityId;
                currentSpecialityObj = skillObj;

                currentCategoryObj.specialityArray.push(skillObj);
            }
            else {
                var skillObj = new createSkil(dataJobSeekerSkillListObj[da]);

                currentSpecialityObj.skillArray.push(skillObj);
                categoryId = dataJobSeekerSkillListObj[da].CategoryId;
            }
    }



    function createCategory(skillCollection) {
        var self = this;
        self.categoryName = ko.observable();
        self.btnCategoryList = ko.observable('+');
        self.specialityArray = ko.observableArray();

        if (skillCollection) {
            var specialityObj = new createSpeciality(skillCollection);
            currentSpecialityObj = specialityObj;
            self.categoryName(skillCollection.CategoryName);
            self.specialityArray.push(specialityObj);
        }
    }

    function createSpeciality(skillCollection) {
        var self = this;

        self.specialityName = ko.observable('');
        self.btnSpecialityList = ko.observable('+');
        self.skillArray = ko.observableArray();

        var skillObj = new createSkil(skillCollection);

        if (skillCollection) {
            self.specialityName(skillCollection.SpecialityName);
            self.skillArray.push(skillObj);
        }
    }

    function createSkil(skillCollection) {
        var self = this;
        var score;
        self.skillName = ko.observable('');
        self.SkillId = ko.observable('');
        if (skillCollection.SkillScore == null) {
            score = 1;
        }
        else {
            score = skillCollection.SkillScore;
        }
        self.val = ko.observable(score);
        self.min = ko.observable(0);
        self.max = ko.observable(10);
        self.btnSkillList = ko.observable('+');
        self.validationFactor = ko.observable();

        if (skillCollection) {
            self.skillName(skillCollection.SkillName);
            self.SkillId(skillCollection.Id);
        }

        self.referenceCheck = ko.observable('0');
        self.isEditableReference = ko.observable(true);
        self.btnReference = ko.observable("Edit");
        self.referenceArray = ko.observableArray();
        if (dataObjSkillReference) {
            for (var i = 0; i < dataObjSkillReference.length; i++) {
                if (dataObjSkillReference[i].JobSeekerSkillId == self.SkillId()) {
                    self.referenceCheck('1');
                    var reference = new createReference(dataObjSkillReference[i]);
                    self.referenceArray.push(reference);
                }
            }
        }


        self.supportingMaterialCheck = ko.observable('0');
        self.isEditableSupportingMaterial = ko.observable(true);
        self.btnSupportingMaterial = ko.observable("Edit");
        self.supportingMaterialArray = ko.observableArray();

        if (dataObjSkillSupportingMaterial) {
            for (var i = 0; i < dataObjSkillSupportingMaterial.length; i++) {
                if (dataObjSkillSupportingMaterial[i].JobSeekerSkillId == self.SkillId()) {
                    self.supportingMaterialCheck('1');
                    var supportingMaterial = new createSupportingMaterial(dataObjSkillSupportingMaterial[i]);
                    self.supportingMaterialArray.push(supportingMaterial);
                }
            }
        }

        self.relatedExperienceCheck = ko.observable('0');
        self.isEditableRelatedExperience = ko.observable(true);
        self.btnRelatedExperience = ko.observable("Edit");
        self.relatedExperienceArray = ko.observableArray();

        if (dataObjSkillRelatedExperience) {
            for (var i = 0; i < dataObjSkillRelatedExperience.length; i++) {
                if (dataObjSkillRelatedExperience[i].JobSeekerSkillId == self.SkillId()) {
                    self.relatedExperienceCheck('1');
                    var relatedExperience = new createRelatedExperience(dataObjSkillRelatedExperience[i]);
                    self.relatedExperienceArray.push(relatedExperience);
                }
            }
        }

    }



    $(function () {
        ensureTemplates(["Categories", "Speciality", "Skill", "Reference", "ViewReference", "EditFormReference", "EditReferene", "ReferenceList", "SupportingMaterial", "ViewSupportingMaterial", "EditSupportingMaterial", "SupportingMaterialList", "EditFormSupportingMaterial", "RelatedExperience", "ViewRelatedExperience", "EditRelatedExperience", "RelatedExperienceList", "EditFormRelatedExperience"]);
    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/JobSeeker/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {
                    $(".rangeslider").wijslider({ orientation: "horizontal", range: true, dragFill: true, min: 0, max: 10, step: 1, values: [0] });
                    ko.applyBindings(viewModel);
                }
            });
        });
    }

    viewModel.expandCategoryDetails = function (objExpand) {
        if (objExpand.btnCategoryList() == '+') {
            objExpand.btnCategoryList('-');
        }
        else {
            objExpand.btnCategoryList('+');
        }
    }

    viewModel.expandSpecialityDetails = function (objExpand) {
        if (objExpand.btnSpecialityList() == '+') {
            objExpand.btnSpecialityList('-');
        }
        else {
            objExpand.btnSpecialityList('+');
        }
    }

    viewModel.expandSkillDetails = function (objExpand) {
        if (objExpand.btnSkillList() == '+') {
            objExpand.btnSkillList('-');
            var factorScore = 0;
            if (objExpand.referenceArray().length != 0) {
                factorScore = factorScore + 1;
            }
            if (objExpand.supportingMaterialArray().length != 0) {
                factorScore = factorScore + 1;
            }
            if (objExpand.relatedExperienceArray().length != 0) {
                factorScore = factorScore + 1;
            }
            objExpand.validationFactor(factorScore);
        }
        else {
            objExpand.btnSkillList('+');
        }
    }

    viewModel.changeProficiency = function (skillObj) {
        jsonObjectSkill = ko.toJS(skillObj);

        var dataObjSkill = getJobseekerSkillDetailsById(jsonObjectSkill.SkillId);

        var jobSeekerSkillProficiencyObj = {}
        jobSeekerSkillProficiencyObj.JobSeekerId = dataObjSkill.JobSeekerId;
        jobSeekerSkillProficiencyObj.SkillMapId = dataObjSkill.SkillMapId;
        jobSeekerSkillProficiencyObj.ExperienceId = dataObjSkill.ExperienceId;
        jobSeekerSkillProficiencyObj.SkillAcquiredId = dataObjSkill.SkillAcquiredId;
        jobSeekerSkillProficiencyObj.ProficiencyId = jsonObjectSkill.val;

        dataObjSkill = JSON.stringify(jobSeekerSkillProficiencyObj);

        var apiUrlSkill = GetWebAPIURL() + '/api/JobSeekerSkillList?Id=' + jsonObjectSkill.SkillId;
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

    viewModel.deleteSkillDetails = function (skillObj)
    {
        alert("delete");
    }


});
//alert(viewModel.categoryArray()[1].categoryName());