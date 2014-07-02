var viewModel = {};
var CompanyId = "6a3b968b-af7a-4917-be72-9c8b41dc87de";

$(document).ready(function () {
    $(function () {
        ensureTemplates(["EditEmployer","ListEmployer", "AddEmployer"]);
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
