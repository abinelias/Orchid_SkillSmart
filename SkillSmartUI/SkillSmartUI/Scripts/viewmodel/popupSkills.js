var viewModel = {}

var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
var acquiredId = hashes[1].substring(11);
var workHistoryId = hashes[2].substring(13);

$(document).ready(function () {

    (function (ko, $) {

        if (typeof (ko) === undefined) { throw 'Knockout is required, please ensure it is loaded before loading this plug-in'; }
        if (typeof (jQuery) === undefined) { throw 'jQuery is required, please ensure it is loaded before loading this plug-in'; }
        if (typeof (jQuery.ui) === undefined) { throw 'jQuery UI is required, please ensure it is loaded before loading this plug-in'; }

        // private functions here

        // the binding
        ko.bindingHandlers.multiSelectCheck = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
                var multiselectOptions = ko.utils.unwrapObservable(allBindingsAccessor().multiselectOptions) || {};

                // pass the original optionsCaption to the similar widget option
                if (ko.utils.unwrapObservable(allBindingsAccessor().optionsCaption)) {
                    multiselectOptions.noneSelectedText = ko.utils.unwrapObservable(allBindingsAccessor().optionsCaption);
                }

                // remove this and use the widget's
                allBindingsAccessor().optionsCaption = '';
                $(element).multiselect(multiselectOptions);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).multiselect("destroy");
                });

            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called once when the binding is first applied to an element,
                // and again whenever the associated observable changes value.
                // Update the DOM element based on the supplied values here.
                var selectOptions = ko.utils.unwrapObservable(allBindingsAccessor().multiSelectCheck);
                // remove this and use the widget's
                allBindingsAccessor().optionsCaption = '';

                ko.bindingHandlers.options.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

                setTimeout(function () {
                    $(element).multiselect("refresh");
                }, 0);

            }

        };

    })(ko, jQuery);
    initPopUpSkills();

    ko.applyBindings(viewModel);


});

function getCategoryList()
{
    var apiUrlCategory = GetWebAPIURL() + '/api/Category?parentId=0';
    var dataCategoryObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlCategory,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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

function initPopUpSkills()
{
    viewModel.selectedCategory= ko.observable('');
    viewModel.category= ko.observableArray();

    viewModel.selectedSpeciality= ko.observable('');
    viewModel.speciality= ko.observableArray();

    viewModel.selectedSkill= ko.observable('');
    viewModel.skill = ko.observableArray();

    var dataCategoryObj = getCategoryList();
    viewModel.category.push({ name: "Category", id: "" });
    for (da in dataCategoryObj) {

        viewModel.category.push({ name: dataCategoryObj[da].CategoryName, id: dataCategoryObj[da].Id });
    }
    viewModel.speciality.push({ name: "Speciality", id: "" });

    viewModel.selectedCategory.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlSpeciality = GetWebAPIURL() + '/api/Category/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSpeciality,
                type: 'GET',
                async: false,
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
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
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.skill([]);
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
}

viewModel.saveSkills = function () {
    var jsonObject = ko.toJS(viewModel);
    var jobseekerAddSkillObj = {}
    jobseekerAddSkillObj.SkillAcquiredId = acquiredId;
    jobseekerAddSkillObj.SkillParentCollectionId = workHistoryId;
    jobseekerAddSkillObj.SkillMapId = jsonObject.selectedSkill.toString();
    dataobjAddSkill = JSON.stringify(jobseekerAddSkillObj);
    var apiUrlAddSkill = GetWebAPIURL() + '/api/JobSeekerSkillList/';
    $.ajax({
        url: apiUrlAddSkill,
        type: "POST",
        data: dataobjAddSkill,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            $(dialog).dialog("close");
            
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}