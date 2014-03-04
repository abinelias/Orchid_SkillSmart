if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekerregistration) == 'undefined') skillsmart.model.jobseekerregistration = {}

skillsmart.model.jobseekerregistration.initializeViewModel = function () {
   
    var viewModel = {
        firstname: ko.observable("").extend({required: true,minLength: 3,pattern: {message: 'Please check firstname',params: '^([A-Za-z]*)$'}}),
        lastname: ko.observable("").extend({ required: { message: "Last name required" } }),
        birthday: ko.observable("").extend({ date: true }),
        email: ko.observable("").extend({ email: true, required: { message: "Email required" } }),
        username: ko.observable("").extend({ required: { message: "User name required" } }),
        password: ko.observable("").extend({ required: { params: true, message: "Password is required." } }),
        passwordconfirm: ko.observable(""),
        /*isConfirmed: ko.computed(function ()
        {
            if (!password().length) return false;
            return password() == passwordconfirm()
        }),*/
        gender: ko.observable("").extend({ required: {message:"Please select Gender"}}),
        contact:ko.observableArray(['Mobile','Email'])
    };
   // viewModel.showErrors = ko.observable(false);

    return viewModel;
}
