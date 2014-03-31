if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.popupskill) == 'undefined') skillsmart.mediator.popupskill = {}

//var url = window.location.href;
//var userId = url.substring(url.lastIndexOf('=') + 1);

var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
var acquiredId = hashes[0].substring(4);
var userId = hashes[1].substring(7);

skillsmart.mediator.popupskill.createViewMediatorPopupskill = function ()
{
    var apiUrlCategory = GetWebAPIURL() + '/api/Category?parentId=0';
    var dataCategoryObj;

    //To get language name from Language Lookup
    $.ajax({
        url: apiUrlCategory,
        type: 'GET',
        async: false,
        success: function (data) {
            dataCategoryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

  
    var viewModel = skillsmart.model.popupskill.initializeViewModelPopupSkill(dataCategoryObj);
    skillsmart.mediator.popupskill.setViewModel("skillsmart.model.popupskill.viewModel", viewModel);
}

skillsmart.mediator.popupskill.setupViewDataBindingsPopupskill = function ()
{
    $("#CategoryList").attr("data-bind", "options:category,optionsText: 'name', optionsValue: 'id', value: selectedCategory");
    $("#SpecialityList").attr("data-bind", "options:speciality,optionsText: 'name', optionsValue: 'id', value: selectedSpeciality");
    $("#SkillList").attr("data-bind", "options:skill,optionsText: 'name', optionsValue: 'id', value: selectedSkill");

    $("#save_Skills").attr("data-bind", "click:saveSkills");

    var viewNode = $("#Popup_div")[0];
    var viewModel = skillsmart.mediator.popupskill.getViewModel("skillsmart.model.popupskill.viewModel");

    viewModel.selectedCategory.subscribe(function (newValue)
    {

        if (newValue != "") {

            var apiUrlSpeciality = GetWebAPIURL() + '/api/Category/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSpeciality,
                type: 'GET',
                async: false,
                success: function (data) {
                    viewModel.speciality([]);
                    viewModel.speciality.push({ name: "Speciality", id: "" });
                    for (keySpeciality in data) {
                        viewModel.speciality.push({ name: data[keySpeciality].CategoryName, id: data[keySpeciality].Id });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });

    viewModel.selectedSpeciality.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlSkill = GetWebAPIURL() + '/api/SkillMap/?specialityId=' + newValue;
            var dataSkillObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSkill,
                type: 'GET',
                async: false,
                success: function (data) {
                    viewModel.skill([]);
                    viewModel.skill.push({ name: "skill", id: "" });
                    for (keySkill in data) {
                        viewModel.skill.push({ name: data[keySkill].SkillName, id: data[keySkill].SkillMapId });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Errorskill :' + status);
                }
            });
        }
    });

    viewModel.saveSkills = function ()
    {
        var jsonObject = ko.toJS(viewModel);
        var jobseekerAddSkillObj = {}
        jobseekerAddSkillObj.JobSeekerId = userId;
        jobseekerAddSkillObj.SkillMapId = jsonObject.selectedSkill;
        jobseekerAddSkillObj.SkillAcquiredId = acquiredId;

        dataobjAddSkill = JSON.stringify(jobseekerAddSkillObj);
        var apiUrlAddSkill = GetWebAPIURL() + '/api/JobSeekerSkillList/';

        $.ajax({
            url: apiUrlAddSkill,
            type: "POST",
            data: dataobjAddSkill,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    ko.applyBindings(viewModel, viewNode);
}

skillsmart.mediator.popupskill.getViewModel = function (key) {
    return $(document).data(key);
}

skillsmart.mediator.popupskill.setViewModel = function (key, viewModel) {
    $(document).data(key, viewModel);
}