if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekerlist) == 'undefined') skillsmart.mediator.jobseekerlist = {}

skillsmart.mediator.jobseekerlist.createViewMediator = function () {
    var dataObjJobseeker;
    var apiUrl = GetWebAPIURL() + '/api/JobSeeker/';

    //To get jobseekers
    $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'JSON',
        async: false,
        success: function (data) {
            dataObjJobseeker = data;

        },

        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    var viewModel = skillsmart.model.jobseekerlist.initializeViewModel(dataObjJobseeker);
    skillsmart.mediator.jobseekerlist.setViewModel(viewModel);
};

skillsmart.mediator.jobseekerlist.setupViewDataBindings = function ()
{
   
    var viewModel = skillsmart.mediator.jobseekerlist.getViewModel();
    var viewNode = $("#form_div")[0];
    ko.applyBindings(viewModel, viewNode);
    
}

skillsmart.mediator.jobseekerlist.getViewModel = function () {
    return $(document).data("skillsmart.model.jobseekerlist.viewmodel");
}

skillsmart.mediator.jobseekerlist.setViewModel = function (viewModel) {
    $(document).data("skillsmart.model.jobseekerlist.viewmodel", viewModel);
}

