﻿
var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getJobseekerSkillReference() {
    var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference/';
    var dataObjSkillReference;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlSkillReference,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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
    var apiUrlSkillSupportingMaterial = GetWebAPIURL() + '/api/SkillSupportingMaterial/';
    var dataObjSkillSupportingMaterial;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlSkillSupportingMaterial,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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
    var apiUrlRelatedExperience = GetWebAPIURL() + '/api/SkillRelatedExperience/';
    var dataObjSkillRelatedExperience;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlRelatedExperience,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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



$(document).ready(function () {

    var dataJobSeekerSkillListObj;
    var apiUrlJobSeekerSkillLists = GetWebAPIURL() + '/api/ListJobSeekerSkill/';

    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlJobSeekerSkillLists,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
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
    viewModel.dataCompanyName = ko.observable(createListWorkHistory());

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
        self.SkillAcquiredId = ko.observable('');
        self.SkillParentId = ko.observable('');
        if (skillCollection.SkillScore == null) {score = 1;}
        else {score = skillCollection.SkillScore;}
        self.val = ko.observable(score);
        self.min = ko.observable(0);
        self.max = ko.observable(10);
        self.btnSkillList = ko.observable('+');
        self.validationFactor = ko.observable();

        if (skillCollection) {
            self.skillName(skillCollection.SkillName);
            self.SkillId(skillCollection.Id);
            self.SkillAcquiredId(skillCollection.AcquiredId);
            self.SkillParentId(skillCollection.SkillParentCollectionId);
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
        setTimeout(function () {
            jsonObjectSkill = ko.toJS(skillObj);

            var dataObjSkill = getJobseekerSkillDetailsById(jsonObjectSkill.SkillId);

            var jobSeekerSkillProficiencyObj = {}
            jobSeekerSkillProficiencyObj.JobSeekerId = dataObjSkill.JobSeekerId;
            jobSeekerSkillProficiencyObj.SkillMapId = dataObjSkill.SkillMapId;
            jobSeekerSkillProficiencyObj.ExperienceId = dataObjSkill.ExperienceId;
            jobSeekerSkillProficiencyObj.SkillAcquiredId = dataObjSkill.SkillAcquiredId;
            jobSeekerSkillProficiencyObj.SkillParentCollectionId = dataObjSkill.SkillParentCollectionId;
            jobSeekerSkillProficiencyObj.ProficiencyId = jsonObjectSkill.val;

            dataObjSkill = JSON.stringify(jobSeekerSkillProficiencyObj);
            var apiUrlSkill = GetWebAPIURL() + '/api/JobSeekerSkillList?Id=' + jsonObjectSkill.SkillId;
            //To insert data into scholarship table
            $.ajax({
                url: apiUrlSkill,
                type: "PUT",
                data: dataObjSkill,
                headers: app.securityHeaders(),
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

    viewModel.deleteSkillDetails = function (skillObj) {
        alert("delete");
    }

    viewModel.courseLink = function (skillObj) {
        alert("Hello");
    }
});
//alert(viewModel.categoryArray()[1].categoryName());