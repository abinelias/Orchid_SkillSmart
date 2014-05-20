﻿var viewModel = {}
$(document).ready(function () {


    $(function () {
        ensureTemplates(["accountStatus", "ViewAccountStatus", "EditAccountStatus", "EditDemographic", "ViewDemographic", "Demographic", "AccountDetail", "ViewAccountDetails", "EditAccountDetail", "EditFormAccountDetails", "AccountDetailsEditLoginCredentials", "AccountDetailsViewLoginCredentials", "NotificationPreferences", "ViewNotificationPreferences", "EditNotificationPreferences"]);
    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/JobSeeker/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {
                   
                    ko.applyBindings(viewModel);
                }
            });
        });
    }

});