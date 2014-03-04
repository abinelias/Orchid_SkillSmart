if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekeradditionalinformation) == 'undefined') skillsmart.model.jobseekeradditionalinformation = {}

skillsmart.model.jobseekeradditionalinformation.initializeViewModel = function ()
{
    var viewModel =
    {
        preferredname : ko.observable("").extend({ required: true, minLength: 3, pattern: { message: 'Please check preferredname', params: '^([A-Za-z]*)$' } }),
        addressline1 : ko.observable("").extend({ required: { message: "Address required" } }),
        addressline2 : ko.observable(""),
        city : ko.observable("").extend({ required: { message: "City required" } }),
        state : ko.observable(""),
        zip : ko.observable("").extend({ required: { params: true, message: "Zip is required." } }),
        phonehome : ko.observable(""),
        phonemobile : ko.observable(""),
        emailaddress : ko.observable("").extend({ email: true, required: { message: "Email required" } }),
        citizenship: ko.observable("").extend({ required: { message: "citizenship required" } }),
        
        selectedItem: ko.observable(),
        country: ko.observableArray([
        { id: 0, name: "India" },
        { id: 1, name: "Australia" },
        { id: 2, name: "Canada" },
        { id: 3, name: "America" }
        ])
        
    }

   
    return viewModel;
};