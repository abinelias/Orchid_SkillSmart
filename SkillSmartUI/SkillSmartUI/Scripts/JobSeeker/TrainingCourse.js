﻿$(document).ready(function () {
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
    var apiUrlTrainingCourse = GetWebAPIURL() + '/api/TrainingCourse?jobSeekerId=' + userId;
    var dataobjTrainingCourse;

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
    return dataobjTrainingCourse;
}

function initTrainingCourse() {
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
    self.jobseekerId = ko.observable(userId);
    self.trainingId = ko.observable();
    self.programTypeId = ko.observable();
    self.selectedIndexProgramType = ko.observable(0);

    self.currentlyEnrolled = ko.observable();
   
    self.focus = ko.observable();

    self.certificationInstituion = ko.observable();
    self.completedDate = ko.observable();
    self.expireDate = ko.observable();
    self.certificationDetails = ko.observable();
    self.isEditTraining = ko.observable('0');
    self.deleteCheck = ko.observable('1');

    self.emailAddress = ko.observable();
    self.phone = ko.observable();
    self.address = ko.observable();
    self.city = ko.observable();
    self.state = ko.observable();
    self.url = ko.observable();

    if (objTrainingCourse) {
        self.jobseekerId(objTrainingCourse.JobSeekerId);

        self.trainingId(objTrainingCourse.Id);
        self.programTypeId(objTrainingCourse.ProgramTypeId);
        for (da in dataProgramTypeObj) {
            if (objTrainingCourse.ProgramTypeId == dataProgramTypeObj[da].Id) {
                self.selectedIndexProgramType(da);
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
    if (viewModel.trainingButtonCheck() == 1) {
        document.getElementById("addMoreTrainingCourse").disabled = false;
    }
    var jsonObjectVM = ko.toJS(viewModel);
    var jsonObjectTrainingCourse = ko.toJS(trainingCourseObj);

    if (jsonObjectTrainingCourse.trainingId) {
        var dataobjTrainingCourse;
        var jobseekerTrainingCourseObj = {}
        jobseekerTrainingCourseObj.JobSeekerId = jsonObjectTrainingCourse.jobseekerId;
        jobseekerTrainingCourseObj.ProgramTypeId = viewModel.dataProgramType()[trainingCourseObj.selectedIndexProgramType()].value;
        jobseekerTrainingCourseObj.Focus = jsonObjectTrainingCourse.focus;
        jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObjectTrainingCourse.currentlyEnrolled;

        jobseekerTrainingCourseObj.InstitutionName = jsonObjectTrainingCourse.certificationInstituion;
        jobseekerTrainingCourseObj.ExpirationDate = convert(jsonObjectTrainingCourse.expireDate);
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
        jobseekerTrainingCourseObj.JobSeekerId = jsonObjectVM.jobseekerId;
        jobseekerTrainingCourseObj.ProgramTypeId = viewModel.dataProgramType()[trainingCourseObj.selectedIndexProgramType()].value;
        jobseekerTrainingCourseObj.Focus = jsonObjectTrainingCourse.focus;
        jobseekerTrainingCourseObj.CurrentlyEnrolled = jsonObjectTrainingCourse.currentlyEnrolled;

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




}

var SelectedTrainingCourse;

viewModel.cancelTrainingCourse = function (trainingCourseObj) {
    if (viewModel.trainingButtonCheck() == 1) {
        document.getElementById("addMoreTrainingCourse").disabled = false;
    }
    else {
        viewModel.trainingCheck('0');
    }
    trainingCourseObj.isEditTraining('0');
    var jsonObjectTraining = ko.toJS(trainingCourseObj);
    if (jsonObjectTraining.trainingId) {
        trainingCourseObj.selectedIndexProgramType(selectedprogramType);
        trainingCourseObj.focus(SelectedTrainingCourse.focus);
        trainingCourseObj.currentlyEnrolled(SelectedTrainingCourse.currentlyEnrolled);

        trainingCourseObj.certificationInstituion(SelectedTrainingCourse.certificationInstituion);
        trainingCourseObj.completedDate(SelectedTrainingCourse.completedDate);
        trainingCourseObj.expireDate(SelectedTrainingCourse.expireDate);
        trainingCourseObj.certificationDetails(SelectedTrainingCourse.certificationDetails);
        trainingCourseObj.isEditTraining('0');

    }
    else {
        viewModel.trainingCourse.remove(trainingCourseObj);
    }
}

viewModel.addMoreTrainingCourse = function () {
    document.getElementById("addMoreTrainingCourse").disabled = true;
    var TrainingCourse = new trainingCourseCreate();
    TrainingCourse.isEditTraining('1');
    TrainingCourse.deleteCheck('0');
    viewModel.trainingCourse.splice(0, 0, TrainingCourse);
}
var selectedprogramType;
viewModel.editTrainingCourseDetails = function (trainingCourseObj) {
    selectedprogramType = trainingCourseObj.selectedIndexProgramType();
    trainingCourseObj.isEditTraining('1');
    trainingCourseObj.deleteCheck('1');
    SelectedTrainingCourse = ko.toJS(trainingCourseObj);
}
function convert(str) {
    if (str == 'present') {
        return str;
    }
    else {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [mnth, day, date.getFullYear()].join("/");
    }
}




