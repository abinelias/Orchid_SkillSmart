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
            //Birthday: ko.observable(''),
            //Id: ko.observable('')
        };
        //Uid = dataObjJobseeker[da].Id;
        //person.Id(dataObjJobseeker[da].Id);
        person.FirstName(dataObjJobseeker[da].FirstName);
        person.LastName(dataObjJobseeker[da].LastName);
        person.Email(dataObjJobseeker[da].Email);
        //person.Birthday(dataObjJobseeker[da].Birthday);
        person.EditUrl = ko.computed(function () {
            return '/Views/JobSeeker/JobSeekerAdditionalInformationEdit.html?Id=' + dataObjJobseeker[da].Id;
        }, this);
        person.DeleteUrl = ko.computed(function () {
            return '/Views/JobSeeker/JobSeekerList.html?DeleteId=' + dataObjJobseeker[da].Id;
        }, this);
        viewModel.persons.push(person);
    }
    return viewModel;
};