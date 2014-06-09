$(document).ready(function () {
    initTrainingCourse();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getProgramTypeLookUp() {
    var apiUrlProgramType = GetWebAPIURL() + '/api/Lookup/?name=ProgramType';
    var dataProgramTypeObj;

    //To get details of ProgramType lookup
    $.ajax({
        url: apiUrlProgramType,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        success: function (data) {
            dataProgramTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataProgramTypeObj;
}

function getTrainingCourse() {
    var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse/';
    var dataobjTrainingCourse;

    $.ajax({
        url: apiUrlTrainingCourse,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjTrainingCourse = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjTrainingCourse;
}
function initTrainingCourse() {
    var dataObjJobSeeker = getHeaderDetails();
    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName);
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName);

    viewModel.trainingCourse = ko.observableArray();
    viewModel.programType = ko.observableArray();
    viewModel.trainingCheck = ko.observable('0');
    viewModel.trainingButtonCheck = ko.observable('0');

    viewModel.dataProgramType = ko.observable(createListProgramType());
    var dataProgramTypeObj = getProgramTypeLookUp();
    /*viewModel.programType.push({ name: "Program Type", id: "" });
    for (da in dataProgramTypeObj) {
        viewModel.programType.push({ name: dataProgramTypeObj[da].Name, id: dataProgramTypeObj[da].Id });
    }*/

    var dataobjTrainingCourse = getTrainingCourse();
    if (dataobjTrainingCourse.length != 0) {
        viewModel.trainingCheck('1');
    }
    if (dataobjTrainingCourse) {

        for (var i = 0; i < dataobjTrainingCourse.length; i++) {
            viewModel.trainingButtonCheck('1');

            var TrainingCourse = new trainingCourseCreate(dataobjTrainingCourse[i]);
            viewModel.trainingCourse.push(TrainingCourse);

        }
    }
}

function createListProgramType() {

    var dataProgramTypeObj = getProgramTypeLookUp();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataProgramTypeObj) {
        list.push({
            label: dataProgramTypeObj[da].Name,
            value: dataProgramTypeObj[da].Id
        });
    }
    return list;
}
var dataProgramTypeObj = getProgramTypeLookUp();

function trainingCourseCreate(objTrainingCourse) {

    var self = this;
    self.jobseekerId = ko.observable();
    self.trainingId = ko.observable();
    self.programTypeId = ko.observable();
    self.selectedIndexProgramType = ko.observable(0);

    self.currentlyEnrolled = ko.observable();

    self.focus = ko.observable().extend({ required: { message: "focus required" } });

    self.certificationInstituion = ko.observable().extend({ required: { message: "Institution required" } });
    self.completedDate = ko.observable().extend({ required: { message: "Completed Date Required " } });
    self.expireDate = ko.observable().extend({ required: { message: "Expire Date Required " } });
    self.certificationDetails = ko.observable().extend({ required: { message: "Certification Details Required " } });
    self.isEditTraining = ko.observable('0');
    self.deleteCheck = ko.observable('1');

    self.emailAddress = ko.observable().extend({ required: { message: "email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } });
    self.phone = ko.observable().extend({ required: { message: "phone required" } });
    self.address = ko.observable().extend({ required: { message: "address required" } });
    self.city = ko.observable().extend({ required: { message: "city required" } });
    self.state = ko.observable().extend({ required: { message: "state required" } });
    self.url = ko.observable().extend({ required: { message: "Website required" } });

    self.errorTrainingCourse = ko.validation.group({ p1: self.focus, p2: self.certificationInstituion, p4: self.expireDate, p5: self.certificationDetails, p7: self.emailAddress, p8: self.phone, p9: self.address, p10: self.city, p11: self.state, p12: self.url });
    self.errorCheckProgramType = ko.observable('0');

    self.btnTrainingSkill = ko.observable('+');
    if (objTrainingCourse) {

        self.trainingId(objTrainingCourse.Id);
        self.programTypeId(objTrainingCourse.ProgramTypeId);
        for (da in dataProgramTypeObj) {
            if (objTrainingCourse.ProgramTypeId == dataProgramTypeObj[da].Id) {
                self.selectedIndexProgramType((parseInt(da) + 1));
            }
        }
        self.currentlyEnrolled(objTrainingCourse.CurrentlyEnrolled);
        self.focus(objTrainingCourse.Focus);

        self.certificationInstituion(objTrainingCourse.InstitutionName);
        self.completedDate(objTrainingCourse.CompletionDate);
        self.expireDate(objTrainingCourse.ExpirationDate);
        self.certificationDetails(objTrainingCourse.TrainingDetails);

        self.emailAddress(objTrainingCourse.Email);
        self.phone(objTrainingCourse.Phone);
        self.address(objTrainingCourse.Address);
        self.city(objTrainingCourse.City);
        self.state(objTrainingCourse.State);
        self.url(objTrainingCourse.Website);

        self.isEditTraining('0');
    }
    self.programTypeName = ko.computed(function () {
        return viewModel.dataProgramType()[self.selectedIndexProgramType()].label;
    }, this);

    self.currentlyEnrolled.subscribe(function (newValue) {
        if (self.currentlyEnrolled() == true) {
            $("#training_endDate").hide();

        }
    });
}

viewModel.addFirstTrainingCourse = function () {
    viewModel.trainingCheck('1');
    var TrainingCourse = new trainingCourseCreate();
    TrainingCourse.isEditTraining('1');
    TrainingCourse.deleteCheck('0');
    viewModel.trainingCourse.splice(0, 0, TrainingCourse);
    viewModel.trainingButtonCheck('0');
}

viewModel.deleteTrainingCourse = function (trainingCourseObj) {

    var jsonObjectVM = ko.toJS(viewModel);
    var jsonObjectTrainingCourse = ko.toJS(trainingCourseObj);
    var deleteCourse = confirm("Do you want to delete!");
    if (deleteCourse==true) {
        if (jsonObjectTrainingCourse.trainingId) {
            var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?Id=' + jsonObjectTrainingCourse.trainingId;
            //To delete data from Training Course
            $.ajax({
                url: apiUrlTrainingCourse,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.trainingCourse.remove(trainingCourseObj);
                    if (viewModel.trainingCourse().length == 0) {
                        viewModel.trainingCheck('0');
                        viewModel.trainingButtonCheck('0');
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            viewModel.trainingCourse.remove(trainingCourseObj);
        }
    }
}

viewModel.saveTrainingCourse = function (trainingCourseObj) {
    if (trainingCourseObj.focus.isValid() && trainingCourseObj.certificationInstituion.isValid()  && trainingCourseObj.expireDate.isValid() && trainingCourseObj.certificationDetails.isValid() && trainingCourseObj.emailAddress.isValid() && trainingCourseObj.phone.isValid() && trainingCourseObj.address.isValid() && trainingCourseObj.city.isValid() && trainingCourseObj.state.isValid() && trainingCourseObj.url.isValid() && trainingCourseObj.selectedIndexProgramType() > 0) {
        viewModel.trainingButtonCheck('1');
        if (viewModel.trainingButtonCheck() == 1) {
            document.getElementById("addMoreTrainingCourse").disabled = false;
        }
        var jsonObjectVM = ko.toJS(viewModel);
        var jsonObjectTrainingCourse = ko.toJS(trainingCourseObj);

        if (jsonObjectTrainingCourse.trainingId) {
            var dataobjTrainingCourse;
            var jobseekerTrainingCourseObj = {}
            jobseekerTrainingCourseObj.ProgramTypeId = viewModel.dataProgramType()[trainingCourseObj.selectedIndexProgramType()].value;
            jobseekerTrainingCourseObj.Focus = jsonObjectTrainingCourse.focus;
            jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObjectTrainingCourse.currentlyEnrolled;

            jobseekerTrainingCourseObj.InstitutionName = jsonObjectTrainingCourse.certificationInstituion;
            jobseekerTrainingCourseObj.ExpirationDate = convert(jsonObjectTrainingCourse.expireDate);
            jobseekerTrainingCourseObj.CompletionDate = convert(jsonObjectTrainingCourse.completedDate);
            if (jsonObjectTrainingCourse.currentlyEnrolled) {
                jobseekerTrainingCourseObj.CompletionDate = "present";
                jsonObjectTrainingCourse.completedDate = "present";
            }
            else {
                jobseekerTrainingCourseObj.CompletionDate = convert(jsonObjectTrainingCourse.completedDate);
            }
            jobseekerTrainingCourseObj.TrainingDetails = jsonObjectTrainingCourse.certificationDetails;

            jobseekerTrainingCourseObj.Email = jsonObjectTrainingCourse.emailAddress;
            jobseekerTrainingCourseObj.Phone = jsonObjectTrainingCourse.phone;
            jobseekerTrainingCourseObj.Address = jsonObjectTrainingCourse.address;
            jobseekerTrainingCourseObj.City = jsonObjectTrainingCourse.city;
            jobseekerTrainingCourseObj.State = jsonObjectTrainingCourse.state;
            jobseekerTrainingCourseObj.Website = jsonObjectTrainingCourse.url;

            dataobjTrainingCourse = JSON.stringify(jobseekerTrainingCourseObj);
        var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?Id=' + jsonObjectTrainingCourse.trainingId;
        $.ajax({
            url: apiUrlTrainingCourse,
            type: "PUT",
            data: dataobjTrainingCourse,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                trainingCourseObj.isEditTraining('0');
                trainingCourseObj.completedDate(convert(jsonObjectTrainingCourse.completedDate));
                trainingCourseObj.expireDate(convert(jsonObjectTrainingCourse.expireDate));
            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
    }
        else {
            var jobseekerTrainingCourseObj = {}
            var dataobjTrainingCourse;
            jobseekerTrainingCourseObj.ProgramTypeId = viewModel.dataProgramType()[trainingCourseObj.selectedIndexProgramType()].value;
            jobseekerTrainingCourseObj.Focus = jsonObjectTrainingCourse.focus;
            jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObjectTrainingCourse.currentlyEnrolled;

            jobseekerTrainingCourseObj.CompletionDate = convert(jsonObjectTrainingCourse.completedDate);
            jobseekerTrainingCourseObj.InstitutionName = jsonObjectTrainingCourse.certificationInstituion;
            if (jsonObjectTrainingCourse.currentlyEnrolled) {
                jobseekerTrainingCourseObj.CompletionDate = "present";
                jsonObjectTrainingCourse.completedDate = "present";
            }
            else {
                jobseekerTrainingCourseObj.CompletionDate = convert(jsonObjectTrainingCourse.completedDate);
            }
            jobseekerTrainingCourseObj.ExpirationDate = convert(jsonObjectTrainingCourse.expireDate);

            jobseekerTrainingCourseObj.TrainingDetails = jsonObjectTrainingCourse.certificationDetails;

            jobseekerTrainingCourseObj.Email = jsonObjectTrainingCourse.emailAddress;
            jobseekerTrainingCourseObj.Phone = jsonObjectTrainingCourse.phone;
            jobseekerTrainingCourseObj.Address = jsonObjectTrainingCourse.address;
            jobseekerTrainingCourseObj.City = jsonObjectTrainingCourse.city;
            jobseekerTrainingCourseObj.State = jsonObjectTrainingCourse.state;
            jobseekerTrainingCourseObj.Website = jsonObjectTrainingCourse.url;

            dataobjTrainingCourse = JSON.stringify(jobseekerTrainingCourseObj);

        var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse';
        //To create Training Course Details
        $.ajax({
            url: apiUrlTrainingCourse,
            type: "POST",
            data: dataobjTrainingCourse,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                trainingCourseObj.trainingId(data);
                trainingCourseObj.isEditTraining('0');
                trainingCourseObj.completedDate(convert(jsonObjectTrainingCourse.completedDate));
                trainingCourseObj.expireDate(convert(jsonObjectTrainingCourse.expireDate));
                viewModel.trainingButtonCheck('1');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
        trainingCourseObj.errorCheckProgramType('0');
    }

    else {
        trainingCourseObj.errorTrainingCourse.showAllMessages();
        if (trainingCourseObj.selectedIndexProgramType() <= 0) {
            trainingCourseObj.errorCheckProgramType('1');
        }
        else { trainingCourseObj.errorCheckProgramType('0'); }
    }
}

var SelectedTrainingCourse = [];

viewModel.cancelTrainingCourse = function (trainingCourseObj) {

    trainingCourseObj.isEditTraining('0');
    var jsonObjectTraining = ko.toJS(trainingCourseObj);
    if (jsonObjectTraining.trainingId) {

        trainingCourseObj.isEditTraining('0');

    }
    else {
        viewModel.trainingCourse.remove(trainingCourseObj);
    }
    if (viewModel.trainingCourse().length == 0) {
        viewModel.trainingCheck('0');
    }
    else {
        viewModel.trainingButtonCheck('1');
    }

    trainingCourseObj.errorCheckProgramType('0');

    for (var i = 0; i < SelectedTrainingCourse.length; i++) {
        if (SelectedTrainingCourse[i].trainingId == trainingCourseObj.trainingId()) {
            trainingCourseObj.selectedIndexProgramType(SelectedTrainingCourse[i].selectedIndexProgramType);
            trainingCourseObj.focus(SelectedTrainingCourse[i].focus);
            trainingCourseObj.currentlyEnrolled(SelectedTrainingCourse[i].currentlyEnrolled);

            trainingCourseObj.certificationInstituion(SelectedTrainingCourse[i].certificationInstituion);
            trainingCourseObj.completedDate(SelectedTrainingCourse[i].completedDate);
            trainingCourseObj.expireDate(SelectedTrainingCourse[i].expireDate);
            trainingCourseObj.certificationDetails(SelectedTrainingCourse[i].certificationDetails);

            trainingCourseObj.url(SelectedTrainingCourse[i].url);
            trainingCourseObj.emailAddress(SelectedTrainingCourse[i].emailAddress);
            trainingCourseObj.state(SelectedTrainingCourse[i].state);
            trainingCourseObj.city(SelectedTrainingCourse[i].city);
            trainingCourseObj.phone(SelectedTrainingCourse[i].phone);
            trainingCourseObj.address(SelectedTrainingCourse[i].address);
        }

    }
}

viewModel.addMoreTrainingCourse = function () {
    document.getElementById("addMoreTrainingCourse").disabled = true;
    var TrainingCourse = new trainingCourseCreate();
    TrainingCourse.isEditTraining('1');
    TrainingCourse.deleteCheck('0');
    viewModel.trainingCourse.splice(0, 0, TrainingCourse);

    viewModel.trainingButtonCheck('0');
}


viewModel.editTrainingCourseDetails = function (trainingCourseObj) {

    trainingCourseObj.isEditTraining('1');
    trainingCourseObj.deleteCheck('1');
    var SelectedTrainingCourseObj = ko.toJS(trainingCourseObj);
    SelectedTrainingCourse.push(SelectedTrainingCourseObj);
}

viewModel.expandTrainingSkill = function (trainingCourseObj) {
    if (trainingCourseObj.btnTrainingSkill() == '+') {
        trainingCourseObj.btnTrainingSkill('-');
    }
    else {
        trainingCourseObj.btnTrainingSkill('+');
    }
}

function AddTrainingSkills(trainingId, acquiredId) {
    // alert(JOBSEEKERID);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&acquiredId=" + acquiredId + "&workHistoryId" + trainingId);
    $('#ManageHoldingsDiv').dialog(
        {
            open: function () {
                $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar").css("background-color", "#C4E1F1");
            },
            width: 750,
            minWidth: 700,
            minHeight: 380,
            modal: true,
            hideTitleBar: false,
            resizable: true,
            title: "Add Skill",
            closeOnEscape: true,
            close: function (event, ui) { $(this).dialog('destroy'); },
            buttons: {
                'Close': function () {
                    window.location.reload();
                    $(this).dialog('destroy');
                }
            }
        });

    $("#ManageHoldingsFrame").show();
}

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});
