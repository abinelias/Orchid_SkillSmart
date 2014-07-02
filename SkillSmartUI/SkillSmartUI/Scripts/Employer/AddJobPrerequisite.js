var viewModel = {}

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

    initAddJobPrerequisites();
    ko.applyBindings(viewModel);
});

function getJobList() {

    var apiUrlJobList = GetWebAPIURL() + '/api/JobsList/';
    var dataJobListObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlJobList,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataJobListObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataJobListObj;

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


function initAddJobPrerequisites() {
    viewModel.Jobs = ko.observableArray();
    viewModel.JobId = ko.observable();

    viewModel.selectedCategory = ko.observable('');
    viewModel.category = ko.observableArray();

    viewModel.selectedSpeciality = ko.observable('');
    viewModel.speciality = ko.observableArray();

    viewModel.selectedSkill = ko.observable('');
    viewModel.skill = ko.observableArray();

    var dataJobListObj = getJobList();
    for (da in dataJobListObj) {

        viewModel.Jobs.push({ name: dataJobListObj[da].JobPosition, id: dataJobListObj[da].Id });
    }

    viewModel.selectedPrerequisite = ko.observable('');
    viewModel.prerequisite = ko.observableArray();

    viewModel.selectedSecondLevelPrerequisite = ko.observable('');
    viewModel.SecondLevelprerequisite = ko.observableArray();

    var dataPrerequisiteObj = getPrequisiteList();
    viewModel.prerequisite.push({ name: "Prerequisite", id: "" });
    for (da in dataPrerequisiteObj) {

        viewModel.prerequisite.push({ name: dataPrerequisiteObj[da].PrerequisiteName, id: dataPrerequisiteObj[da].Id });
    }

    viewModel.selectedPrerequisite.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlPrerequisite,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.SecondLevelprerequisite([]);

                    for (keySpeciality in data) {
                        viewModel.SecondLevelprerequisite.push({ name: data[keySpeciality].PrerequisiteName, id: data[keySpeciality].Id });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });

    viewModel.selectedSecondLevelPrerequisite.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlPrerequisite = GetWebAPIURL() + '/api/Prerequisite/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlPrerequisite,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.skill([]);
                    for (keySkill in data) {
                        viewModel.skill.push({ name: data[keySkill].PrerequisiteName, id: data[keySkill].Id });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Errorskill :' + status);
                }
            });
        }
    });
}





viewModel.saveJobPrerequisites = function () {
    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}

    jobseekerworkExperienceObj.JobId = jsonObjectWorkExperience.JobId;
    jobseekerworkExperienceObj.PrerequisiteTypeId = jsonObjectWorkExperience.selectedSkill.toString();
    
    jobseekerworkExperienceObj.Required = 1;


    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    alert(dataobjWorkExpereince);

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