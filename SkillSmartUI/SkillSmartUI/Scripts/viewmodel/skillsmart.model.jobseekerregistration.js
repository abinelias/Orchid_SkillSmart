if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekerregistration) == 'undefined') skillsmart.model.jobseekerregistration = {}

skillsmart.model.jobseekerregistration.initializeViewModel = function () {

    var viewModel = {

        firstname: ko.observable("").extend({ required: true, minLength: 3, pattern: { message: 'Please check firstname', params: '^([A-Za-z]*)$' } }),
        lastname: ko.observable("").extend({ required: { message: "Last name required", params: '^([A-Za-z]*)$' } }),
        email: ko.observable("").extend({ required: { message: "Email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } }),
        password: ko.observable("").extend({ required: { message: "Password is required." } }),
        passwordconfirm: ko.observable("").
        extend({required: { message: "Confirm-Password is required or incorrect." },
            validation: {
                validator: function (val, params) {
                    return val == params.value;
                },
                message: 'Passwords do not match.',
                params: password
            }
        }),
        
    };
    viewModel.displayErrors = ko.observable(false);

    return viewModel;
}
