var viewModel = {}

$(document).ready(function () {
    if (app.loggedIn()) { alert("123"); }
   // if (!app.loggedIn()) { window.location = "Account.html"; }

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


    $(function () {
      ensureTemplates(["accountStatus", "ViewAccountStatus", "EditAccountStatus", "EditDemographic", "ViewDemographic", "Demographic", "AccountDetail", "ViewAccountDetails", "EditAccountDetail", "EditFormAccountDetails", "AccountDetailsEditLoginCredentials", "AccountDetailsViewLoginCredentials", "NotificationPreferences", "ViewNotificationPreferences", "EditNotificationPreferences"]);
      //ensureTemplates(["AccountDetail"]);
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