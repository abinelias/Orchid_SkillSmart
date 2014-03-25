if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekermyinformation) == 'undefined') skillsmart.mediator.jobseekermyinformation = {}

var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

skillsmart.mediator.jobseekermyinformation.createViewMediatorMyInformation = function () {
    var apiUrlJobSeeker = GetWebAPIURL() + '/api/JobSeeker/' + userId;
    var dataObjJobSeeker;
    //TO get Jobseeker Details
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

    var apiUrlAdditionalInfo = GetWebAPIURL() + '/api/AdditionalInformation/' + userId;
    var dataObjAdditionalInfo;

    //TO get Jobseeker addtional information
    $.ajax({
        url: apiUrlAdditionalInfo,
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


    var apiUrlCountry = GetWebAPIURL() + '/api/Lookup/?name=Country&id=' + dataObjAdditionalInfo.CountryId;
    var dataCountryObj;

    //To get Country Name
    $.ajax({
        url: apiUrlCountry,
        type: 'GET',
        async: false,
        success: function (data) {
            dataCountryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    var viewModelMyInformation = skillsmart.model.jobseekermyinformation.initializeViewModelMyInformation(dataObjJobSeeker, dataObjAdditionalInfo, dataCountryObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelMyInformation", viewModelMyInformation);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsMyInformation = function () {
    $("#name").attr("data-bind", "text:name");
    $("#address").attr("data-bind", "text:address");
    var viewNode = $("#jobseeker-myinformation")[0];
    var viewModelMyInformation = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelMyInformation");

    ko.applyBindings(viewModelMyInformation, viewNode);

}

skillsmart.mediator.jobseekermyinformation.createViewMediatorPersonalInformation = function () {


    $("#edit-personal-information").hide();
    $("#submit").hide();

    var apiUrlOverview = GetWebAPIURL() + '/api/Overview/' + userId;
    var dataObjOverview;
    //To get overview details
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjOverview = data;
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });


    var apiUrlSecurityCleareance = GetWebAPIURL() + '/api/Lookup/?name=SecurityClearance';
    var dataSecurityCleareanceObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlSecurityCleareance,
        type: 'GET',
        async: false,
        success: function (data) {
            dataSecurityCleareanceObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlWillingToRelocate = GetWebAPIURL() + '/api/Lookup/?name=WillingToRelocate';
    var dataWillingToRelocate;

    //TO get details of willing to relocate lookup details
    $.ajax({
        url: apiUrlWillingToRelocate,
        type: 'GET',
        async: false,
        success: function (data) {
            dataWillingToRelocate = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlGetSecurityCleareance = GetWebAPIURL() + '/api/Lookup/?name=SecurityClearance&id=' + dataObjOverview.SecurityClearanceId;
    var dataObjGetSecurityCleareance;

    //To get security cleareance name
    $.ajax({
        url: apiUrlGetSecurityCleareance,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjGetSecurityCleareance = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlGetWillingToRelocate = GetWebAPIURL() + '/api/Lookup/?name=WillingToRelocate&id=' + dataObjOverview.WillingToRelocateId;
    var dataObjGetWillingToRelocate;

    //To get willing to relocate name
    $.ajax({
        url: apiUrlGetWillingToRelocate,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjGetWillingToRelocate = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModelPersonalInformation = skillsmart.model.jobseekermyinformation.initializeViewModelPersonalInformation(dataObjOverview, dataSecurityCleareanceObj, dataWillingToRelocate, dataObjGetSecurityCleareance, dataObjGetWillingToRelocate);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelPersonalInformation", viewModelPersonalInformation);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsPersonalInformation = function () {

    $("#myInfoId").attr("data-bind", "value:myinfoid");


    $("#industries-label").attr("data-bind", "text:industriesLabel");
    $("#industries-textbox").attr("data-bind", "value:industriesTextbox");

    $("#speciality-label").attr("data-bind", "text:specialityLabel");
    $("#speciality-textbox").attr("data-bind", "value:specialityTextbox");

    $("#WillingToRelocateLabel-label").attr("data-bind", "text:WillingToRelocateLabel");
    $("#SecurityCleareanceLabel-label").attr("data-bind", "text:SecurityCleareanceLabel");

    $("#securityCleareanceDropDown").attr("data-bind", "options:SecurityCleareance,optionsText: 'name', optionsValue: 'id', value: selectedSecurityCleareanceItem");
    $("#willingToRelocateDropDown").attr("data-bind", "options:WillingToRelocate,optionsText: 'name', optionsValue: 'id', value: selectedWillingToRelocate");

    $("#edit").attr("data-bind", "click:edit");
    $("#submit").attr("data-bind", "click:submit");

    var viewNode = $("#personal-information")[0];
    var viewModelPersonalInformation = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelPersonalInformation");

    viewModelPersonalInformation.errors = ko.validation.group(viewModelPersonalInformation);
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: false
    });
    viewModelPersonalInformation.edit = function () {
        $("#personal-container").hide();
        $("#edit").hide();
        $("#edit-personal-information").show();
        $("#submit").show();
    };
    viewModelPersonalInformation.submit = function () {

        if (viewModelPersonalInformation.isValid()) {
            var jsonObject = ko.toJS(viewModelPersonalInformation);

            var dataObjMyInfo;

            var jobSeekerMyInfoObj = {}
            jobSeekerMyInfoObj.JobSeekerId = userId;
            jobSeekerMyInfoObj.Industry = jsonObject.industriesTextbox;
            jobSeekerMyInfoObj.Speciality = jsonObject.specialityTextbox;
            jobSeekerMyInfoObj.SecurityClearanceId = jsonObject.selectedSecurityCleareanceItem;
            jobSeekerMyInfoObj.WillingToRelocateId = jsonObject.selectedWillingToRelocate;

            dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);

            var rootUrl = 'http://localhost:2043';
            var apiUrlMyInfoUpdate = '/api/Overview/' + jsonObject.myinfoid;


            $.ajax({
                url: rootUrl + apiUrlMyInfoUpdate,
                type: "PUT",
                data: dataObjMyInfo,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    location.reload();
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
        else {

            viewModelPersonalInformation.displayErrors(true);
        }
    }
    ko.applyBindings(viewModelPersonalInformation, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorAboutMe = function () {
    var apiUrlOverview = GetWebAPIURL() + '/api/Overview/' + userId;
    var dataObjOverview;

    //To get overview details
    $.ajax({
        url: apiUrlOverview,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjOverview = data;
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });
    if (dataObjOverview.Summary != null) {
        $("#show_aboutme_div").show();
        $("#edit_aboutme_div").hide();
        $("#edit-pitch").show();
        $("#aboutme_div").hide();
        $("#submit-pitch").hide();
    }
    else {
        $("#show_aboutme_div").hide();
        $("#aboutme_div").show();
        $("#edit-pitch").hide();
        $("#submit-pitch").hide();
        $("#aboutme").hide();

    }
    var viewModelAboutMe = skillsmart.model.jobseekermyinformation.initializeViewModelAboutMe(dataObjOverview);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelAboutMe", viewModelAboutMe);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsAboutMe = function () {
    $("#myInfoId").attr("data-bind", "value:myinfoid");
    $("#aboutme").attr("data-bind", "value:summary");
    $("#show-summary").attr("data-bind", "text:summary");

    $("#pitch-yourself").attr("data-bind", "click:pitchYourself");
    $("#submit-pitch").attr("data-bind", "click:submitPitch");
    $("#edit-pitch").attr("data-bind", "click:editPitch");


    var viewNode = $("#aboutme_main_div")[0];
    var viewModelAboutMe = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAboutMe");


    viewModelAboutMe.pitchYourself = function () {
        $("#aboutme_div").hide();
        $("#aboutme").show();
        $("#submit-pitch").show();
    }

    viewModelAboutMe.submitPitch = function () {

        var apiUrlOverview = GetWebAPIURL() + '/api/Overview/' + userId;
        var dataObjOverview;


        //To get overview details
        $.ajax({
            url: apiUrlOverview,
            type: 'GET',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dataObjOverview = data;
            },
            error: function (xhr, status, error) {
                alert('Eroooror :' + status);
            }
        });


        var jsonObject = ko.toJS(viewModelAboutMe);
        var jobSeekerMyInfoObj = {}
        jobSeekerMyInfoObj.JobSeekerId = userId;
        jobSeekerMyInfoObj.Summary = jsonObject.summary;
        jobSeekerMyInfoObj.Industry = dataObjOverview.Industry;
        jobSeekerMyInfoObj.Speciality = dataObjOverview.Speciality;
        jobSeekerMyInfoObj.SecurityClearanceId = dataObjOverview.SecurityClearanceId;
        jobSeekerMyInfoObj.WillingToRelocateId = dataObjOverview.WillingToRelocateId;

        dataObjMyInfo = JSON.stringify(jobSeekerMyInfoObj);

        var apiUrlAboutMe = GetWebAPIURL() + '/api/Overview/' + jsonObject.myinfoid;

        alert(jsonObject.summary);
        $.ajax({
            url: apiUrlAboutMe,
            type: "PUT",
            data: dataObjMyInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        $("#edit_aboutme_div").hide();
        $("#show_aboutme_div").show();
        $("#submit-pitch").hide();
        $("#edit-pitch").show();
    }
    viewModelAboutMe.editPitch = function () {
        $("#edit_aboutme_div").show();
        $("#show_aboutme_div").hide();
        $("#submit-pitch").show();
        $("#edit-pitch").hide();
        $("#aboutme").show();
    }

    ko.applyBindings(viewModelAboutMe, viewNode);

}

skillsmart.mediator.jobseekermyinformation.createViewMediatorActivitiesInsertion = function () {
    var viewModelActivitiesInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelActivitiesInsertion();
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesInsertion", viewModelActivitiesInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsActivitiesInsertion = function () {
    $("#hobbies").attr("data-bind", "value:hobbies");
    $("#JobseekerIdActivity").attr("data-bind", "value:JobSeekerId");
    $("#activity-id").attr("data-bind", "value:activityid");


    $("#add-activities").attr("data-bind", "click:addActivities");
    $("#submit-activities").attr("data-bind", "click:submitActivities");
    $("#cancel-activities").attr("data-bind", "click:cancelActivities");
    $("#delete-activities").attr("data-bind", "click:deleteActivities");
    $("#edit-activities").attr("data-bind", "click:editActivities");
    $("#addmore-activities").attr("data-bind", "click:addmoreActivities");

    var viewNode = $("#activities_insertion_div")[0];
    var viewModelActivitiesInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesInsertion");

    viewModelActivitiesInsertion.addActivities = function () {
        $("#activities_general_div").hide();
        $("#edit_activities_div").show();
        $("#submit-activities").show();
        $("#edit_individual_activities").hide();
        $("#addmore-activities").show();
        $("#edit-activities").hide();
        this.JobSeekerId(userId);
    }

    viewModelActivitiesInsertion.addmoreActivities = function () {
        $("#edit_activities_div").show();
        $("#submit-activities").show();
        this.JobSeekerId(userId);
        this.hobbies("");
        this.activityid("");
    }

    viewModelActivitiesInsertion.submitActivities = function () {
        var viewModelActivitiesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesList");
        var jsonObject = ko.toJS(viewModelActivitiesInsertion);


        if (jsonObject.activityid) {
            var dataObjActivities;
            var jobSeekerActivitiesObj = {}
            jobSeekerActivitiesObj.Activity = jsonObject.hobbies;
            jobSeekerActivitiesObj.JobSeekerId = userId;
            dataObjActivities = JSON.stringify(jobSeekerActivitiesObj);

            var apiUrlExtracurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity/?Id=' + jsonObject.activityid;

            //To create Extracurricular Activity
            $.ajax({
                url: apiUrlExtracurricularActivity,
                type: "PUT",
                data: dataObjActivities,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var activityObject;
                    for (var i = 0, len = viewModelActivitiesList.activities().length; i < len; ++i) {
                        activityObject = viewModelActivitiesList.activities()[i];
                        var result = activityObject.Id().localeCompare(jsonObject.activityid);
                        if (result == 0) {
                            activityObject.Activity(jsonObject.hobbies);
                            activityObject.JobSeekerId(jsonObject.JobSeekerId);
                            viewModelActivitiesList.activities()[i] = activityObject;
                            break;
                        }
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

            this.hobbies("");
            this.activityid("");
            $("#edit_activities_div").hide();
        }
        else {


            var dataObjActivities;
            var jobSeekerActivitiesObj = {}
            jobSeekerActivitiesObj.Activity = jsonObject.hobbies;
            jobSeekerActivitiesObj.JobSeekerId = jsonObject.JobSeekerId;
            dataObjActivities = JSON.stringify(jobSeekerActivitiesObj);

            var apiUrlExtracurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity';

            //To create Extracurricular Activity
            $.ajax({
                url: apiUrlExtracurricularActivity,
                type: "POST",
                data: dataObjActivities,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails();
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.hobbies("");
            this.activityid("");
            $("#edit_activities_div").hide();
            $("#edit_individual_activities").show();
            $("#list_activities_div").hide();
        }
        function getDetails() {

            var apiUrlExtracurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity/?jobSeekerId=' + userId;
            var dataObjActivities;


            //To get ExtracurricularActivity details
            $.ajax({
                url: apiUrlExtracurricularActivity,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataObjActivities = data;
                    viewModelActivitiesList.activities.removeAll();
                    for (da in dataObjActivities) {
                        var activities = {
                            Activity: ko.observable(''),
                            Id: ko.observable(''),
                            JobSeekerId: ko.observable('')
                        };

                        activities.Activity(dataObjActivities[da].Activity);
                        activities.Id(dataObjActivities[da].Id);
                        activities.JobSeekerId(dataObjActivities[da].JobSeekerId);
                        viewModelActivitiesList.activities.push(activities);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesList", viewModelActivitiesList);


        }

    }
    viewModelActivitiesInsertion.deleteActivities = function () {

        var viewModelActivitiesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesList");
        var jsonObject = ko.toJS(viewModelActivitiesInsertion);
        if (jsonObject.activityid) {
            var apiUrlExtracurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity/?Id=' + jsonObject.activityid;
            $.ajax({
                url: apiUrlExtracurricularActivity,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var activityObject;

                    for (var i = 0, len = viewModelActivitiesList.activities().length; i < len; ++i) {
                        activityObject = viewModelActivitiesList.activities()[i];
                        var result = activityObject.Id().localeCompare(jsonObject.activityid);
                        if (result == 0) {
                            viewModelActivitiesList.activities.remove(activityObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.hobbies("");
            this.activityid("");
            $("#edit_activities_div").hide();
        }
        else {
            alert("No Item selected");
        }


    }

    viewModelActivitiesInsertion.editActivities = function () {
        $("#addmore-activities").show();
        $("#edit_activities_div").hide();
        $("#edit_individual_activities").show();
        $("#list_activities_div").hide();
        $("#edit-activities").hide();
        $("#activities_general_div").hide();
        $("#submit-activities").hide();
    }
    viewModelActivitiesInsertion.cancelActivities = function () {
        this.hobbies("");
        this.activityid("");
        // this.JobSeekerId("");
        $("#edit_activities_div").hide();
    }

    ko.applyBindings(viewModelActivitiesInsertion, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorActivitiesListing = function () {
    var apiUrlExtraCurricularActivity = GetWebAPIURL() + '/api/ExtraCurricularActivity?jobSeekerId=' + userId;
    var dataObjActivities;

    //To get Activities from ExtraCurricularActivities table
    $.ajax({
        url: apiUrlExtraCurricularActivity,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjActivities = data;

            if (dataObjActivities.length != 0) {
                $("#edit_activities_div").hide();
                $("#submit-activities").hide();
                $("#activities_general_div").hide();
                $("#addmore-activities").hide();
                $("#edit_individual_activities").hide();

            }
            else {
                $("#edit_activities_div").hide();
                $("#activities_general_div").show();
                $("#submit-activities").hide();
                $("#addmore-activities").hide();
                $("#edit-activities").hide();
            }
        },
        error: function (xhr, status, error) {
            alert('Eroooror12 :' + status);
        }
    });


    var viewModelActivitiesList = skillsmart.model.jobseekermyinformation.initializeViewModelActivitiesListing(dataObjActivities);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesList", viewModelActivitiesList);

    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesListNonEditMode", viewModelActivitiesList);

}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsActivitiesListing = function () {
    var viewNode = $("#edit_individual_activities")[0];
    var viewNodeNonEditMode = $("#list_activities_div")[0];

    var viewModelActivitiesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesList");
    var viewModelActivitiesListNonEditMode = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesListNonEditMode");

    var viewModelActivitiesInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelActivitiesInsertion");

    viewModelActivitiesList.editActivityDetails = function (activityObj) {
        var jsonObj = ko.toJSON(activityObj);
        var obj = JSON.parse(jsonObj);

        $("#edit_activities_div").show();
        $("#submit-activities").show();

        $("#hobbies").val(obj.Activity);
        $("#activity-id").val(obj.Id);
        $("#JobseekerIdActivity").val(obj.JobSeekerId);
        viewModelActivitiesInsertion.activityid(obj.Id);
        viewModelActivitiesInsertion.hobbies(obj.Activity);

        alert(ko.JSON(viewModelActivitiesInsertion));
    }
    ko.applyBindings(viewModelActivitiesList, viewNode);
    ko.applyBindings(viewModelActivitiesListNonEditMode, viewNodeNonEditMode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorAwardsInsertion = function () {
    var viewModelAwardsInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelAwardsInsertion();
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsInsertion", viewModelAwardsInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsAwardsInsertion = function () {

    $("#awards-title").attr("data-bind", "value:title");
    $("#awards-description").attr("data-bind", "value:description");
    $("#awards-id").attr("data-bind", "value:awardid");
    $("#jobseekerId").attr("data-bind", "value:jobseekerid");

    $("#add-allocades").attr("data-bind", "click:addAwards");
    $("#submit-awards").attr("data-bind", "click:submitAwards");
    $("#delete-awards").attr("data-bind", "click:deleteAwards");
    $("#cancel-awards").attr("data-bind", "click:cancelAwards");
    $("#edit-awards").attr("data-bind", "click:editAwards");
    $("#addmore-awards").attr("data-bind", "click:addmoreAwards");



    var viewNode = $("#award_insertion")[0];
    var viewModelAwardsInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsInsertion");



    viewModelAwardsInsertion.addAwards = function () {
        $("#awards_general").hide();
        $("#edit_awards_div").show();
        $("#addmore-awards").show();
        this.jobseekerid(userId);
    }

    viewModelAwardsInsertion.addmoreAwards = function () {
        $("#edit_awards_div").show();
        this.jobseekerid(userId);
        this.title("");
        this.description("");
        this.awardid("");
    }

    viewModelAwardsInsertion.cancelAwards = function () {
        this.title("");
        this.description("");
        this.awardid("");
        //this.jobseekerid(""); 
        $("#edit_awards_div").hide();
    }

    viewModelAwardsInsertion.submitAwards = function () {
        $("#List-awards").hide();
        var viewModelAwardsList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListing");

        var jsonObject = ko.toJS(viewModelAwardsInsertion);


        if (jsonObject.awardid) {
            var dataObjAwards;
            var jobSeekerAwardsObj = {}
            jobSeekerAwardsObj.JobSeekerId = userId;
            jobSeekerAwardsObj.ScholarshipTitle = jsonObject.title;
            jobSeekerAwardsObj.ScholarshipDescription = jsonObject.description;

            dataObjAwards = JSON.stringify(jobSeekerAwardsObj);

            var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship?Id=' + jsonObject.awardid;

            $.ajax({
                url: apiUrlScholarShip,
                type: "PUT",
                data: dataObjAwards,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    for (var i = 0, len = viewModelAwardsList.awards().length; i < len; ++i) {
                        awardObject = viewModelAwardsList.awards()[i];
                        var result = awardObject.Id().localeCompare(jsonObject.awardid);
                        if (result == 0) {
                            awardObject.ScholarshipTitle(jsonObject.title);
                            awardObject.ScholarshipDescription(jsonObject.description);
                            awardObject.jobseekerId(jsonObject.jobseekerid);
                            viewModelAwardsList.awards()[i] = awardObject;
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.title("");
            this.description("");
            this.awardid("");
            $("#edit_awards_div").hide();
        }
        else {
            var dataObjAwards;
            var jobSeekerAwardsObj = {}
            jobSeekerAwardsObj.JobSeekerId = jsonObject.jobseekerid;
            jobSeekerAwardsObj.ScholarshipTitle = jsonObject.title;
            jobSeekerAwardsObj.ScholarshipDescription = jsonObject.description;

            dataObjAwards = JSON.stringify(jobSeekerAwardsObj);

            var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship';

            $.ajax({
                url: apiUrlScholarShip,
                type: "Post",
                data: dataObjAwards,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails()
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.title("");
            this.description("");
            this.awardid("");
            $("#edit_awards_div").hide();
        }
        function getDetails() {

            var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship?jobSeekerId=' + userId;
            var dataObjScholarShip;


            //To get Scholarship details
            $.ajax({
                url: apiUrlScholarShip,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataObjScholarShip = data;
                    viewModelAwardsList.awards.removeAll();
                    for (da in dataObjScholarShip) {
                        var awards = {
                            ScholarshipTitle: ko.observable(''),
                            ScholarshipDescription: ko.observable(''),
                            Id: ko.observable(''),
                            jobseekerId: ko.observable('')
                        };

                        awards.ScholarshipTitle(dataObjScholarShip[da].ScholarshipTitle);
                        awards.ScholarshipDescription(dataObjScholarShip[da].ScholarshipDescription);
                        awards.Id(dataObjScholarShip[da].Id);
                        awards.jobseekerId(dataObjScholarShip[da].JobSeekerId);
                        viewModelAwardsList.awards.push(awards);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListing", viewModelAwardsList);

        }


    }

    viewModelAwardsInsertion.deleteAwards = function () {
        var viewModelAwardsList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListing");
        var jsonObject = ko.toJS(viewModelAwardsInsertion);
        if (jsonObject.awardid) {
            var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship?Id=' + jsonObject.awardid;
            $.ajax({
                url: apiUrlScholarShip,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var awardObject;
                    for (var i = 0, len = viewModelAwardsList.awards().length; i < len; ++i) {
                        awardObject = viewModelAwardsList.awards()[i];
                        var result = awardObject.Id().localeCompare(jsonObject.awardid);
                        if (result == 0) {
                            viewModelAwardsList.awards.remove(awardObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.title("");
            this.description("");
            this.awardid("");
            $("#edit_awards_div").hide();
        }
        else {
            alert("No Item selected");
        }

    }

    viewModelAwardsInsertion.editAwards = function () {

        $("#addmore-awards").show();
        $("#edit_awards_div").hide();
        $("#edit-modeList").show();
        $("#List-awards").hide();
        $("#edit-awards").hide();
        $("#awards_general").hide();

    }

    ko.applyBindings(viewModelAwardsInsertion, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorAwardsListing = function () {
    var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship?jobSeekerId=' + userId;
    var dataObjScholarShip;


    //To get Scholarship details
    $.ajax({
        url: apiUrlScholarShip,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjScholarShip = data;
            if (dataObjScholarShip.length != 0) {
                $("#edit_awards_div").hide();
                $("#awards_general").hide();
                $("#edit-modeList").hide();
                $("#addmore-awards").hide();

                $("#edit-awards").show();

            }
            else {
                $("#edit_awards_div").hide();
                $("#awards_general").show();
                $("#addmore-awards").hide();
                $("#edit-awards").hide();

            }
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });

    var viewModelAwardsList = skillsmart.model.jobseekermyinformation.initializeViewModelAwardsListing(dataObjScholarShip);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListing", viewModelAwardsList);

    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListingNonEditMode", viewModelAwardsList);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsAwardsListing = function () {
    var viewNode = $("#edit-modeList")[0];
    var viewNodeNonEditMode = $("#List-awards")[0];
    var viewModelAwardsList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListing");
    var viewModelAwardsListNonEditMode = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsListingNonEditMode");


    var viewModelAwardsInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelAwardsInsertion");


    viewModelAwardsList.editAwardDetails = function (awardObj) {
        var jsonObj = ko.toJSON(awardObj);
        var obj = JSON.parse(jsonObj);

        $("#edit_awards_div").show();

        $("#awards-title").val(obj.ScholarshipTitle);
        $("#awards-description").val(obj.ScholarshipDescription);
        $("#awards-id").val(obj.Id);
        $("#jobseekerId").val(obj.jobseekerId);

        viewModelAwardsInsertion.awardid(obj.Id);
        viewModelAwardsInsertion.title(obj.ScholarshipTitle);
        viewModelAwardsInsertion.description(obj.ScholarshipDescription);
    }

    ko.applyBindings(viewModelAwardsList, viewNode);
    ko.applyBindings(viewModelAwardsListNonEditMode, viewNodeNonEditMode);

}

skillsmart.mediator.jobseekermyinformation.createViewMediatorLanguagesInsertion = function () {
    var apiUrlLanguageList = GetWebAPIURL() + '/api/Lookup/?name=LanguageList';
    var dataLanguageListObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlLanguageList,
        type: 'GET',
        async: false,
        success: function (data) {
            dataLanguageListObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlProficiency = GetWebAPIURL() + '/api/Lookup/?name=Proficiency';
    var dataProficiencyObj;

    //TO get details of willing to relocate lookup details
    $.ajax({
        url: apiUrlProficiency,
        type: 'GET',
        async: false,
        success: function (data) {
            dataProficiencyObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModelLanguagesInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelLanguagesInsertion(dataLanguageListObj, dataProficiencyObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesInsertion", viewModelLanguagesInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsLanguagesInsertion = function () {
    // $("#myInfoId").attr("data-bind", "value:myinfoid");
    $("#language_Id").attr("data-bind", "value:Id");
    $("#jobSeeker_Id").attr("data-bind", "value:jobSeekerId");

    $("#LanguageList").attr("data-bind", "options:LanguageList,optionsText: 'name', optionsValue: 'id', value: selectedLanguage");
    $("#ProficiencyList").attr("data-bind", "options:Proficiency,optionsText: 'name', optionsValue: 'id', value: selectedProficiency");

    $("#LanguageNameLabel").attr("data-bind", "text:LanguageLabel");
    $("#Add_more_languages").attr("data-bind", "click:addmoreLanguages");
    $("#Edit_languages").attr("data-bind", "click:editLanguages");
    $("#Add_first_language").attr("data-bind", "click:addFirstLanguage");
    $("#Save_languages").attr("data-bind", "click:saveLanguages");
    $("#Cancel_language").attr("data-bind", "click:cancelLanguage");
    $("#Delete_language").attr("data-bind", "click:deleteLanguage");



    var viewNode = $("#Language_insertion")[0];
    var viewModelLanguagesInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesInsertion");

    viewModelLanguagesInsertion.addFirstLanguage = function () {
        this.jobSeekerId(userId);
        $("#Language_general").hide();
        $("#Edit_language_div").show();
        $("#Add_more_languages").show();

    }

    viewModelLanguagesInsertion.editLanguages = function () {
        $("#Add_more_languages").show();
        $("#Edit_language_div").hide();
        $("#Language_list_editable").show();
        $("#Language_list_noneditable").hide();
        $("#Edit_languages").hide();
        $("#Language_general").hide();
    }

    viewModelLanguagesInsertion.addmoreLanguages = function () {
        $("#Edit_language_div").show();
        $("#LanguageList").show();
        $("#Language_list_noneditable").hide();
        this.languageId('');
        this.jobSeekerId(userId);
        this.LanguageLabel('');
        this.selectedLanguage('');
        this.selectedProficiency('');
        this.Id('');


    }

    viewModelLanguagesInsertion.saveLanguages = function () {
        var viewModelLanguagesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesList");

        var jsonObject = ko.toJS(viewModelLanguagesInsertion);
        if (jsonObject.Id) {
            var dataObjAwards;
            var jobSeekerAwardsObj = {}
            jobSeekerAwardsObj.JobSeekerId = jsonObject.jobSeekerId;
            jobSeekerAwardsObj.LanguageId = jsonObject.languageId;
            jobSeekerAwardsObj.ProficiencyId = jsonObject.selectedProficiency;

            dataObjAwards = JSON.stringify(jobSeekerAwardsObj);


            var apiUrlScholarShip = GetWebAPIURL() + '/api/Language?Id=' + jsonObject.Id;

            $.ajax({
                url: apiUrlScholarShip,
                type: "PUT",
                data: dataObjAwards,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    for (var i = 0, len = viewModelLanguagesList.languages().length; i < len; ++i) {
                        languageObject = viewModelLanguagesList.languages()[i];
                        var result = languageObject.Id().localeCompare(jsonObject.Id);
                        if (result == 0) {
                            languageObject.LanguageId(jsonObject.languageId);
                            languageObject.JobSeekerId(jsonObject.jobSeekerId);
                            languageObject.ProficiencyId(jsonObject.selectedProficiency);
                            languageObject.Id(jsonObject.Id);
                            viewModelLanguagesList.languages()[i] = languageObject;


                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.selectedLanguage("");
            this.selectedProficiency("");
            this.Id("");
            $("#Edit_language_div").hide();
        }
        else {
            var dataObjAwards;
            var jobSeekerAwardsObj = {}

            jobSeekerAwardsObj.JobSeekerId = jsonObject.jobSeekerId;
            jobSeekerAwardsObj.LanguageId = jsonObject.selectedLanguage;
            jobSeekerAwardsObj.ProficiencyId = jsonObject.selectedProficiency;

            dataObjAwards = JSON.stringify(jobSeekerAwardsObj);

            var apiUrlScholarShip = GetWebAPIURL() + '/api/Language';

            $.ajax({
                url: apiUrlScholarShip,
                type: "Post",
                data: dataObjAwards,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails()
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.selectedLanguage("");
            this.selectedProficiency("");
            this.Id("");
            this.LanguageLabel("");
            $("#Edit_language_div").hide();
            $("#Language_list_noneditable").hide();
        }
        function getDetails() {
            var apiUrlLanguageList = GetWebAPIURL() + '/api/Lookup/?name=LanguageList';
            var dataLanguageListObj;

            //To get details of security cleareance lookup
            $.ajax({
                url: apiUrlLanguageList,
                type: 'GET',
                async: false,
                success: function (data) {
                    dataLanguageListObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });

            var apiUrlLanguage = GetWebAPIURL() + '/api/Language?jobSeekerId=' + userId;
            var dataObjLanguages;


            //To get Scholarship details
            $.ajax({
                url: apiUrlLanguage,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataObjLanguages = data;
                    viewModelLanguagesList.languages.removeAll();
                    for (da in dataObjLanguages) {
                        var languages = {
                            LanguageId: ko.observable(''),
                            LanguageName: ko.observable(''),
                            JobSeekerId: ko.observable(''),
                            ProficiencyId: ko.observable(''),
                            Id: ko.observable()
                        };


                        for (key in dataLanguageListObj) {
                            if (dataLanguageListObj[key].Id == dataObjLanguages[da].LanguageId) {
                                languages.LanguageName(dataLanguageListObj[key].Name);
                                break;
                            }
                        }


                        languages.LanguageId(dataObjLanguages[da].LanguageId);
                        languages.JobSeekerId(dataObjLanguages[da].JobSeekerId);
                        languages.ProficiencyId(dataObjLanguages[da].ProficiencyId);
                        languages.Id(dataObjLanguages[da].Id);
                        viewModelLanguagesList.languages.push(languages);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesList", viewModelLanguagesList);

        }
    }

    viewModelLanguagesInsertion.cancelLanguage = function () {
        $("#Edit_language_div").hide();
        this.languageId("");
        this.jobSeekerId(userId);
        this.LanguageLabel('');
        this.selectedLanguage('');
        this.selectedProficiency('');
    }

    viewModelLanguagesInsertion.deleteLanguage = function () {

        var viewModelLanguagesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesList");
        var jsonObject = ko.toJS(viewModelLanguagesInsertion);
        if (jsonObject.Id) {
            var apiUrlLanguage = GetWebAPIURL() + '/api/Language?Id=' + jsonObject.Id;
            $.ajax({
                url: apiUrlLanguage,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var languageObject;
                    for (var i = 0, len = viewModelLanguagesList.languages().length; i < len; ++i) {
                        languageObject = viewModelLanguagesList.languages()[i];
                        var result = languageObject.Id().localeCompare(jsonObject.Id);
                        if (result == 0) {
                            viewModelLanguagesList.languages.remove(languageObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            this.selectedLanguage("");
            this.selectedProficiency("");
            this.languageId("");
            $("#Edit_language_div").hide();
        }
        else {
            alert("No Item selected");
        }


    }

    ko.applyBindings(viewModelLanguagesInsertion, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorLanguagesListing = function () {

    var apiUrlLanguages = GetWebAPIURL() + '/api/Language?jobSeekerId=' + userId;
    var dataObjLanguages;

    //To get Languages from Language table
    $.ajax({
        url: apiUrlLanguages,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjLanguages = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });


    if (dataObjLanguages.length != 0) {
        $("#Edit_language_div").hide();
        $("#Language_general").hide();
        $("#Language_list_editable").hide();
        $("#Add_more_languages").hide();
        $("#Edit_languages").show();

        var apiUrlLanguageList = GetWebAPIURL() + '/api/Lookup/?name=LanguageList';
        var dataLanguageListObj;

        //To get details of security cleareance lookup
        $.ajax({
            url: apiUrlLanguageList,
            type: 'GET',
            async: false,
            success: function (data) {
                dataLanguageListObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
    }
    else {
        $("#Edit_language_div").hide();

        $("#Add_more_languages").hide();
        $("#Edit_languages").hide();

    }

    var viewModelLanguagesList = skillsmart.model.jobseekermyinformation.initializeViewModelLanguagesList(dataObjLanguages, dataLanguageListObj);

    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesList", viewModelLanguagesList);

    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesListNonEditMode", viewModelLanguagesList);

}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsLanguagesList = function () {
    var viewNode = $("#Language_list_editable")[0];
    var viewNodeNonEditMode = $("#Language_list_noneditable")[0];
    var viewModelLanguagesList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesList");
    var viewModelLanguagesListNonEditMode = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesListNonEditMode");


    var viewModelLanguagesInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelLanguagesInsertion");


    viewModelLanguagesList.editLanguageDetails = function (languageObj) {
        var jsonObj = ko.toJSON(languageObj);
        var obj = JSON.parse(jsonObj);

        $("#Edit_language_div").show();

        // $("#LanguageName").show();
        $("#LanguageList").hide();
        $("#mandatory").hide();

        //$("#awards-title").val(obj.ScholarshipTitle);
        $("#ProficiencyList").val(obj.ProficiencyId);
        $("#language_Id").val(obj.Id);
        $("#jobSeeker_Id").val(obj.JobSeekerId);
        $("#LanguageNameLabel").val(obj.LanguageName);

        viewModelLanguagesInsertion.Id(obj.Id);
        viewModelLanguagesInsertion.languageId(obj.LanguageId);
        viewModelLanguagesInsertion.jobSeekerId(obj.JobSeekerId);
        viewModelLanguagesInsertion.selectedProficiency(obj.ProficiencyId);
        viewModelLanguagesInsertion.LanguageLabel(obj.LanguageName);

    }

    ko.applyBindings(viewModelLanguagesList, viewNode);
    ko.applyBindings(viewModelLanguagesListNonEditMode, viewNodeNonEditMode);

}

skillsmart.mediator.jobseekermyinformation.createViewMediatorWorkExperienceInsertion = function () {
    var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
    var dataIndustryTypeObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlIndustryType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataIndustryTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
    var dataWorkTypeObj;

    //TO get details of willing to relocate lookup details
    $.ajax({
        url: apiUrlWorkType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataWorkTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModelWorkExperienceInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelWorkExperienceInsertion(dataIndustryTypeObj, dataWorkTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceInsertion", viewModelWorkExperienceInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsWorkExperienceInsertion = function () {
    $("#JobSeekerIdWork").attr("data-bind", "value:jobSeekerId");
    $("#workHistoryId").attr("data-bind", "value:workHistoryId");
    $("#CompanyName").attr("data-bind", "value:companyName");
    $("#CurrentPosition").attr("data-bind", "value:currentPosition");
    $("#StartDate").attr("data-bind", "value:startDate");
    $("#EndDate").attr("data-bind", "value:endDate");
    $("#CompanyLocation").attr("data-bind", "value:companyLocation");
    $("#CurrentSalary").attr("data-bind", "value:currentSalary");
    $("#JobDuties").attr("data-bind", "value:jobDescription");
    $(".salary").attr("data-bind", "checked:salaryType");

    $("#IndustryType").attr("data-bind", "options:IndusrtyType,optionsText: 'name', optionsValue: 'id', value: selectedIndusrtyType");
    $("#EmploymentType").attr("data-bind", "options:WorkType,optionsText: 'name', optionsValue: 'id', value: selectedWorkType");

    $("#addFirstWork").attr("data-bind", "click:addfirstWork");
    $("#save_workExperience").attr("data-bind", "click:saveWorkExperience");
    $("#cancel_workExperience").attr("data-bind", "click:cancelWorkExperience");
    $("#delete_workExperience").attr("data-bind", "click:deleteWorkExperience");
    $("#addMoreWorkHistory").attr("data-bind", "click:addMoreWorkHistory");


    var viewNode = $("#WorkExperienceInsertionDiv")[0];
    var viewModelWorkExperienceInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceInsertion");

    viewModelWorkExperienceInsertion.addfirstWork = function () {
        $("#Edit_WorkExperience").show();
        $("#WorkExperience_General").hide();
        this.jobSeekerId(userId);
    }
    viewModelWorkExperienceInsertion.saveWorkExperience = function () {
        var viewModelWorkExperienceList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceList");

        var jsonObject = ko.toJS(viewModelWorkExperienceInsertion);
        if (jsonObject.workHistoryId) {
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.JobSeekerId = jsonObject.jobSeekerId;
            jobseekerworkExperienceObj.CompanyName = jsonObject.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObject.currentPosition;
            jobseekerworkExperienceObj.StartDate = jsonObject.startDate;
            jobseekerworkExperienceObj.EndDate = jsonObject.endDate;
            jobseekerworkExperienceObj.CompanyLocation = jsonObject.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObject.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObject.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObject.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = jsonObject.selectedWorkType;
            jobseekerworkExperienceObj.IndustryId = jsonObject.selectedIndusrtyType;
            dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);


            var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?Id=' + jsonObject.workHistoryId;
            var dataobjWorkExpereince;

            $.ajax({
                url: apiUrlWorkExperience,
                type: "PUT",
                data: dataobjWorkExpereince,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    for (var i = 0, len = viewModelWorkExperienceList.workHistory().length; i < len; ++i) {
                        WorkExpObject = viewModelWorkExperienceList.workHistory()[i];
                        var result = WorkExpObject.workHistoryId().localeCompare(jsonObject.workHistoryId);
                        if (result == 0) {

                            var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
                            var dataIndustryTypeObj;

                            //To get details of security cleareance lookup
                            $.ajax({
                                url: apiUrlIndustryType,
                                type: 'GET',
                                async: false,
                                success: function (data) {
                                    dataIndustryTypeObj = data;

                                },
                                error: function (xhr, status, error) {
                                    alert('Error :' + status);
                                }
                            });

                            var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
                            var dataWorkTypeObj;

                            //TO get details of willing to relocate lookup details
                            $.ajax({
                                url: apiUrlWorkType,
                                type: 'GET',
                                async: false,
                                success: function (data) {
                                    dataWorkTypeObj = data;

                                },
                                error: function (xhr, status, error) {
                                    alert('Error :' + status);
                                }
                            });

                            WorkExpObject.companyName(jsonObject.companyName);
                            WorkExpObject.currentPosition(jsonObject.currentPosition);
                            WorkExpObject.startDate(jsonObject.startDate);
                            WorkExpObject.endDate(jsonObject.endDate);

                            WorkExpObject.companyLocation(jsonObject.companyLocation);
                            WorkExpObject.currentSalary(jsonObject.currentSalary);
                            WorkExpObject.salaryType(jsonObject.salaryType);
                            WorkExpObject.jobDescription(jsonObject.jobDescription);

                            WorkExpObject.jobSeekerId(jsonObject.jobSeekerId);
                            WorkExpObject.workHistoryId(jsonObject.workHistoryId);
                            WorkExpObject.industryTypeId(jsonObject.selectedIndusrtyType);
                            WorkExpObject.workTypeId(jsonObject.selectedWorkType);

                            for (key in dataIndustryTypeObj) {
                                if (dataIndustryTypeObj[key].Id == jsonObject.selectedIndusrtyType) {
                                    WorkExpObject.industryTypeName(dataIndustryTypeObj[key].Name);
                                    break;
                                }
                            }

                            for (keygen in dataWorkTypeObj) {
                                if (dataWorkTypeObj[keygen].Id == jsonObject.selectedWorkType) {
                                    WorkExpObject.workTypeName(dataWorkTypeObj[keygen].Name);
                                    break;
                                }
                            }
                            viewModelWorkExperienceList.workHistory()[i] = WorkExpObject;

                            break;
                        }
                    }
                    $("#Edit_WorkExperience").hide();
                    $("#addMoreWorkHistory").show();
                    this.companyName("");
                    this.currentPosition("");
                    this.startDate('');
                    this.endDate('');
                    this.companyLocation('');

                    this.currentSalary("");
                    this.salaryType('');
                    this.jobDescription('');
                    this.workHistoryId('');

                    this.selectedIndusrtyType('');
                    this.selectedWorkType('');
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            var jobseekerworkExperienceObj = {}
            jobseekerworkExperienceObj.JobSeekerId = jsonObject.jobSeekerId;
            jobseekerworkExperienceObj.CompanyName = jsonObject.companyName;
            jobseekerworkExperienceObj.EndingPosition = jsonObject.currentPosition;
            jobseekerworkExperienceObj.StartDate = jsonObject.startDate;
            jobseekerworkExperienceObj.EndDate = jsonObject.endDate;
            jobseekerworkExperienceObj.CompanyLocation = jsonObject.companyLocation;
            jobseekerworkExperienceObj.EndingSalary = jsonObject.currentSalary;
            jobseekerworkExperienceObj.SalaryType = jsonObject.salaryType;
            jobseekerworkExperienceObj.JobDuties = jsonObject.jobDescription;
            jobseekerworkExperienceObj.WorkTypeId = jsonObject.selectedWorkType;
            jobseekerworkExperienceObj.IndustryId = jsonObject.selectedIndusrtyType;

            dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);


            var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory/';

            $.ajax({
                url: apiUrlWorkExperience,
                type: "POST",
                data: dataobjWorkExpereince,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails()
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_WorkExperience").hide();
            this.companyName("");
            this.currentPosition("");
            this.startDate('');
            this.endDate('');
            this.companyLocation('');

            this.currentSalary("");
            this.salaryType('');
            this.jobDescription('');

            this.selectedIndusrtyType('');
            this.selectedWorkType('');
        }
        function getDetails() {
            var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
            var dataIndustryTypeObj;

            //To get details of security cleareance lookup
            $.ajax({
                url: apiUrlIndustryType,
                type: 'GET',
                async: false,
                success: function (data) {
                    dataIndustryTypeObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });

            var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
            var dataWorkTypeObj;

            //TO get details of willing to relocate lookup details
            $.ajax({
                url: apiUrlWorkType,
                type: 'GET',
                async: false,
                success: function (data) {
                    dataWorkTypeObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });

            var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?jobSeekerId=' + userId;
            var dataobjWorkExpereince;

            //To get WorkExperience  details
            $.ajax({
                url: apiUrlWorkExperience,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataobjWorkExpereince = data;
                    viewModelWorkExperienceList.workHistory.removeAll();
                    for (da in dataobjWorkExpereince) {
                        var workHistory = {
                            companyName: ko.observable(),
                            currentPosition: ko.observable(),
                            startDate: ko.observable(),
                            endDate: ko.observable(),
                            companyLocation: ko.observable(),
                            currentSalary: ko.observable(),
                            salaryType: ko.observable(),
                            jobDescription: ko.observable(),
                            jobSeekerId: ko.observable(''),
                            workHistoryId: ko.observable(),
                            industryTypeName: ko.observable(),
                            workTypeName: ko.observable(),
                            industryTypeId: ko.observable(),
                            workTypeId: ko.observable()
                        };


                        for (key in dataIndustryTypeObj) {
                            if (dataIndustryTypeObj[key].Id == dataobjWorkExpereince[da].IndustryId) {
                                alert("1");
                                workHistory.industryTypeName(dataIndustryTypeObj[key].Name);
                                break;
                            }
                        }

                        for (key in dataWorkTypeObj) {
                            if (dataWorkTypeObj[key].Id == dataobjWorkExpereince[da].WorkTypeId) {
                                workHistory.workTypeName(dataWorkTypeObj[key].Name);
                                break;
                            }
                        }


                        workHistory.industryTypeId(dataobjWorkExpereince[da].IndustryId);
                        workHistory.jobSeekerId(dataobjWorkExpereince[da].JobSeekerId);
                        workHistory.workTypeId(dataobjWorkExpereince[da].WorkTypeId);
                        workHistory.workHistoryId(dataobjWorkExpereince[da].Id);

                        workHistory.companyName(dataobjWorkExpereince[da].CompanyName);
                        workHistory.currentPosition(dataobjWorkExpereince[da].EndingPosition);
                        workHistory.startDate(dataobjWorkExpereince[da].StartDate);
                        workHistory.endDate(dataobjWorkExpereince[da].EndDate);

                        workHistory.companyLocation(dataobjWorkExpereince[da].CompanyLocation);
                        workHistory.salaryType(dataobjWorkExpereince[da].SalaryType);
                        workHistory.jobDescription(dataobjWorkExpereince[da].JobDuties);
                        workHistory.currentSalary(dataobjWorkExpereince[da].EndingSalary);


                        viewModelWorkExperienceList.workHistory.push(workHistory);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceList", viewModelWorkExperienceList);

        }
    }
    viewModelWorkExperienceInsertion.cancelWorkExperience = function () {
        $("#Edit_WorkExperience").hide();
        this.companyName("");
        this.currentPosition("");
        this.startDate('');
        this.endDate('');
        this.companyLocation('');

        this.currentSalary("");
        this.salaryType('');
        this.jobDescription('');
        this.workHistoryId('');

        this.selectedIndusrtyType('');
        this.selectedWorkType('');
    }
    viewModelWorkExperienceInsertion.deleteWorkExperience = function () {

        var viewModelWorkExperienceList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceList");
        var jsonObject = ko.toJS(viewModelWorkExperienceInsertion);
        if (jsonObject.workHistoryId) {
            var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?Id=' + jsonObject.workHistoryId;
            $.ajax({
                url: apiUrlWorkExperience,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var WorkExpObject;
                    for (var i = 0, len = viewModelWorkExperienceList.workHistory().length; i < len; ++i) {
                        WorkExpObject = viewModelWorkExperienceList.workHistory()[i];
                        var result = WorkExpObject.workHistoryId().localeCompare(jsonObject.workHistoryId);
                        if (result == 0) {
                            viewModelWorkExperienceList.workHistory.remove(WorkExpObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_WorkExperience").hide();
            this.companyName("");
            this.currentPosition("");
            this.startDate('');
            this.endDate('');
            this.companyLocation('');

            this.currentSalary("");
            this.salaryType('');
            this.jobDescription('');
            this.workHistoryId('');

            this.selectedIndusrtyType('');
            this.selectedWorkType('');

            if (viewModelWorkExperienceList.workHistory().length == 0) {
                $("#WorkExperience_General").show();
                $("#addMoreWorkHistory").hide();
            }
        }
        else {
            alert("No Item selected");
        }
    }
    viewModelWorkExperienceInsertion.addMoreWorkHistory = function () {
        $("#Edit_WorkExperience").show();
        this.jobSeekerId(userId);
        this.companyName("");
        this.currentPosition("");
        this.startDate('');
        this.endDate('');
        this.companyLocation('');

        this.currentSalary("");
        this.salaryType('');
        this.jobDescription('');
        this.workHistoryId('');

        this.selectedIndusrtyType('');
        this.selectedWorkType('');
    }
    ko.applyBindings(viewModelWorkExperienceInsertion, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorWorkExperienceList = function () {
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/WorkHistory?jobSeekerId=' + userId;
    var dataobjWorkExpereince;

    //To get Languages from Language table
    $.ajax({
        url: apiUrlWorkExperience,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjWorkExpereince = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });


    if (dataobjWorkExpereince.length != 0) {
        $("#Edit_WorkExperience").hide();
        $("#WorkExperience_General").hide();


        var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
        var dataIndustryTypeObj;

        //To get details of IndustryType lookup
        $.ajax({
            url: apiUrlIndustryType,
            type: 'GET',
            async: false,
            success: function (data) {
                dataIndustryTypeObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });

        var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
        var dataWorkTypeObj;

        //TO get details of WorkType lookup details
        $.ajax({
            url: apiUrlWorkType,
            type: 'GET',
            async: false,
            success: function (data) {
                dataWorkTypeObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });

    }
    else {

        $("#addMoreWorkHistory").hide();
        $("#Edit_WorkExperience").hide();
    }

    var viewModelWorkExperienceList = skillsmart.model.jobseekermyinformation.initializeViewModelWorkExperienceList(dataobjWorkExpereince, dataIndustryTypeObj, dataWorkTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceList", viewModelWorkExperienceList);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsWorkExperienceList = function () {
    var viewNode = $("#List_WorkExperience")[0];
    var viewModelWorkExperienceList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceList");

    var viewModelWorkExperienceInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelWorkExperienceInsertion");
    viewModelWorkExperienceList.editWorkHistoryDetails = function (workHistoryObj) {
        var jsonObj = ko.toJSON(workHistoryObj);
        var obj = JSON.parse(jsonObj);

        $("#Edit_WorkExperience").show();



        $("#CompanyName").val(obj.companyName);
        $("#CurrentPosition").val(obj.currentPosition);
        $("#StartDate").val(obj.startDate);
        $("#EndDate").val(obj.endDate);
        $("#CompanyLocation").val(obj.companyLocation);
        $("#CurrentSalary").val(obj.currentSalary);
        $("#EmploymentType").val(obj.workTypeId);
        $("#IndustryType").val(obj.industryTypeId);
        $("#JobDuties").val(obj.jobDescription);
        if (obj.salaryType == "Annually")
            $('#friday').prop('checked', true);
        else
            $('#Monthly').prop('checked', true);

        $("#JobSeekerIdWork").val(obj.jobSeekerId);
        $("#workHistoryId").val(obj.workHistoryId);

        viewModelWorkExperienceInsertion.companyName(obj.companyName);
        viewModelWorkExperienceInsertion.currentPosition(obj.currentPosition);
        viewModelWorkExperienceInsertion.startDate(obj.startDate);
        viewModelWorkExperienceInsertion.endDate(obj.endDate);

        viewModelWorkExperienceInsertion.companyLocation(obj.companyLocation);
        viewModelWorkExperienceInsertion.currentSalary(obj.currentSalary);
        viewModelWorkExperienceInsertion.selectedWorkType(obj.workTypeId);
        viewModelWorkExperienceInsertion.selectedIndusrtyType(obj.industryTypeId);

        viewModelWorkExperienceInsertion.jobDescription(obj.jobDescription);
        viewModelWorkExperienceInsertion.salaryType(obj.salaryType);
        viewModelWorkExperienceInsertion.jobSeekerId(obj.jobSeekerId);
        viewModelWorkExperienceInsertion.workHistoryId(obj.workHistoryId);

        viewModelWorkExperienceInsertion.industryTypeName(obj.industryTypeName);
        viewModelWorkExperienceInsertion.workTypeName(obj.workTypeName);
    }

    ko.applyBindings(viewModelWorkExperienceList, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorEducationInsertion = function () {
    var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
    var dataDegreeTypeObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlDegreeType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataDegreeTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModelEducationInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelEducationInsertion(dataDegreeTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationInsertion", viewModelEducationInsertion);

}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsEducationInsertion = function () {

    $("#EducationId").attr("data-bind", "value:educationId");
    $("#JobseekerEducationId").attr("data-bind", "value:jobseekerId");

    $("#University").attr("data-bind", "value:universityName");
    $("#Degree").attr("data-bind", "options:degree,optionsText: 'name', optionsValue: 'id', value: selectedDegree");
    $("#Major_Focus").attr("data-bind", "value:majorFocus");

    $("#StartDateDegree").attr("data-bind", "value:startDate");
    $("#EndDataeDegree").attr("data-bind", "value:endDate");
    $("#UniversityLocation").attr("data-bind", "value:universityLocation");

    $("#add_First_Education").attr("data-bind", "click:addFirstEducation");
    $("#addMoreEducation").attr("data-bind", "click:addMoreEducation");
    $("#save_Education").attr("data-bind", "click:saveEducation");
    $("#cancel_Education").attr("data-bind", "click:cancelEducation");
    $("#delete_Education").attr("data-bind", "click:deleteEducation");



    var viewNode = $("#EducationInsertionDetailsDiv")[0];
    var viewModelEducationInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationInsertion");



    viewModelEducationInsertion.saveEducation = function () {
        var viewModelEducationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationList");

        var jsonObject = ko.toJS(viewModelEducationInsertion);
        var dataobjEducation;
        if (jsonObject.educationId) {
            var jobseekerEducationObj = {}
            jobseekerEducationObj.JobSeekerId = userId;
            jobseekerEducationObj.InstitutionName = jsonObject.universityName;
            jobseekerEducationObj.DegreeId = jsonObject.selectedDegree;
            jobseekerEducationObj.StartDate = jsonObject.startDate;
            jobseekerEducationObj.EndDate = jsonObject.endDate;
            jobseekerEducationObj.MajorFocus = jsonObject.majorFocus;

            jobseekerEducationObj.InstitutionLocation = jsonObject.universityLocation;
            dataobjEducation = JSON.stringify(jobseekerEducationObj);


            var apiUrlEducation = GetWebAPIURL() + '/api/Education?Id=' + jsonObject.educationId;
            var educationObject;

            $.ajax({
                url: apiUrlEducation,
                type: "PUT",
                data: dataobjEducation,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    for (var i = 0, len = viewModelEducationList.education().length; i < len; ++i) {
                        educationObject = viewModelEducationList.education()[i];
                        var result = educationObject.educationId().localeCompare(jsonObject.educationId);
                        if (result == 0) {
                            var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
                            var dataDegreeTypeObj;

                            //To get details of security cleareance lookup
                            $.ajax({
                                url: apiUrlDegreeType,
                                type: 'GET',
                                async: false,
                                success: function (data) {
                                    dataDegreeTypeObj = data;

                                },
                                error: function (xhr, status, error) {
                                    alert('Error :' + status);
                                }
                            });

                            educationObject.universityName(jsonObject.universityName);
                            educationObject.degree(jsonObject.selectedDegree);
                            educationObject.startDate(jsonObject.startDate);
                            educationObject.endDate(jsonObject.endDate);
                            educationObject.universityLocation(jsonObject.universityLocation);
                            educationObject.majorFocus(jsonObject.majorFocus);

                            educationObject.jobSeekerId(jsonObject.jobseekerId);
                            educationObject.educationId(jsonObject.educationId);

                            for (key in dataDegreeTypeObj) {
                                if (dataDegreeTypeObj[key].Id == jsonObject.selectedDegree) {
                                    educationObject.degreeName(dataDegreeTypeObj[key].Name);
                                    break;
                                }
                            }

                            viewModelEducationList.education()[i] = educationObject;

                            break;
                        }
                    }
                    $("#Edit_Education").hide();
                    $("#addMoreEducation").show();
                    this.universityName("");
                    this.startDate("");
                    this.endDate("");
                    this.degreeName("");
                    this.universityLocation("");
                    this.majorFocus("");
                    this.selectedDegree("");


                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            var jobseekerEducationObj = {}
            jobseekerEducationObj.JobSeekerId = jsonObject.jobseekerId;
            jobseekerEducationObj.InstitutionName = jsonObject.universityName;
            jobseekerEducationObj.DegreeId = jsonObject.selectedDegree;
            jobseekerEducationObj.StartDate = jsonObject.startDate;
            jobseekerEducationObj.EndDate = jsonObject.endDate;
            jobseekerEducationObj.MajorFocus = jsonObject.majorFocus;

            jobseekerEducationObj.InstitutionLocation = jsonObject.universityLocation;
            dataobjEducation = JSON.stringify(jobseekerEducationObj);


            var apiUrlEducation = GetWebAPIURL() + '/api/Education';



            $.ajax({
                url: apiUrlEducation,
                type: "POST",
                data: dataobjEducation,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails();
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

            $("#Edit_Education").hide();
            this.universityName("");
            this.startDate("");
            this.endDate("");
            this.degreeName("");
            this.universityLocation("");
            this.selectedDegree("");
            this.majorFocus("");


        }
        function getDetails() {
            var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
            var dataDegreeTypeObj;

            //To get details of security cleareance lookup
            $.ajax({
                url: apiUrlDegreeType,
                type: 'GET',
                async: false,
                success: function (data) {
                    dataDegreeTypeObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });


            var apiUrlEducation = GetWebAPIURL() + '/api/Education?jobSeekerId=' + userId;
            var dataobjEducation;

            //To get Scholarship details
            $.ajax({
                url: apiUrlEducation,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataobjEducation = data;
                    viewModelEducationList.education.removeAll();
                    for (da in dataobjEducation) {

                        var education = {
                            universityName: ko.observable(),
                            degree: ko.observable(),
                            startDate: ko.observable(),
                            endDate: ko.observable(),
                            universityLocation: ko.observable(),
                            degreeName: ko.observable(),
                            majorFocus: ko.observable(),

                            jobSeekerId: ko.observable(),
                            educationId: ko.observable()

                        };

                        for (key in dataDegreeTypeObj) {
                            if (dataDegreeTypeObj[key].Id == dataDegreeTypeObj[da].DegreeId) {
                                education.degreeName(dataDegreeTypeObj[key].Name);
                                break;
                            }
                        }

                        education.universityName(dataobjEducation[da].InstitutionName);
                        education.degree(dataobjEducation[da].DegreeId);
                        education.startDate(dataobjEducation[da].StartDate);
                        education.endDate(dataobjEducation[da].EndDate);
                        educationObject.majorFocus(jsonObject.majorFocus);

                        education.universityLocation(dataobjEducation[da].InstitutionLocation);
                        education.jobSeekerId(dataobjEducation[da].JobSeekerId);
                        education.educationId(dataobjEducation[da].Id);

                        viewModelEducationList.education.push(education);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationList", viewModelEducationList);

        }
    }
    viewModelEducationInsertion.cancelEducation = function () {

        $("#Edit_Education").hide();
        this.universityName("");
        this.startDate("");
        this.endDate("");
        this.degreeName("");
        this.universityLocation("");
        this.selectedDegree("");
        this.majorFocus("");

    }
    viewModelEducationInsertion.deleteEducation = function () {
        var viewModelEducationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationList");
        var jsonObject = ko.toJS(viewModelEducationInsertion);
        if (jsonObject.educationId) {
            var apiUrlEducation = GetWebAPIURL() + '/api/Education?Id=' + jsonObject.educationId;

            $.ajax({
                url: apiUrlEducation,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var educationObject;
                    for (var i = 0, len = viewModelEducationList.education().length; i < len; ++i) {
                        educationObject = viewModelEducationList.education()[i];
                        var result = educationObject.educationId().localeCompare(jsonObject.educationId);
                        if (result == 0) {
                            viewModelEducationList.education.remove(educationObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_Education").hide();
            this.universityName("");
            this.startDate("");
            this.endDate("");
            this.degreeName("");
            this.universityLocation("");
            this.selectedDegree("");
            this.majorFocus("");

            if (viewModelEducationList.education().length == 0) {
                $("#Education_General").show();
                $("#addMoreEducation").hide();
            }
        }
        else {
            alert("No Item selected");
        }
    }
    viewModelEducationInsertion.addFirstEducation = function () {
        $("#Edit_Education").show();
        $("#Education_General").hide();
        this.jobseekerId(userId);
    }
    viewModelEducationInsertion.addMoreEducation = function () {
        $("#Edit_Education").show();
        $("#Education_General").hide();
        this.jobseekerId(userId);
        this.educationId("");

        this.universityName("");
        this.startDate("");
        this.endDate("");
        this.degreeName("");
        this.universityLocation("");
        this.selectedDegree("");
        this.majorFocus("");
    }
    ko.applyBindings(viewModelEducationInsertion, viewNode);

}

skillsmart.mediator.jobseekermyinformation.createViewMediatorEducationList = function () {
    var apiUrlEducation = GetWebAPIURL() + '/api/Education?jobSeekerId=' + userId;
    var dataobjEducation;

    //To get Languages from Language table
    $.ajax({
        url: apiUrlEducation,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjEducation = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });


    if (dataobjEducation.length != 0) {
        $("#Edit_Education").hide();
        $("#Education_General").hide();

        var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
        var dataDegreeTypeObj;

        //To get details of security cleareance lookup
        $.ajax({
            url: apiUrlDegreeType,
            type: 'GET',
            async: false,
            success: function (data) {
                dataDegreeTypeObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });

    }
    else {

        $("#addMoreEducation").hide();
        $("#Edit_Education").hide();
        $("#List_Education").hide();

    }

    var viewModelEducationList = skillsmart.model.jobseekermyinformation.initializeViewModelEducationList(dataobjEducation, dataDegreeTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationList", viewModelEducationList);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsEducationList = function () {

    var viewNode = $("#List_Education")[0];
    var viewModelEducationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationList");

    viewModelEducationList.editEducationDetails = function (educationObj) {
        var viewModelEducationInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelEducationInsertion");

        var jsonObj = ko.toJSON(educationObj);
        var obj = JSON.parse(jsonObj);

        $("#Edit_Education").show();

        $("#University").val(obj.universityName);
        $("#Degree").val(obj.degree);
        $("#StartDateDegree").val(obj.startDate);
        $("#EndDataeDegree").val(obj.endDate);
        $("#UniversityLocation").val(obj.universityLocation);


        $("#JobseekerEducationId").val(obj.jobSeekerId);
        $("#EducationId").val(obj.educationId);
        $("#Major_Focus").val(obj.majorFocus);

        viewModelEducationInsertion.universityName(obj.universityName);
        viewModelEducationInsertion.startDate(obj.startDate);
        viewModelEducationInsertion.endDate(obj.endDate);
        viewModelEducationInsertion.universityLocation(obj.universityLocation);

        viewModelEducationInsertion.jobseekerId(obj.jobSeekerId);
        viewModelEducationInsertion.educationId(obj.educationId);
        viewModelEducationInsertion.selectedDegree(obj.degree);
        viewModelEducationInsertion.degreeName(obj.degreeName);
        viewModelEducationInsertion.majorFocus(obj.majorFocus);


    }

    ko.applyBindings(viewModelEducationList, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorTrainingCourseInsertion = function () {
    var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
    var dataProgramTypeObj;

    //To get details of security cleareance lookup
    $.ajax({
        url: apiUrlDegreeType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataProgramTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    var viewModelTrainingCourseInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelTrainingCourseInsertion(dataProgramTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseInsertion", viewModelTrainingCourseInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsTrainingCourseInsertion = function () {
    $("#JobseekerTrainigId").attr("data-bind", "value:jobseekerId");
    $("#TrainingId").attr("data-bind", "value:trainingId");

    $("#Program_Type").attr("data-bind", "options:programType,optionsText: 'name', optionsValue: 'id', value: selectedProgramType");
    $("#Focus").attr("data-bind", "value:focus");
    $("#Completion_Date").attr("data-bind", "value:completionDate");

    $("#Currently_Enrolled").attr("data-bind", "checked:currentlyEnrolled");
    $("#TrainingCourse_Institution").attr("data-bind", "value:trainingCourseInstitution");
    $("#Training_ExpiresDate").attr("data-bind", "value:expiryDate");
    $("#Training_Details").attr("data-bind", "value:trainingDetails");


    $("#addFirstTrainingCourse").attr("data-bind", "click:addFirstTrainingCourse");
    $("#Save_TrainingCourse").attr("data-bind", "click:saveTrainingCourse");
    $("#Cancel_TrainingCourse").attr("data-bind", "click:cancelTrainingCourse");
    $("#Delete_TrainingCourse").attr("data-bind", "click:deleteTrainingCourse");
    $("#addMoreTrainingCourse").attr("data-bind", "click:addMoreTrainingCourse");


    var viewNode = $("#TrainingCourse_InsertionDetails_Div")[0];
    var viewModelTrainingCourseInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseInsertion");

    viewModelTrainingCourseInsertion.addFirstTrainingCourse = function () {
        $("#Edit_TrainingCourse").show();
        $("#TrainingCourse_General").hide();
        this.jobseekerId(userId);
    }

    viewModelTrainingCourseInsertion.saveTrainingCourse = function () {
        var viewModelTrainingCourseList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseList");

        var jsonObject = ko.toJS(viewModelTrainingCourseInsertion);
        var dataobjTrainingCourse;
        if (jsonObject.trainingId) {
            var jobseekerTrainingCourseObj = {}
            jobseekerTrainingCourseObj.JobSeekerId = userId;
            jobseekerTrainingCourseObj.ProgramTypeId = jsonObject.selectedProgramType;
            jobseekerTrainingCourseObj.Focus = jsonObject.focus;
            jobseekerTrainingCourseObj.InstitutionName = jsonObject.trainingCourseInstitution;

            jobseekerTrainingCourseObj.CompletionDate = jsonObject.completionDate;
            jobseekerTrainingCourseObj.ExpirationDate = jsonObject.expiryDate;
            jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObject.currentlyEnrolled;
            jobseekerTrainingCourseObj.TrainingDetails = jsonObject.trainingDetails;

            dataobjTrainingCourse = JSON.stringify(jobseekerTrainingCourseObj);

            var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?Id=' + jsonObject.trainingId;
            var TrainingCourseObject;

            $.ajax({
                url: apiUrlTrainingCourse,
                type: "PUT",
                data: dataobjTrainingCourse,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    for (var i = 0, len = viewModelTrainingCourseList.trainingCourse().length; i < len; ++i) {
                        TrainingCourseObject = viewModelTrainingCourseList.trainingCourse()[i];
                        var result = TrainingCourseObject.trainingId().localeCompare(jsonObject.trainingId);
                        if (result == 0) {
                            var apiUrlProgramType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
                            var dataProgramTypeObj;

                            //To get details of security cleareance lookup
                            $.ajax({
                                url: apiUrlProgramType,
                                type: 'GET',
                                async: false,
                                success: function (data) {
                                    dataProgramTypeObj = data;

                                },
                                error: function (xhr, status, error) {
                                    alert('Error :' + status);
                                }
                            });
                            TrainingCourseObject.jobseekerId(jsonObject.userId);
                            TrainingCourseObject.trainingId(jsonObject.trainingId);
                            TrainingCourseObject.programType(jsonObject.selectedProgramType);

                            TrainingCourseObject.focus(jsonObject.focus);
                            TrainingCourseObject.completionDate(jsonObject.completionDate);
                            TrainingCourseObject.currentlyEnrolled(jsonObject.currentlyEnrolled);
                            TrainingCourseObject.trainingCourseInstitution(jsonObject.trainingCourseInstitution);

                            TrainingCourseObject.expiryDate(jsonObject.expiryDate);
                            TrainingCourseObject.trainingDetails(jsonObject.trainingDetails);

                            for (key in dataProgramTypeObj) {
                                if (dataProgramTypeObj[key].Id == jsonObject.selectedProgramType) {
                                    TrainingCourseObject.programTypeName(dataProgramTypeObj[key].Name);
                                    break;
                                }
                            }

                            viewModelTrainingCourseList.trainingCourse()[i] = TrainingCourseObject;

                            break;
                        }
                    }
                   
                    $("#Edit_TrainingCourse").hide();
                    $("#addMoreTrainingCourse").show();
                    this.trainingId("");
                    this.selectedProgramType("");
                    this.programTypeName("");
                    this.focus("");
                    this.completionDate("");
                    this.currentlyEnrolled("");
                    this.trainingCourseInstitution("");
                    this.expiryDate("");
                    this.trainingDetails("");


                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            var jobseekerTrainingCourseObj = {}
            jobseekerTrainingCourseObj.JobSeekerId = userId;
            jobseekerTrainingCourseObj.ProgramTypeId = jsonObject.selectedProgramType;
            jobseekerTrainingCourseObj.Focus = jsonObject.focus;
            jobseekerTrainingCourseObj.InstitutionName = jsonObject.trainingCourseInstitution;

            jobseekerTrainingCourseObj.CompletionDate = jsonObject.completionDate;
            jobseekerTrainingCourseObj.ExpirationDate = jsonObject.expiryDate;
            jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObject.currentlyEnrolled;
            jobseekerTrainingCourseObj.TrainingDetails = jsonObject.trainingDetails;

            dataobjTrainingCourse = JSON.stringify(jobseekerTrainingCourseObj);
            

            var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse';



            $.ajax({
                url: apiUrlTrainingCourse,
                type: "POST",
                data: dataobjTrainingCourse,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails();
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

            $("#Edit_TrainingCourse").hide();
            this.trainingId("");
            this.selectedProgramType("");
            this.programTypeName("");
            this.focus("");
            this.completionDate("");
            this.currentlyEnrolled("");
            this.trainingCourseInstitution("");
            this.expiryDate("");
            this.trainingDetails("");


        }
        function getDetails() {
           
            var apiUrlProgramType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
            var dataProgramTypeObj;

            //To get details of security cleareance lookup
            $.ajax({
                url: apiUrlProgramType,
                type: 'GET',
                async: false,
                success: function (data) {
                    dataProgramTypeObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });

            var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?jobSeekerId=' + userId;
            var dataobjTrainingCourse;

            //To get Scholarship details
            $.ajax({
                url: apiUrlTrainingCourse,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataobjTrainingCourse = data;
                    viewModelTrainingCourseList.trainingCourse.removeAll();
                    for (da in dataobjTrainingCourse) {

                        var trainingCourse = {
                            jobseekerId: ko.observable(),
                            trainingId: ko.observable(),

                            programType: ko.observable(),
                            programTypeName: ko.observable(),

                            focus: ko.observable(),
                            completionDate: ko.observable(),
                            currentlyEnrolled: ko.observable(),
                            trainingCourseInstitution: ko.observable(),
                            expiryDate: ko.observable(),
                            trainingDetails: ko.observable()

                        };

                        for (key in dataProgramTypeObj) {
                            if (dataProgramTypeObj[key].Id == dataobjTrainingCourse[da].ProgramTypeId) {
                                trainingCourse.programTypeName(dataProgramTypeObj[key].Name);
                                break;
                            }
                        }

                        trainingCourse.jobseekerId(dataobjTrainingCourse[da].JobSeekerId);
                        trainingCourse.trainingId(dataobjTrainingCourse[da].Id);
                        trainingCourse.programType(dataobjTrainingCourse[da].ProgramTypeId);

                        trainingCourse.focus(dataobjTrainingCourse[da].Focus);
                        trainingCourse.completionDate(dataobjTrainingCourse[da].CompletionDate);
                        trainingCourse.currentlyEnrolled(dataobjTrainingCourse[da].CurrentlyEnrolled);

                        trainingCourse.trainingCourseInstitution(dataobjTrainingCourse[da].InstitutionName);
                        trainingCourse.expiryDate(dataobjTrainingCourse[da].ExpirationDate);
                        trainingCourse.trainingDetails(dataobjTrainingCourse[da].TrainingDetails);

                        viewModelTrainingCourseList.trainingCourse.push(trainingCourse);
                    }
                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });
            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseList", viewModelTrainingCourseList);
        }
    }

    viewModelTrainingCourseInsertion.addMoreTrainingCourse = function () {
        $("#Edit_TrainingCourse").show();
        $("#TrainingCourse_General").hide();
        this.jobseekerId(userId);
        this.trainingId("");
        this.selectedProgramType("");
        this.programTypeName("");
        this.focus("");
        this.completionDate("");
        this.currentlyEnrolled("");
        this.trainingCourseInstitution("");
        this.expiryDate("");
        this.trainingDetails("");
    }

    viewModelTrainingCourseInsertion.cancelTrainingCourse = function () {

        $("#Edit_TrainingCourse").hide();
        this.trainingId("");
        this.selectedProgramType("");
        this.programTypeName("");
        this.focus("");
        this.completionDate("");
        this.currentlyEnrolled("");
        this.trainingCourseInstitution("");
        this.expiryDate("");
        this.trainingDetails("");
    }

    viewModelTrainingCourseInsertion.deleteTrainingCourse = function () {
        var viewModelTrainingCourseList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseList");
        var jsonObject = ko.toJS(viewModelTrainingCourseInsertion);
        if (jsonObject.trainingId) {
            var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?Id=' + jsonObject.trainingId;

            $.ajax({
                url: apiUrlTrainingCourse,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var trainingCourseObject;
                    for (var i = 0, len = viewModelTrainingCourseList.trainingCourse().length; i < len; ++i) {
                        trainingCourseObject = viewModelTrainingCourseList.trainingCourse()[i];
                        var result = trainingCourseObject.trainingId().localeCompare(jsonObject.trainingId);
                        if (result == 0) {
                            viewModelTrainingCourseList.trainingCourse.remove(trainingCourseObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_TrainingCourse").hide();
            this.trainingId("");
            this.selectedProgramType("");
            this.programTypeName("");
            this.focus("");
            this.completionDate("");
            this.currentlyEnrolled("");
            this.trainingCourseInstitution("");
            this.expiryDate("");
            this.trainingDetails("");

            if (viewModelEducationList.education().length == 0) {
                $("#Education_General").show();
                $("#addMoreEducation").hide();
            }
        }
        else {
            alert("No Item selected");
        }
    }
   
    
    ko.applyBindings(viewModelTrainingCourseInsertion, viewNode);
    
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorTrainingCourseList = function ()
{


    var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?jobSeekerId=' + userId;
    var dataobjTrainingCourse;

    //To get Languages from Language table
    $.ajax({
        url: apiUrlTrainingCourse,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjTrainingCourse = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });


    if (dataobjTrainingCourse.length != 0) {
        $("#Edit_TrainingCourse").hide();
        $("#TrainingCourse_General").hide();

        var apiUrlProgramType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
        var dataProgramTypeObj;

        //To get details of security cleareance lookup
        $.ajax({
            url: apiUrlProgramType,
            type: 'GET',
            async: false,
            success: function (data) {
                dataProgramTypeObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });

    }
    else {

        $("#addMoreTrainingCourse").hide();
        $("#Edit_TrainingCourse").hide();
        $("#List_TrainingCourse").hide();

    }

    var viewModelTrainingCourseList = skillsmart.model.jobseekermyinformation.initializeViewModelTrainingCourseList(dataobjTrainingCourse, dataProgramTypeObj);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseList", viewModelTrainingCourseList);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsTrainingCourseList = function () {
    var viewNode = $("#List_TrainingCourse")[0];
    var viewModelTrainingCourseList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseList");

    viewModelTrainingCourseList.editTrainingCourseDetails = function (trainingCourseObj) {
        var viewModelTrainingCourseInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelTrainingCourseInsertion");

        var jsonObj = ko.toJSON(trainingCourseObj);
        var obj = JSON.parse(jsonObj);

        $("#Edit_TrainingCourse").show();

        $("#Program_Type").val(obj.programType);
        $("#Focus").val(obj.focus);
        $("#Completion_Date").val(obj.completionDate);

        $("#Currently_Enrolled").val(obj.currentlyEnrolled);
        $("#JobseekerTrainigId").val(obj.jobseekerId);
        $("#TrainingId").val(obj.trainingId);

        $("#TrainingCourse_Institution").val(obj.trainingCourseInstitution);
        $("#Training_ExpiresDate").val(obj.expiryDate);
        $("#Training_Details").val(obj.trainingDetails);

        viewModelTrainingCourseInsertion.jobseekerId(obj.jobseekerId);
        viewModelTrainingCourseInsertion.trainingId(obj.trainingId);
        viewModelTrainingCourseInsertion.selectedProgramType(obj.programType);

        viewModelTrainingCourseInsertion.programTypeName(obj.programTypeName);

        viewModelTrainingCourseInsertion.focus(obj.focus);
        viewModelTrainingCourseInsertion.completionDate(obj.completionDate);
        viewModelTrainingCourseInsertion.currentlyEnrolled(obj.currentlyEnrolled);

        viewModelTrainingCourseInsertion.trainingCourseInstitution(obj.trainingCourseInstitution);
        viewModelTrainingCourseInsertion.expiryDate(obj.expiryDate);
        viewModelTrainingCourseInsertion.trainingDetails(obj.trainingDetails);


    }

    ko.applyBindings(viewModelTrainingCourseList, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorCertificationInsertion = function () {
    var viewModelCertificationInsertion = skillsmart.model.jobseekermyinformation.initializeViewModelCertificationInsertion();
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationInsertion", viewModelCertificationInsertion);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsCertificationInsertion = function () {

    $("#JobseekerCertificationId").attr("data-bind", "value:jobseekerId");
    $("#CertificationId").attr("data-bind", "value:certificationId");

    $("#Certification_Name").attr("data-bind", "value:certificationName");
    $("#Certification_currently_Enrolled").attr("data-bind", "checked:certificationEnrolled");
    $("#Certification_Institution").attr("data-bind", "value:certificationInstituion");
    $("#certification_completed_date").attr("data-bind", "value:completedDate");
    $("#expires").attr("data-bind", "value:expireDate");
    $("#Certification_Details").attr("data-bind", "value:certificationDetails");

    $("#addFirstCertification").attr("data-bind", "click:addFirstCertification");
    $("#addMoreCertification").attr("data-bind", "click:addMoreCertification");
    $("#save_certification").attr("data-bind", "click:saveCertification");
    $("#cancel_certification").attr("data-bind", "click:cancelCertification");
    $("#delete_certification").attr("data-bind", "click:deleteCertification");


    var viewNode = $("#CertificationInsertionDetailsDiv")[0];
    var viewModelCertificationInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationInsertion");

    viewModelCertificationInsertion.addFirstCertification = function () {
        $("#Edit_Certification").show();
        $("#Certification_General").hide();
        this.jobseekerId(userId);
    }


    viewModelCertificationInsertion.deleteCertification = function () {
        var viewModelCertificationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationList");
        var jsonObject = ko.toJS(viewModelCertificationInsertion);
        if (jsonObject.certificationId) {
            var apiUrlEducation = GetWebAPIURL() + '/api/Certification?Id=' + jsonObject.certificationId;

            $.ajax({
                url: apiUrlEducation,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var certificationObject;
                    for (var i = 0, len = viewModelCertificationList.certification().length; i < len; ++i) {
                        certificationObject = viewModelCertificationList.certification()[i];
                        var result = certificationObject.certificationId().localeCompare(jsonObject.certificationId);
                        if (result == 0) {
                            viewModelCertificationList.certification.remove(certificationObject);
                            break;
                        }
                    }

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_Certification").hide();
            this.certificationId("");
            this.certificationName("");
            this.certificationEnrolled("");
            this.certificationInstituion("");
            this.completedDate("");
            this.expireDate("");
            this.certificationDetails("");

            if (viewModelCertificationList.certification().length == 0) {
                $("#Certification_General").show();
                $("#addMoreCertification").hide();
            }
        }
        else {
            alert("No Item selected");
        }
    }

    viewModelCertificationInsertion.saveCertification = function () {
        var viewModelCertificationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationList");
        var jsonObject = ko.toJS(viewModelCertificationInsertion);
        var dataobjCertification;
        if (jsonObject.certificationId) {
            var jobseekerCertificationObj = {}
            jobseekerCertificationObj.JobSeekerId = jsonObject.jobseekerId;
            jobseekerCertificationObj.CertificationName = jsonObject.certificationName;
            jobseekerCertificationObj.CurrentlyEnrolled = jsonObject.certificationEnrolled;
            jobseekerCertificationObj.InstitutionName = jsonObject.certificationInstituion;
            jobseekerCertificationObj.CompletionDate = jsonObject.completedDate;
            jobseekerCertificationObj.ExpirationDate = jsonObject.expireDate;
            jobseekerCertificationObj.CertificationDetails = jsonObject.certificationDetails;

            dataobjCertification = JSON.stringify(jobseekerCertificationObj);

            var apiUrlCertification = GetWebAPIURL() + '/api/Certification?Id=' + jsonObject.certificationId;
            var certificationObject;

            $.ajax({
                url: apiUrlCertification,
                type: "PUT",
                data: dataobjCertification,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    for (var i = 0, len = viewModelCertificationList.certification().length; i < len; ++i) {
                        certificationObject = viewModelCertificationList.certification()[i];
                        var result = certificationObject.certificationId().localeCompare(jsonObject.certificationId);
                        if (result == 0) {
                            certificationObject.certificationId(jsonObject.certificationId);
                            certificationObject.jobseekerId(jsonObject.jobseekerId);

                            certificationObject.certificationName(jsonObject.certificationName);
                            certificationObject.certificationEnrolled(jsonObject.certificationEnrolled);
                            certificationObject.certificationInstituion(jsonObject.certificationInstituion);
                            certificationObject.completedDate(jsonObject.completedDate);
                            certificationObject.expireDate(jsonObject.expireDate);
                            certificationObject.certificationDetails(jsonObject.certificationDetails);


                            viewModelCertificationList.certification()[i] = certificationObject;

                            break;
                        }
                    }


                    $("#Edit_Certification").hide();
                    $("#addMoreCertification").show();


                    this.certificationInstituion("");
                    this.completedDate("");
                    this.expireDate("");
                    this.certificationDetails("");


                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            var jobseekerCertificationObj = {}
            jobseekerCertificationObj.JobSeekerId = jsonObject.jobseekerId;
            jobseekerCertificationObj.CertificationName = jsonObject.certificationName;
            jobseekerCertificationObj.CurrentlyEnrolled = jsonObject.certificationEnrolled;
            jobseekerCertificationObj.InstitutionName = jsonObject.certificationInstituion;
            jobseekerCertificationObj.CompletionDate = jsonObject.completedDate;
            jobseekerCertificationObj.ExpirationDate = jsonObject.expireDate;
            jobseekerCertificationObj.CertificationDetails = jsonObject.certificationDetails;

            dataobjCertification = JSON.stringify(jobseekerCertificationObj);

            var apiUrlCertification = GetWebAPIURL() + '/api/Certification';
            $.ajax({
                url: apiUrlCertification,
                type: "POST",
                data: dataobjCertification,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    getDetails();

                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
            $("#Edit_Certification").hide();
            this.certificationInstituion("");
            this.completedDate("");
            this.expireDate("");
            this.certificationDetails("");
        }

        function getDetails() {

            var apiUrlCertification = GetWebAPIURL() + '/api/Certification?jobSeekerId=' + userId;
            var dataobjCertification;

            //To get certification from Language table
            $.ajax({
                url: apiUrlCertification,
                type: 'GET',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    dataobjCertification = data;
                    viewModelCertificationList.certification.removeAll();
                    for (da in dataobjCertification) {
                        var certification =
                            {
                                jobseekerId: ko.observable(),
                                certificationId: ko.observable(),

                                certificationName: ko.observable(),
                                certificationEnrolled: ko.observable(),
                                certificationInstituion: ko.observable(),
                                completedDate: ko.observable(),
                                expireDate: ko.observable(),
                                certificationDetails: ko.observable()
                            };

                        certification.jobseekerId(dataobjCertification[da].JobSeekerId);
                        certification.certificationId(dataobjCertification[da].Id);

                        certification.certificationName(dataobjCertification[da].CertificationName);
                        certification.certificationEnrolled(dataobjCertification[da].CurrentlyEnrolled);
                        certification.certificationInstituion(dataobjCertification[da].InstitutionName);
                        certification.completedDate(dataobjCertification[da].CompletionDate);
                        certification.expireDate(dataobjCertification[da].ExpirationDate);
                        certification.certificationDetails(dataobjCertification[da].CertificationDetails);

                        viewModelCertificationList.certification.push(certification);
                    }

                },
                error: function (xhr, status, error) {
                    alert('Eroooror :' + status);
                }
            });

            skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationList", viewModelCertificationList);

        }
    }
    viewModelCertificationInsertion.cancelCertification = function () {
        $("#Edit_Certification").hide();
        this.certificationInstituion("");
        this.completedDate("");
        this.expireDate("");
        this.certificationDetails("");
        this.certificationName("");

    }


    viewModelCertificationInsertion.addMoreCertification = function () {
        $("#Edit_Certification").show();
        $("#Certification_General").hide();
        this.jobseekerId(userId);
        this.certificationId("");
        this.certificationName("");
        this.certificationInstituion("");
        this.completedDate("");
        this.expireDate("");
        this.certificationDetails("");

    }

    ko.applyBindings(viewModelCertificationInsertion, viewNode);
}

skillsmart.mediator.jobseekermyinformation.createViewMediatorCertificationList = function () {
    var apiUrlCertification = GetWebAPIURL() + '/api/Certification?jobSeekerId=' + userId;
    var dataobjCertification;

    //To get certification from Language table
    $.ajax({
        url: apiUrlCertification,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjCertification = data;
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });


    if (dataobjCertification.length != 0) {
        $("#Edit_Certification").hide();
        $("#Certification_General").hide();
    }
    else {

        $("#addMoreCertification").hide();
        $("#Edit_Certification").hide();
        $("#List_Certification").hide();

    }

    var viewModelCertificationList = skillsmart.model.jobseekermyinformation.initializeViewModelCertificationList(dataobjCertification);
    skillsmart.mediator.jobseekermyinformation.setViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationList", viewModelCertificationList);
}

skillsmart.mediator.jobseekermyinformation.setupViewDataBindingsCertificationList = function () {
    var viewNode = $("#List_Certification")[0];

    var viewModelCertificationList = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationList");

    viewModelCertificationList.editCertificationDetails = function (certificationObj) {
        var viewModelCertificationInsertion = skillsmart.mediator.jobseekermyinformation.getViewModel("skillsmart.model.jobseekermyinformation.viewModelCertificationInsertion");

        var jsonObj = ko.toJSON(certificationObj);
        var obj = JSON.parse(jsonObj);

        $("#Edit_Certification").show();

        $("#Certification_Name").val(obj.certificationName);
        $("#Certification_Institution").val(obj.certificationInstituion);
        $("#certification_completed_date").val(obj.completedDate);
        $("#expires").val(obj.expireDate);
        $("#Certification_Details").val(obj.certificationDetails);


        $("#JobseekerCertificationId").val(obj.jobseekerId);
        $("#CertificationId").val(obj.certificationId);

        if (obj.certificationEnrolled == "True")
            $('#Certification_currently_Enrolled').prop('checked', true);
        else
            $('#Certification_currently_Enrolled').prop('checked', false);

        viewModelCertificationInsertion.jobseekerId(obj.jobseekerId);

        viewModelCertificationInsertion.certificationId(obj.certificationId);

        viewModelCertificationInsertion.certificationName(obj.certificationName);
        viewModelCertificationInsertion.certificationEnrolled(obj.certificationEnrolled);

        viewModelCertificationInsertion.certificationInstituion(obj.certificationInstituion);
        viewModelCertificationInsertion.completedDate(obj.completedDate);
        viewModelCertificationInsertion.expireDate(obj.expireDate);
        viewModelCertificationInsertion.certificationDetails(obj.certificationDetails);


    }

    ko.applyBindings(viewModelCertificationList, viewNode);
}

skillsmart.mediator.jobseekermyinformation.getViewModel = function (key) {
    return $(document).data(key);
}

skillsmart.mediator.jobseekermyinformation.setViewModel = function (key, viewModel) {
    $(document).data(key, viewModel);
}

