if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekeredit) == 'undefined') skillsmart.mediator.jobseekeredit = {}
var url = window.location.href;
var id = url.substring(url.lastIndexOf('=') + 1);
skillsmart.mediator.jobseekeredit.createViewMediator = function ()
{
    var rootUrl = 'http://localhost:2043';
    var apiUrl = '/api/JobSeeker/' + id;
    var result;

    $.ajax({
        url: rootUrl + apiUrl,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            result = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    var viewModel = skillsmart.model.jobseekeredit.initializeViewModel(result);
    skillsmart.mediator.jobseekeredit.setViewModel(viewModel);
}
skillsmart.mediator.jobseekeredit.setupViewDataBindings = function ()
{
    $("#first-name").attr("data-bind", "value: firstname");
    $("#last-name").attr("data-bind", "value: lastname");
    $("#birth-day").attr("data-bind", "value: birthday");
    $("#email-address").attr("data-bind", "value: email");
    $("#user-name").attr("data-bind", "value: username");
    $("#password").attr("data-bind", "value: password");
    $("#password-confirm").attr("data-bind", "value: passwordconfirm");

    $("#submit-button").attr("data-bind", "click:submit");
    var viewNode = $('#jobseeker-edit')[0];
    var viewModel = skillsmart.mediator.jobseekeredit.getViewModel();

    viewModel.validationModel = ko.validatedObservable
  ({
      firstname: this.firstname,
      lastname: this.lastname,
      birthday: this.birthday,     
      email: this.email,
      username: this.username,
      password: this.password,
      passwordconfirm:this.passwordconfirm
     
  });
    viewModel.submit = function ()
    {
        if (viewModel.validationModel.isValid())
        {
            var jsonobject = ko.toJS(viewModel);
            var rootUrl = 'http://localhost:2043';
            var apiUrl = '/api/JobSeeker/' + id;
            var dataObj = JSON.stringify(jsonobject);            
            $.ajax({
                url: rootUrl + apiUrl,
                type: "PUT",
                data: dataObj,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    alert('Job Seeker has been updated.');
                    window.location = "JobSeekerList.html"
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else
        {
            viewModel.validationModel.errors.showAllMessages();
        }
    }
    ko.applyBindings(viewModel, viewNode);
}

skillsmart.mediator.jobseekeredit.getViewModel = function ()
{
    return $(document).data("skillsmart.model.jobseekeredit.viewmodel");
}

skillsmart.mediator.jobseekeredit.setViewModel = function (viewModel)
{
    $(document).data("skillsmart.model.jobseekeredit.viewmodel", viewModel);
}