var viewModel = {};

$(document).ready(function () {

    $(function () {
        ensureTemplates(["EditTrainingCourse", "TrainingCourse", "TrainingCourseList", "EditFormTrainingCourse", "Certification", "CommonTemplateCourse", "EditCertification", "EditFormCertification", "CertificationList", "EducationList", "EditFormEducation", "EditEducation", "Education", "WorkExperience", "EditFormWorkExperience", "EditWorkExperience", "WorkExperienceList", "Award", "ViewAward", "EditAward", "EditFormAward", "AwardList", "Activities", "ViewActivities", "EditActivities", "ActivityList", "EditFormActivities", "LanguageLists", "EditFormLanguages", "Languages", "AboutMePitch", "PersonalInformation", "ViewPersonalInformation", "EditPersonalInformation", "ViewAboutMe", "EditAboutMe", "EditLanguages", "ViewLanguages"]);
    });

    function ensureTemplates(list) {
        
        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/JobSeeker/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {
                   /* ko.bindingHandlers.datepicker = {
                        init: function (element, valueAccessor, allBindingsAccessor) {
                            var $el = $(element);

                            //initialize datepicker with some optional options
                            var options = allBindingsAccessor().datepickerOptions || {};
                            $el.datepicker(options);

                            //handle the field changing
                            ko.utils.registerEventHandler(element, "change", function () {
                                var observable = valueAccessor();
                                observable($el.datepicker("getDate"));
                            });

                            //handle disposal (if KO removes by the template binding)
                            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                                $el.datepicker("destroy");
                            });

                        },
                        update: function (element, valueAccessor) {
                            var value = ko.utils.unwrapObservable(valueAccessor()),
                                $el = $(element),
                                current = $el.datepicker("getDate");

                            if (value - current !== 0) {
                                $el.datepicker("setDate", value);
                            }
                        }
                    };*/
                  
                    ko.applyBindings(viewModel);
                }
            });
        });
    }
    viewModel.displayErrorsPersonal = ko.observable(false);
    viewModel.displayErrorsAboutMe = ko.observable(false);

    viewModel.errorsAboutMe = ko.validation.group(viewModel);
    viewModel.errorPersonalInformation = ko.validation.group(viewModel);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false
    });

    
    viewModel.displayErrors = ko.observable(false);

    viewModel.errors = ko.validation.group(viewModel);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false
    });

});




 