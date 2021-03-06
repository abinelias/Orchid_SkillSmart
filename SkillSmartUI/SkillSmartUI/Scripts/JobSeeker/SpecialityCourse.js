﻿$(document).ready(function () {
    initSpeciality();
});



function getJobseekerSpecialityCourse() {
    var apiUrlSpecialityCourse = GetWebAPIURL() + 'api/SpecialityCourse/';
    var dataobjSpecialityCourse;
    //To get Education details 
    $.ajax({
        url: apiUrlSpecialityCourse,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjSpecialityCourse = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjSpecialityCourse;
}

function initSpeciality() {
    viewModel.specialityCourse = ko.observableArray();
    viewModel.specialityCourseCheck = ko.observable('0');
    viewModel.specialityCourseButtonCheck = ko.observable('0');


    var dataobjSpecialityCourse = getJobseekerSpecialityCourse();

    if (dataobjSpecialityCourse.length != 0) {
        viewModel.specialityCourseCheck('1');
    }
    if (dataobjSpecialityCourse) {
        for (var i = 0; i < dataobjSpecialityCourse.length; i++) {
            viewModel.specialityCourseButtonCheck('1');

            var SpecialityCourse = new specialityCourseCreate(dataobjSpecialityCourse[i]);
            viewModel.specialityCourse.push(SpecialityCourse);

        }
    }
}



var dataDegreeTypeObj = getDegreeTypeLookup();
function specialityCourseCreate(objSpecialityCourse) {
    var self = this;
    self.jobSeekerId = ko.observable();
    self.specialityCourseId = ko.observable('');
    self.specialityCourseName = ko.observable().extend({ required: { message: "Speciality Course required" } });
    self.specialityCourseDescription = ko.observable().extend({ required: { message: "Description required" } });

    self.deleteCheck = ko.observable('1');
    self.isEditSpecialityCourse = ko.observable('0');

    self.errorSpecialityCourse = ko.validation.group({ p1: self.specialityCourseName, p2: self.specialityCourseDescription });
    if (objSpecialityCourse) {
        self.specialityCourseName(objSpecialityCourse.CourseName);
        self.specialityCourseDescription(objSpecialityCourse.CourseDescription);
        self.specialityCourseId(objSpecialityCourse.Id);
    }
}

viewModel.addMoreSpecialityCourse = function () {
    document.getElementById("addMoreSpecialityCourse").disabled = true;
    var SpecialityCourse = new specialityCourseCreate();
    SpecialityCourse.isEditSpecialityCourse('1');

    SpecialityCourse.deleteCheck('0');
    viewModel.specialityCourse.splice(0, 0, SpecialityCourse);
}

viewModel.addFirstSpecialityCourse = function () {
    // viewModel.isEditableEducation(true);
    viewModel.specialityCourseCheck('1');
    var SpecialityCourse = new specialityCourseCreate();
    SpecialityCourse.isEditSpecialityCourse('1');
    SpecialityCourse.deleteCheck('0');
    viewModel.specialityCourse.push(SpecialityCourse);
    viewModel.specialityCourseButtonCheck('0');

}

var SelectedSpecialityCourseObj;

viewModel.cancelSpecialityCourse = function (specialityCourseObj) {
    if (viewModel.specialityCourseButtonCheck() == 1) {
        document.getElementById("addMoreSpecialityCourse").disabled = false;
    }
    else {
        viewModel.specialityCourseCheck('0');
    }
    specialityCourseObj.isEditSpecialityCourse('0');
    var jsonObjectSpecialityCourse = ko.toJS(specialityCourseObj);
    if (jsonObjectSpecialityCourse.specialityCourseId) {
        specialityCourseObj.specialityCourseName(SelectedSpecialityCourseObj.specialityCourseName);
        specialityCourseObj.specialityCourseDescription(SelectedSpecialityCourseObj.specialityCourseDescription);

        specialityCourseObj.isEditSpecialityCourse('0');
    }
    else {
        viewModel.specialityCourse.remove(specialityCourseObj);
    }
    SelectedSpecialityCourseObj = "";
}

viewModel.saveSpecialityCourse = function (specialityCourseObj) {
    if (specialityCourseObj.specialityCourseName.isValid() && specialityCourseObj.specialityCourseDescription.isValid()) {

       

        var jsonObjectSpecialityCourse = ko.toJS(specialityCourseObj);

        if (jsonObjectSpecialityCourse.specialityCourseId) {
            var dataobjSpecialityCourse;
            var jobseekerSpecialityCourseObj = {}
            jobseekerSpecialityCourseObj.CourseName = jsonObjectSpecialityCourse.specialityCourseName;
            jobseekerSpecialityCourseObj.CourseDescription = jsonObjectSpecialityCourse.specialityCourseDescription;

            dataobjSpecialityCourse = JSON.stringify(jobseekerSpecialityCourseObj);

            var apiUrlSpecialityCourse = GetWebAPIURL() + '/api/SpecialityCourse?Id=' + jsonObjectSpecialityCourse.specialityCourseId;;
            //To update Education table
            $.ajax({
                url: apiUrlSpecialityCourse,
                type: "PUT",
                data: dataobjSpecialityCourse,
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    specialityCourseObj.isEditSpecialityCourse('0');
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });


        }
        else {
            var dataobjSpecialityCourse;
            var jobseekerSpecialityCourseObj = {}
            jobseekerSpecialityCourseObj.CourseName = jsonObjectSpecialityCourse.specialityCourseName;
            jobseekerSpecialityCourseObj.CourseDescription = jsonObjectSpecialityCourse.specialityCourseDescription;

            dataobjSpecialityCourse = JSON.stringify(jobseekerSpecialityCourseObj);


            var apiUrlSpecialityCourse = GetWebAPIURL() + '/api/SpecialityCourse/';
            //To create Education details
            $.ajax({
                url: apiUrlSpecialityCourse,
                type: "POST",
                data: dataobjSpecialityCourse,
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    specialityCourseObj.specialityCourseId(data);
                    specialityCourseObj.isEditSpecialityCourse('0');
                    viewModel.specialityCourseButtonCheck('1');
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
    }
    else {
        specialityCourseObj.errorSpecialityCourse.showAllMessages();
    }
}

viewModel.deleteSpecialityCourse = function (specialityCourseObj) {
    var jsonObjectSpecialityCourse = ko.toJS(specialityCourseObj);

    var SpecialityCourseDelete = confirm("Do you want to delete!");
    if (SpecialityCourseDelete == true) {

        if (jsonObjectSpecialityCourse.specialityCourseId) {
            var apiUrlSpecialityCourse = GetWebAPIURL() + '/api/SpecialityCourse?Id=' + jsonObjectSpecialityCourse.specialityCourseId;
            //To delete data from Education Table
            $.ajax({
                url: apiUrlSpecialityCourse,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.specialityCourse.remove(specialityCourseObj);
                    if (viewModel.specialityCourse().length == 0) {
                        viewModel.specialityCourseCheck('0');
                        viewModel.specialityCourseButtonCheck('0');
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            viewModel.specialityCourse.remove(specialityCourseObj);
        }
    }
}
viewModel.editSpecialityCourseDetails = function (specialityCourseObj) {
    SelectedSpecialityCourseObj = ko.toJS(specialityCourseObj);
    specialityCourseObj.isEditSpecialityCourse('1');
    specialityCourseObj.deleteCheck('1');
}
