if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekeradditionalinformationedit) == 'undefined') skillsmart.mediator.jobseekeradditionalinformationedit = {}
var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
skillsmart.mediator.jobseekeradditionalinformationedit.createViewMediator = function () {
    // Create the view jobseeker additional information view-specific view model
    var rootUrl = 'http://localhost:2043';
    var apiUrlJobSeeker = GetWebAPIURL() + '/api/JobSeeker/' + userId;
    var dataObjJobSeeker;

    //TO get Jobseeker details
    $.ajax({
        url:  apiUrlJobSeeker,
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

    var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/' + userId;
    var dataObjAdditionalInfo;

    //TO get Jobseeker addtional information
    $.ajax({
        url:  apiUrlAdditionalInfo,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjAdditionalInfo = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    var rootUrl = 'http://localhost:2043';
    var apiUrlTitle = GetWebAPIURL() + '/api/Lookup/?name=Title';
    var dataTitleObj;

    //TO get title for lookup
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

    //To get suffix for lookup
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

    var apiUrlCitizenship = GetWebAPIURL() + '/api/Lookup/?name=Citizenship';
    var dataObjCitizenship;

    //To get citizenship for lookup
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

    var apiUrlCountry = GetWebAPIURL() + '/api/Lookup/?name=Country';
    var dataObjCountry;

    //To get country for lookup
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

    var stateId = dataObjAdditionalInfo.CountryId;
    var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + stateId;
    var dataStateObj;

    //To get State for lookup
    $.ajax({
        url: apiUrlState,
        type: 'GET',
        async: false,
        success: function (data) {
            dataStateObj = data;
           
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModel = skillsmart.model.jobseekeradditionalinformationedit.initializeViewModel(dataTitleObj, dataObjSuffix, dataObjCitizenship, dataObjCountry, dataObjJobSeeker, dataObjAdditionalInfo, dataStateObj);
    skillsmart.mediator.jobseekeradditionalinformationedit.setViewModel(viewModel);
};
skillsmart.mediator.jobseekeradditionalinformationedit.setupViewDataBindings = function () {
    $("#first-name").attr("data-bind", "value:firstname");
    $("#middle-name").attr("data-bind", "value:middlename");
    $("#last-name").attr("data-bind", "value:lastname");
    $("#additionalInfoId").attr("data-bind", "value:additionalinfoid");
    $("#preferred-name").attr("data-bind", "value:preferredname");
    $("#address-line1").attr("data-bind", "value:addressline1");
    $("#address-line2").attr("data-bind", "value:addressline2");
    $("#city").attr("data-bind", "value:city");
    $("#zip").attr("data-bind", "value:zip");
    $("#citizenship").attr("data-bind", "value:citizenship");
    $("#phone").attr("data-bind", "value:phonehome");
    $("#email-address").attr("data-bind", "value:email");
    $("#userPassword").attr("data-bind", "value:password");
    $("#country").attr("data-bind", "options:country,optionsText: 'name', optionsValue: 'id', value: selectedCountryItem");
    $("#title").attr("data-bind", "options:title,optionsText: 'name', optionsValue: 'id', value: selectedTitleItem");
    $("#suffix").attr("data-bind", "options:suffix,optionsText: 'name', optionsValue: 'id', value: selectedSuffixItem");
    $("#citizenship").attr("data-bind", "options:citizenship,optionsText: 'name', optionsValue: 'id', value: selectedCitizenshipItem");
    $("#state").attr("data-bind", "options:state,optionsText: 'name', optionsValue: 'id', value: selectedStateItem");
    $(".contact").attr("data-bind", "checked:contact");

    $("#submit-button").attr("data-bind", "click:submit");
    $("#reset-button").attr("data-bind", "click:reset");
    var viewNode = $("#form_div")[0];
    var viewModel = skillsmart.mediator.jobseekeradditionalinformationedit.getViewModel();

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
            var rootUrl = 'http://localhost:2043';
            var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + newValue;

            //To get state for lookup
            $.ajax({
                url:  apiUrlState,
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

            var jobSeekerAdditionalInfoEditObj = {}
            jobSeekerAdditionalInfoEditObj.JobSeekerId = userId;
            jobSeekerAdditionalInfoEditObj.Title = jsonObject.selectedTitleItem;
            jobSeekerAdditionalInfoEditObj.Suffix = jsonObject.selectedSuffixItem;
            jobSeekerAdditionalInfoEditObj.MiddleName = jsonObject.middlename;
            jobSeekerAdditionalInfoEditObj.PreferedName = jsonObject.preferredname;
            jobSeekerAdditionalInfoEditObj.AddressLine1 = jsonObject.addressline1;
            jobSeekerAdditionalInfoEditObj.AddressLine2 = jsonObject.addressline2;
            jobSeekerAdditionalInfoEditObj.City = jsonObject.city;
            jobSeekerAdditionalInfoEditObj.StateId = jsonObject.selectedStateItem;
            jobSeekerAdditionalInfoEditObj.CountryId = jsonObject.selectedCountryItem;
            jobSeekerAdditionalInfoEditObj.ZipCode = jsonObject.zip;
            jobSeekerAdditionalInfoEditObj.HomePhone = jsonObject.phonehome;
            jobSeekerAdditionalInfoEditObj.MethodOfContact = jsonObject.contact;
            jobSeekerAdditionalInfoEditObj.Citizenship = jsonObject.selectedCitizenshipItem;

            var apiUrlAdditionalInfoEdit = GetWebAPIURL() + '/api/AdditionalInformation/' + jsonObject.additionalinfoid;
            var dataObjAdditionalInfo = JSON.stringify(jobSeekerAdditionalInfoEditObj);

            //Update additional information
            $.ajax({
                url:  apiUrlAdditionalInfoEdit,
                type: "PUT",
                data: dataObjAdditionalInfo,
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

            //Updates Jobseekers
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
        else
        {
            viewModel.displayErrors(true);
        }
    };
    ko.applyBindings(viewModel, viewNode);


}

skillsmart.mediator.jobseekeradditionalinformationedit.getViewModel = function () {
    return $(document).data("skillsmart.model.jobseekeradditionalinformationedit.viewmodel");
}

skillsmart.mediator.jobseekeradditionalinformationedit.setViewModel = function (viewModel) {
    $(document).data("skillsmart.model.jobseekeradditionalinformationedit.viewmodel", viewModel);
}
