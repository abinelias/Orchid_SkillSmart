if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekerlist) == 'undefined') skillsmart.model.jobseekerlist = {}

skillsmart.model.jobseekerlist.initializeViewModel = function (dataObjJobseeker) {
    var viewModel = {
        persons: ko.observableArray()
    }


    for (da in dataObjJobseeker) {
        var person = {
            FirstName: ko.observable(''),
            LastName: ko.observable(''),
            Email: ko.observable(''),
        };

        person.FirstName(dataObjJobseeker[da].FirstName);
        person.LastName(dataObjJobseeker[da].LastName);
        person.Email(dataObjJobseeker[da].Email);
        person.EditUrl = ko.computed(function () {
            return '/Views/JobSeeker/AccountInformation.html?Id=' + dataObjJobseeker[da].Id;
        }, this);
        person.MyInfoUrl = ko.computed(function () {
            return '/Views/JobSeeker/MyInformtion.html?userId=' + dataObjJobseeker[da].Id;
        }, this);

        person.MyJobUrl = ko.computed(function () {
            return '/Views/JobSeeker/MyJobsApplied.html?userId=' + dataObjJobseeker[da].Id;
        }, this);
        person.MyJobSearchUrl = ko.computed(function () {
            return '/Views/JobSeeker/AdvancedJobSearch.html?userId=' + dataObjJobseeker[da].Id;
        }, this);
        person.MySkillUrl = ko.computed(function () {
            return '/Views/JobSeeker/JobSeekerSkillList.html?userId=' + dataObjJobseeker[da].Id;
        }, this);
        viewModel.persons.push(person);
    }
    return viewModel;
}; 