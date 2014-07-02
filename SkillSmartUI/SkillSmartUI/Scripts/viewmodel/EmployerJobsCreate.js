var viewModel = {};


$(document).ready(function () {
    $(function () {
        ensureTemplates(["JobsCreateScratch", "Prerequisites", "EditPrerequisites", "ViewPrerequisites", "EditFormPrerequisites", "PrerequisiteList", "JobSkills", "JobsOpen", "EditFormJobs"]);
    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/Employer/" + name + ".html", function (template) {
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