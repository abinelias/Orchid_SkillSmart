if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekeradditionalinformation) == 'undefined') skillsmart.mediator.jobseekeradditionalinformation = {}

skillsmart.mediator.jobseekeradditionalinformation.createViewMediator = function () {
    // Create the view jobseeker additional information view-specific view model
    var apiUrlTitle = GetWebAPIURL() + '/api/Lookup/?name=Title';
    var dataTitleObj;
    //To get title for lookup
    $.ajax({
        url:  apiUrlTitle,
        type: 'GET',
        async: false,
        success: function (data) {
            dataTitleObj = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlSuffix = GetWebAPIURL() + '/api/Lookup/?name=Suffix';
    var dataObjSuffix;
    //To get Suffix for lookup
    $.ajax({
        url:  apiUrlSuffix,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjSuffix = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    //TO get citizenship for lookup
    var apiUrlCitizenship = GetWebAPIURL() + '/api/Lookup/?name=Citizenship';
    var dataObjCitizenship;

    $.ajax({
        url:  apiUrlCitizenship,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjCitizenship = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    //To get Country for lookup
    var apiUrlCountry = GetWebAPIURL() + '/api/Lookup/?name=Country';
    var dataObjCountry;

    $.ajax({
        url:  apiUrlCountry,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjCountry = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var url = window.location.href;
    var userId = url.substring(url.lastIndexOf('=') + 1);

    //To get User details
    var apiUrlJobSeeker = GetWebAPIURL() + '/api/JobSeeker/' + userId;
    var dataObjJobSeeker;

    $.ajax({
        url: apiUrlJobSeeker,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjJobSeeker = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModel = skillsmart.model.jobseekeradditionalinformation.initializeViewModel(dataTitleObj, dataObjSuffix, dataObjCitizenship, dataObjCountry, dataObjJobSeeker);
    skillsmart.mediator.jobseekeradditionalinformation.setViewModel(viewModel);
};
skillsmart.mediator.jobseekeradditionalinformation.setupViewDataBindings = function () {
    $("#first-name").attr("data-bind", "value:firstname");
    $("#middle-name").attr("data-bind", "value:middlename");
    $("#last-name").attr("data-bind", "value:lastname");

    $("#preferred-name").attr("data-bind", "value:preferredname");
    $("#address-line1").attr("data-bind", "value:addressline1");
    $("#address-line2").attr("data-bind", "value:addressline2");
    $("#city").attr("data-bind", "value:city");
    $("#zip").attr("data-bind", "value:zip");
    $("#citizenship").attr("data-bind", "value:citizenship");
    $("#phone").attr("data-bind", "value:phonehome");
    $("#userPassword").attr("data-bind", "value:password");
    $("#email-address").attr("data-bind", "value:email");
    $("#country").attr("data-bind", "options:country,optionsText: 'name', optionsValue: 'id', value: selectedCountryItem");
    $("#title").attr("data-bind", "options:title,optionsText: 'name', optionsValue: 'id', value: selectedTitleItem");
    $("#suffix").attr("data-bind", "options:suffix,optionsText: 'name', optionsValue: 'id', value: selectedSuffixItem");
    $("#citizenship").attr("data-bind", "options:citizenship,optionsText: 'name', optionsValue: 'id', value: selectedCitizenshipItem");
    $("#state").attr("data-bind", "options:state,optionsText: 'name', optionsValue: 'id', value: selectedStateItem");
    $(".contact").attr("data-bind", "checked:contact");

    $("#submit-button").attr("data-bind", "click:submit");
    $("#reset-button").attr("data-bind", "click:reset");
    var viewNode = $("#form_div")[0];
    var viewModel = skillsmart.mediator.jobseekeradditionalinformation.getViewModel();

    viewModel.errors = ko.validation.group(viewModel);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false
    });

    viewModel.reset = function () {
        this.preferredname("");
        this.addressline1("");
        this.addressline2("");
        this.city("");
        this.zip("");
        this.phonehome("");
        this.phonemobile("");
        this.emailaddress("");
        this.citizenship("");
    };
    viewModel.selectedCountryItem.subscribe(function (newValue) {
        if (newValue != "") {
            var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + newValue;
            var dataStateObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlState,
                type: 'GET',
                async: false,
                success: function (data) {
                    viewModel.state([]);
                    viewModel.state.push({ name: "Select", id: "" });
                    for (keyState in data) {
                        viewModel.state.push({ name: data[keyState].Name, id: data[keyState].Id });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });
    viewModel.submit = function () {
        if (viewModel.isValid()) {
            var url = window.location.href;
            var userId = url.substring(url.lastIndexOf('=') + 1);

            var jsonObject = ko.toJS(viewModel);

            var jobSeekerAdditionalInfoObj = {}
            jobSeekerAdditionalInfoObj.JobSeekerId = userId;
            jobSeekerAdditionalInfoObj.Title = jsonObject.selectedTitleItem;
            jobSeekerAdditionalInfoObj.Suffix = jsonObject.selectedSuffixItem;
            jobSeekerAdditionalInfoObj.MiddleName = jsonObject.middlename;
            jobSeekerAdditionalInfoObj.PreferedName = jsonObject.preferredname;
            jobSeekerAdditionalInfoObj.AddressLine1 = jsonObject.addressline1;
            jobSeekerAdditionalInfoObj.AddressLine2 = jsonObject.addressline2;
            jobSeekerAdditionalInfoObj.City = jsonObject.city;
            jobSeekerAdditionalInfoObj.StateId = jsonObject.selectedStateItem;
            jobSeekerAdditionalInfoObj.CountryId = jsonObject.selectedCountryItem;
            jobSeekerAdditionalInfoObj.ZipCode = jsonObject.zip;
            jobSeekerAdditionalInfoObj.HomePhone = jsonObject.phonehome;
            jobSeekerAdditionalInfoObj.MethodOfContact = jsonObject.contact;
            jobSeekerAdditionalInfoObj.Citizenship = jsonObject.selectedCitizenshipItem;


            dataObjAdditionalInformation = JSON.stringify(jobSeekerAdditionalInfoObj);
            var apiUrlSubmit = GetWebAPIURL() + '/api/AdditionalInformation/';

            //To create additional information of jobseeker
            $.ajax({
                url:  apiUrlSubmit,
                type: "POST",
                data: dataObjAdditionalInformation,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });


            var jobSeekerEditObj = {}
            jobSeekerEditObj.FirstName = jsonObject.firstname;
            jobSeekerEditObj.LastName = jsonObject.lastname;
            jobSeekerEditObj.Email = jsonObject.email;
            jobSeekerEditObj.Password = jsonObject.password;
            dataObjJobSeeker = JSON.stringify(jobSeekerEditObj);

            var apiUrlJobSeekerEdit = GetWebAPIURL() + '/api/JobSeeker/' + userId;
            var dataObjJobSeeker = JSON.stringify(jobSeekerEditObj);

            //To update details of jobseekers
            $.ajax({
                url: apiUrlJobSeekerEdit,
                type: "PUT",
                data: dataObjJobSeeker,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    window.location = "JobSeekerList.html"
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

skillsmart.mediator.jobseekeradditionalinformation.getViewModel = function () {
    return $(document).data("skillsmart.model.jobseekeradditionalinformation.viewmodel");
}

skillsmart.mediator.jobseekeradditionalinformation.setViewModel = function (viewModel) {
    $(document).data("skillsmart.model.jobseekeradditionalinformation.viewmodel", viewModel);
}

