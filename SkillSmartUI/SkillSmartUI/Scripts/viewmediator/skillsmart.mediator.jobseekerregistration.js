if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekerregistration) == 'undefined') skillsmart.mediator.jobseekerregistration = {}

skillsmart.mediator.jobseekerregistration.createViewMediator = function ()
{

    // Create the view jobseeker registration view-specific view model
    var viewModel = skillsmart.model.jobseekerregistration.initializeViewModel();

    // Save the view model
    skillsmart.mediator.jobseekerregistration.setViewModel(viewModel);
}

skillsmart.mediator.jobseekerregistration.setupViewDataBindings = function ()
{

    $("#first-name").attr("data-bind", "value: firstname");
    $("#last-name").attr("data-bind", "value: lastname");
    $("#birth-day").attr("data-bind", "value: birthday");
    $("#email-address").attr("data-bind", "value: email");
    $("#user-name").attr("data-bind", "value: username");
    $("#password").attr("data-bind", "value: password");
    $("#confirm-password").attr("data-bind", "value: passwordconfirm");
    $(".gender").attr("data-bind", "checked:gender");
    $(".contact").attr("data-bind", "checked:contact");    

    $("#submit-button").attr("data-bind", "click:submit");
    $("#reset-button").attr("data-bind", "click:reset");
    var viewNode = $('#jobseeker-registration')[0];
    var viewModel = skillsmart.mediator.jobseekerregistration.getViewModel();


    viewModel.reset = function () {
        this.firstname("");
        this.lastname("");
        this.email("");
        this.birthday("");
        this.username("");
        this.password("");
        this.passwordconfirm("");
    };

   /* viewModel.validationModel = ko.validatedObservable
   ({
       firstname: this.firstname,
       lastname: this.lastname,
       birthday: this.birthday,
       username: this.username,
       password: this.password,
       email: this.email,
       passwordconfirm: this.passwordconfirm
   });*/

    viewModel.errors = ko.validation.group(viewModel);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true
    });
    
    viewModel.submit = function ()
    {
        //viewModel.showErrors(true);
        if (viewModel.isValid())
        {
            //if (!viewModel.isConfirmed()) { return false;}
            var jsonObject = ko.toJS(viewModel);
            alert(jsonObject.gender);
            alert(jsonObject.contact);
            var dataObj;
        }
        else
        {
            viewModel.errors.showAllMessages();
        }

           /*  var jobSeekerObj = {}
             jobSeekerObj.FirstName = jsonObject.firstname;
             jobSeekerObj.LastName = jsonObject.lastname;
             jobSeekerObj.Email = jsonObject.email;
             jobSeekerObj.BirthDay = jsonObject.birthday;
             jobSeekerObj.UserName = jsonObject.username;
             jobSeekerObj.Password = jsonObject.password;
 
             dataObj = JSON.stringify(jobSeekerObj);
 
             var rootUrl = 'http://localhost:2043';
             var apiUrl = '/api/JobSeeker/';
 
             $.ajax({
                 url: rootUrl + apiUrl,
                 type: "POST",
                 data: dataObj,
                 contentType: "application/json; charset=utf-8",
                 async: false,
                 success: function (data) {
                     alert('Job Seeker has been added.');
                     window.location = "JobSeekerList.html"
                 },
                 error: function (xhr, error) {
                     alert('Error :' + error);
                 }
             });
         }
         else {
 
             viewModel.validationModel.errors.showAllMessages();
         }       */         

    };
   
    ko.applyBindings(viewModel, viewNode);
}



skillsmart.mediator.jobseekerregistration.getViewModel = function () {
    return $(document).data("skillsmart.model.jobseekerregistration.viewmodel");
}

skillsmart.mediator.jobseekerregistration.setViewModel = function (viewModel) {
    $(document).data("skillsmart.model.jobseekerregistration.viewmodel", viewModel);
}
