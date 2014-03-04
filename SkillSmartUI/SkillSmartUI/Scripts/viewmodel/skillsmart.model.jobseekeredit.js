if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekeredit) == 'undefined') skillsmart.model.jobseekeredit = {}

skillsmart.model.jobseekeredit.initializeViewModel = function (result) {
    
    var viewModel = {
        firstname: ko.observable(result.FirstName).extend({ required: true, minLength: 3, pattern: { message: 'Please check firstname', params: '^([A-Za-z]*)$' } }),
        lastname: ko.observable(result.LastName).extend({ required: { message: "Last name required" } }),
        birthday: ko.observable(result.Birthday).extend({ required: { message: "Birthday required" } }),
        email: ko.observable(result.Email).extend({ email: true, required: { message: "Email required" } }),
        username: ko.observable(result.UserName).extend({ required: { message: "User name required" } }),
        password: ko.observable(result.Password).extend({ required: { params: true, message: "Password is required." } }),
        passwordconfirm: ko.observable(result.Password)
    }
    return viewModel;
}
