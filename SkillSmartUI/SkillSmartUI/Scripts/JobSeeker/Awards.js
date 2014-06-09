$(document).ready(function () {
    initAwards();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getJobseekerAwards() {

    var apiUrlScholarShip = GetWebAPIURL() + '/api/Scholarship/'
    var dataObjScholarShip;


    //To get Scholarship details
    $.ajax({
        url: apiUrlScholarShip,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjScholarShip = data;
        },
        error: function (xhr, status, error) {
            alert('Eroooror :' + status);
        }
    });
    return dataObjScholarShip;
}

function initAwards() {
    viewModel.addMoreAwardCheck = ko.observable('1');


    //viewModel.displayErrorsAward = ko.observable('0');
    viewModel.awardCheck = ko.observable('0');
    viewModel.isEditableAward = ko.observable(false);
    viewModel.btnAward = ko.observable("Edit");
    viewModel.awardArray = ko.observableArray();

    var dataObjScholarShip = getJobseekerAwards();
    if (dataObjScholarShip) {
        for (var i = 0; i < dataObjScholarShip.length; i++) {
            viewModel.awardCheck('1');
            var award = new createAward(dataObjScholarShip[i]);
            viewModel.awardArray.push(award);

        }
    }

    // viewModel.displayErrorsAward(false);

    //viewModel.displayErrorsAward = ko.observable(false);
}

function createAward(da) {

    var self = this;
    self.JobSeekerId = ko.observable();
    self.Id = ko.observable('');
    self.isEdit = ko.observable('0');
    self.Award = ko.observable().extend({ required: { message: "Award  required" } });
    self.Organization = ko.observable('').extend({ required: { message: "Organization required." } });
    self.Description = ko.observable('').extend({ required: { message: 'Description required' } });
    self.deleteCheck = ko.observable('1');
    self.errorAward = ko.validation.group({ p1: self.Award, p2: self.Organization, p3: self.Description });


    if (da) {
        self.Id(da.Id);
        self.isEdit('0');
        self.Award(da.ScholarshipTitle);
        self.Organization(da.ScholarshipOrganization);
        self.Description(da.ScholarshipDescription);
    }
}
var selectedAward = [];
viewModel.editAwardDetails = function (awardObj) {

    //.Id,selectedAwardObj.Award,selectedAwardObj.Description
    var selectedAwardObj = ko.toJS(awardObj);
    selectedAward.push(selectedAwardObj);
    awardObj.isEdit('1');
    awardObj.deleteCheck('1');
}
viewModel.addFirstAward = function () {
    viewModel.btnAward("Add More");
    viewModel.isEditableAward(true);
    var award = new createAward();
    award.isEdit('1');
    award.deleteCheck('0');
    viewModel.awardArray.push(award);
}

viewModel.saveAward = function (awardObj) {
    if (awardObj.Organization.isValid() && awardObj.Award.isValid() && awardObj.Description.isValid()) {
        viewModel.addMoreAwardCheck('1');
        if (viewModel.awardCheck() == 1) {
            //document.getElementById("addMoreAward").disabled = false;
        }
        var jsonObjectAward = ko.toJS(awardObj);
        if (jsonObjectAward.Id) {
            var dataObjAward;
            var jobSeekerAwardObj = {}
            jobSeekerAwardObj.ScholarshipOrganization = jsonObjectAward.Organization;
            jobSeekerAwardObj.ScholarshipTitle = jsonObjectAward.Award;
            jobSeekerAwardObj.ScholarshipDescription = jsonObjectAward.Description;

            dataObjAward = JSON.stringify(jobSeekerAwardObj);
        var apiUrlAward = GetWebAPIURL() + '/api/Scholarship?Id=' + jsonObjectAward.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlAward,
            type: "PUT",
            data: dataObjAward,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                awardObj.isEdit('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

        }
        else {
            var dataObjAward;
            var jobSeekerAwardObj = {}
            jobSeekerAwardObj.ScholarshipOrganization = jsonObjectAward.Organization;
            jobSeekerAwardObj.ScholarshipTitle = jsonObjectAward.Award;
            jobSeekerAwardObj.ScholarshipDescription = jsonObjectAward.Description;

            dataObjAward = JSON.stringify(jobSeekerAwardObj);
        var apiUrlAward = GetWebAPIURL() + '/api/Scholarship';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlAward,
            type: "Post",
            data: dataObjAward,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                awardObj.isEdit('0');
                awardObj.Id(data);
                viewModel.awardCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

        }
    }
    else {
        awardObj.errorAward.showAllMessages();
        // viewModel.displayErrorsAward(true);

    }


}
viewModel.cancelAward = function (awardObj) {

    var jsonObjectAward = ko.toJS(awardObj);
    if (jsonObjectAward.Id) {
        awardObj.isEdit('0');

    }
    else {
        viewModel.awardArray.remove(awardObj);
    }

    if (viewModel.awardArray().length == 0) {
        viewModel.awardCheck('0');
        viewModel.isEditableAward(false);
    }

    viewModel.addMoreAwardCheck('1');

    for (var i = 0; i < selectedAward.length; i++) {
        if (selectedAward[i].Id == awardObj.Id()) {
            awardObj.Award(selectedAward[i].Award);
            awardObj.Organization(selectedAward[i].Organization);
            awardObj.Description(selectedAward[i].Description);
        }

    }
}
viewModel.deleteAward = function (awardObj) {

    var jsonObjectAward = ko.toJS(awardObj);
    var AwardDelete = confirm("Do you want to delete!");

    if (AwardDelete == true) {
        if (jsonObjectAward.Id) {
            var apiUrlAward = GetWebAPIURL() + '/api/Scholarship?Id=' + jsonObjectAward.Id;
            //To delete data from Language Table
            $.ajax({
                url: apiUrlAward,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.awardArray.remove(awardObj);
                    if (viewModel.awardArray().length == 0) {
                        viewModel.awardCheck('0');
                        viewModel.isEditableAward(false);
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
        else {
            viewModel.awardArray.remove(awardObj);
        }
    }
}

viewModel.clickButtonAward = function () {

    //document.getElementById("addMoreAward").disabled = true;
    if (viewModel.btnAward() == "Add More") {

        var award = new createAward();
        award.isEdit('1');
        award.deleteCheck('0');
        viewModel.awardArray.splice(0, 0, award);

        viewModel.addMoreAwardCheck('0');
    }

    else {
        viewModel.addMoreAwardCheck('1');

        // document.getElementById("addMoreAward").disabled = false;
        viewModel.btnAward("Add More");
        viewModel.isEditableAward(true);
    }

}

viewModel.doneEditingAwards = function () {
    viewModel.btnAward("Edit");
    viewModel.isEditableAward(false);


    for (var i = 0; i < viewModel.awardArray().length; i++) {
        if (viewModel.awardArray()[i].Id() == "") {
            viewModel.awardArray.remove(viewModel.awardArray()[i]);
        }
        viewModel.awardArray()[i].isEdit('0');
    }
}

viewModel.whichTemplateToUseAward = function () {
    return viewModel.isEditableAward() ? "EditAward" : "ViewAward";
}



ko.validation.init({
    registerExtenders: true,
    messagesOnModified: false,
    insertMessages: true
});