if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekerregistration) == 'undefined') skillsmart.mediator.jobseekerregistration = {}

skillsmart.mediator.jobseekerregistration.createViewMediator = function () {

    // Create the view jobseeker registration view-specific view model
    var viewModel = skillsmart.model.jobseekerregistration.initializeViewModel();

    // Save the view model
    skillsmart.mediator.jobseekerregistration.setViewModel(viewModel);
}

skillsmart.mediator.jobseekerregistration.setupViewDataBindings = function () {

    $("#first-name").attr("data-bind", "value: firstname");
    $("#last-name").attr("data-bind", "value: lastname");
    $("#email-address").attr("data-bind", "value: email");
    $("#password").attr("data-bind", "value: password");
    $("#confirm-password").attr("data-bind", "value: passwordconfirm");

    $("#submit-button").attr("data-bind", "click:submit");
    var viewNode = $('#jobseeker-registration')[0];
    var viewModel = skillsmart.mediator.jobseekerregistration.getViewModel();


    viewModel.errors = ko.validation.group(viewModel);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false
    });

    viewModel.submit = function () {

        if (viewModel.isValid()) {

            var jsonObject = ko.toJS(viewModel);
            var dataObj;

            var jobSeekerObj = {}
            jobSeekerObj.FirstName = jsonObject.firstname;
            jobSeekerObj.LastName = jsonObject.lastname;
            jobSeekerObj.Email = jsonObject.email;
            jobSeekerObj.Password = jsonObject.password;

            dataObj = JSON.stringify(jobSeekerObj);

            var apiUrlJobSeekerRegister = GetWebAPIURL() + '/api/JobSeeker/';

            //To create Jobseekers
            $.ajax({
                url: apiUrlJobSeekerRegister,
                type: "POST",
                data: dataObj,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    window.location = "JobSeekerAdditionalInformation.html?jobSeekerId=" + data;
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {

            viewModel.displayErrors(true);
        }

    };

    ko.applyBindings(viewModel, viewNode);
}



skillsmart.mediator.jobseekerregistration.getViewModel = function () {
    return $(document).data("skillsmart.model.jobseekerregistration.viewmodel");
}

skillsmart.mediator.jobseekerregistration.setViewModel = function (viewModel) {
    $(document).data("skillsmart.model.jobseekerregistration.viewmodel", viewModel);
}
