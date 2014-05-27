var viewModel = {}
$(document).ready(function () {


    $(function () {
        ensureTemplates(["EditTrainingCourse", "TrainingCourse", "TrainingCourseList", "EditFormTrainingCourse", "Certification", "CommonTemplateCourse", "EditCertification", "EditFormCertification", "CertificationList", "EducationList", "EditFormEducation", "EditEducation", "Education", "WorkExperience", "EditFormWorkExperience", "EditWorkExperience", "WorkExperienceList", "Award", "ViewAward", "EditAward", "EditFormAward", "AwardList", "Activities", "ViewActivities", "EditActivities", "ActivityList", "EditFormActivities", "LanguageLists", "EditFormLanguages", "Languages", "AboutMePitch", "PersonalInformation", "ViewPersonalInformation", "EditPersonalInformation", "ViewAboutMe", "EditAboutMe", "EditLanguages", "ViewLanguages", "SpecialityList", "EditSpecialityCourse", "EditFormSpecialityCourse", "Categories", "Speciality", "Skill", "Reference", "ViewReference", "EditFormReference", "EditReferene", "ReferenceList", "SupportingMaterial", "ViewSupportingMaterial", "EditSupportingMaterial", "SupportingMaterialList", "EditFormSupportingMaterial", "RelatedExperience", "ViewRelatedExperience", "EditRelatedExperience", "RelatedExperienceList", "EditFormRelatedExperience"]);
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



});
