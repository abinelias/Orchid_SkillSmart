﻿var viewModel = {};


$(document).ready(function () {
    $(function () {
        ensureTemplates(["CandidateSearchCriteria", "JobSeekerList", "JobSeekerDetailsJob"]);
    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/Employer/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {

                    ko.applyBindings(viewModel);
                }

            });
        });
    }
});