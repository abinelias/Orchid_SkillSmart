$(document).ready(function () {
    initEducation();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getDegreeTypeLookup() {
    var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
    var dataDegreeTypeObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlDegreeType,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        success: function (data) {
            dataDegreeTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataDegreeTypeObj;
}

function getJobseekerEducation() {

    var apiUrlEducation = GetWebAPIURL() + '/api/Education/';
    var dataobjEducation;

    //To get Education details 
    $.ajax({
        url: apiUrlEducation,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataobjEducation = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });
    return dataobjEducation;
}
function initEducation() {

    viewModel.degree = ko.observableArray();
    viewModel.education = ko.observableArray();
    viewModel.educationCheck = ko.observable('0');
    viewModel.educationButtonCheck = ko.observable('0');

    var dataDegreeTypeObj = getDegreeTypeLookup();
    viewModel.dataDegreeType = ko.observable(createListDegreeType());


    /*  viewModel.degree.push({ name: "Degree", id: "" });
      for (da in dataDegreeTypeObj) {
          viewModel.degree.push({ name: dataDegreeTypeObj[da].Name, id: dataDegreeTypeObj[da].Id });
      }*/



    var dataobjEducation = getJobseekerEducation();

    if (dataobjEducation.length != 0) {
        viewModel.educationCheck('1');
    }
    if (dataobjEducation) {
        for (var i = 0; i < dataobjEducation.length; i++) {
            viewModel.educationButtonCheck('1');

            var Education = new educationCreate(dataobjEducation[i]);
            viewModel.education.push(Education);

        }
    }

}


function createListDegreeType() {

    var dataDegreeTypeObj = getDegreeTypeLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataDegreeTypeObj) {
        list.push({
            label: dataDegreeTypeObj[da].Name,
            value: dataDegreeTypeObj[da].Id
        });
    }
    return list;
}

var dataDegreeTypeObj = getDegreeTypeLookup();
function educationCreate(objEducation) {
    var self = this;
    self.universityName = ko.observable().extend({ required: { message: "University Name required" } });
    self.degreeId = ko.observable();
    self.startDate = ko.observable().extend({ required: { message: "Start Date required" } });
    self.endDate = ko.observable().extend({ required: { message: "End Date required" } });
    self.universityLocation = ko.observable().extend({ required: { message: "University Location required" } });
    self.majorFocus = ko.observable().extend({ required: { message: "Focus required" } });
    self.deleteCheck = ko.observable('1');
    self.selectedIndexDegreeType = ko.observable(0);

    self.jobSeekerId = ko.observable();
    self.isEditEducation = ko.observable('0');

    self.btnEducationSkill = ko.observable('+');
    self.educationId = ko.observable('');
    self.currentlyStudying = ko.observable(false);

    self.errorEducation = ko.validation.group({ p1: self.universityName, p2: self.startDate, p3: self.endDate, p4: self.majorFocus, p5: self.universityLocation });

    self.errorCheckDegree = ko.observable('0');
    if (objEducation) {
        self.universityName(objEducation.InstitutionName);
        self.degreeId(objEducation.DegreeId);
        for (da in dataDegreeTypeObj) {
            if (objEducation.DegreeId == dataDegreeTypeObj[da].Id) {
                self.selectedIndexDegreeType((parseInt(da) + 1));
            }
        }
        self.startDate(objEducation.StartDate);
        self.endDate(objEducation.EndDate);
        self.universityLocation(objEducation.InstitutionLocation);
        self.majorFocus(objEducation.MajorFocus);

        self.educationId(objEducation.Id);

        self.isEditEducation('0');
        if (objEducation.EndDate == 'present') {
            self.currentlyStudying(true);
        }

    }
    self.degreeName = ko.computed(function () {

        return viewModel.dataDegreeType()[self.selectedIndexDegreeType()].label;
    }, this);

    self.currentlyStudying.subscribe(function (newValue) {
        if (self.currentlyStudying() == true) {
            $("#education_endDate").hide();

        }
    });
}

viewModel.addMoreEducation = function () {

    viewModel.educationButtonCheck('0');
    // document.getElementById("addMoreEducation").disabled = true;
    var Education = new educationCreate();
    Education.isEditEducation('1');

    Education.deleteCheck('0');
    viewModel.education.splice(0, 0, Education);
    viewModel.isEditableEducation(true);


}

viewModel.addFirstEducation = function () {
    // viewModel.isEditableEducation(true);
    viewModel.educationCheck('1');
    var Education = new educationCreate();
    Education.isEditEducation('1');
    Education.deleteCheck('0');
    viewModel.education.push(Education);
    viewModel.educationButtonCheck('0');

}

var SelectedEducation = [];

viewModel.cancelEducation = function (educationObj) {



    educationObj.isEditEducation('0');
    var jsonObjectEducation = ko.toJS(educationObj);
    if (jsonObjectEducation.educationId) {

        educationObj.isEditEducation('0');
    }
    else {
        viewModel.education.remove(educationObj);
    }

    if (viewModel.education().length == 0) {
        viewModel.educationCheck('0');
    }
    else {
        viewModel.educationButtonCheck('1');
    }

    educationObj.errorCheckDegree('0');

    for (var i = 0; i < SelectedEducation.length; i++) {
        if (SelectedEducation[i].educationId == educationObj.educationId()) {
            educationObj.universityName(SelectedEducation[i].universityName);
            educationObj.universityLocation(SelectedEducation[i].universityLocation);
            educationObj.majorFocus(SelectedEducation[i].majorFocus);
            educationObj.startDate(SelectedEducation[i].startDate);
            educationObj.endDate(SelectedEducation[i].endDate);
            educationObj.selectedIndexDegreeType(SelectedEducation[i].selectedIndexDegreeType);
        }

    }
}

viewModel.saveEducation = function (educationObj) {

    if (educationObj.universityName.isValid() && educationObj.majorFocus.isValid() && educationObj.startDate.isValid()  && educationObj.universityLocation.isValid() && educationObj.selectedIndexDegreeType() > 0) {
        viewModel.educationButtonCheck('1');
        /*if (viewModel.educationButtonCheck() == 1) {
            document.getElementById("addMoreEducation").disabled = false;
        }*/

        var jsonObjectEducation = ko.toJS(educationObj);
        var jsonObjectVM = ko.toJS(viewModel);

        if (jsonObjectEducation.educationId) {
            var dataobjEducation;
            var jobseekerEducationObj = {}
            jobseekerEducationObj.InstitutionName = jsonObjectEducation.universityName;
            jobseekerEducationObj.DegreeId = viewModel.dataDegreeType()[educationObj.selectedIndexDegreeType()].value;
            jobseekerEducationObj.StartDate = convert(jsonObjectEducation.startDate);
            jobseekerEducationObj.EndDate = convert(jsonObjectEducation.endDate);
            jobseekerEducationObj.MajorFocus = jsonObjectEducation.majorFocus;
            jobseekerEducationObj.InstitutionLocation = jsonObjectEducation.universityLocation;
            if (jsonObjectEducation.currentlyStudying) {
                jobseekerEducationObj.EndDate = "present";
                jsonObjectEducation.endDate = "present";
            }
            else {
                jobseekerEducationObj.EndDate = convert(jsonObjectEducation.endDate);
            }
            dataobjEducation = JSON.stringify(jobseekerEducationObj);

        var apiUrlEducation = GetWebAPIURL() + '/api/Education?Id=' + jsonObjectEducation.educationId;
        //To update Education table
        $.ajax({
            url: apiUrlEducation,
            type: "PUT",
            data: dataobjEducation,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                educationObj.isEditEducation('0');
                educationObj.startDate(convert(jsonObjectEducation.startDate));
                educationObj.endDate(convert(jsonObjectEducation.endDate));
            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });


    }
    else {
            var dataobjEducation;
            var jobseekerEducationObj = {}
            jobseekerEducationObj.JobSeekerId = jsonObjectVM.jobseekerId;
            jobseekerEducationObj.InstitutionName = jsonObjectEducation.universityName;
            jobseekerEducationObj.DegreeId = viewModel.dataDegreeType()[educationObj.selectedIndexDegreeType()].value;
            jobseekerEducationObj.StartDate = convert(jsonObjectEducation.startDate);
            jobseekerEducationObj.EndDate = convert(jsonObjectEducation.endDate);
            jobseekerEducationObj.MajorFocus = jsonObjectEducation.majorFocus;
            jobseekerEducationObj.InstitutionLocation = jsonObjectEducation.universityLocation;
            if (jsonObjectEducation.currentlyStudying) {
                jobseekerEducationObj.EndDate = "present";
                jsonObjectEducation.endDate = "present";
            }
            else {
                jobseekerEducationObj.EndDate = convert(jsonObjectEducation.endDate);
            }
            dataobjEducation = JSON.stringify(jobseekerEducationObj);


        var apiUrlEducation = GetWebAPIURL() + '/api/Education';
        //To create Education details
        $.ajax({
            url: apiUrlEducation,
            type: "POST",
            data: dataobjEducation,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                educationObj.educationId(data);
                educationObj.isEditEducation('0');
                educationObj.startDate(convert(jsonObjectEducation.startDate));
                educationObj.endDate(convert(jsonObjectEducation.endDate));
                viewModel.educationButtonCheck('1');


            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
        educationObj.errorCheckDegree('0');
    }
    else {
        educationObj.errorEducation.showAllMessages();

        if (educationObj.selectedIndexDegreeType() <= 0) {
            educationObj.errorCheckDegree('1');
        }
        else { educationObj.errorCheckDegree('0'); }
    }

}

viewModel.expandEducationSkill = function (educationObj) {
    if (educationObj.btnEducationSkill() == '+') {
        educationObj.btnEducationSkill('-');
    }
    else {
        educationObj.btnEducationSkill('+');
    }
}

viewModel.deleteEducation = function (educationObj) {

    var jsonObjectEducation = ko.toJS(educationObj);
    var jsonObjectVM = ko.toJS(viewModel);

    var educationDelete = confirm("Do you want to delete!");
    if (educationDelete == true) {

        if (jsonObjectEducation.educationId) {
            var apiUrlEducation = GetWebAPIURL() + '/api/Education?Id=' + jsonObjectEducation.educationId;
            //To delete data from Education Table
            $.ajax({
                url: apiUrlEducation,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.education.remove(educationObj);
                    if (viewModel.education().length == 0) {
                        viewModel.educationCheck('0');
                        viewModel.educationButtonCheck('0');
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            viewModel.education.remove(educationObj);
        }
    }
}

viewModel.editEducationDetails = function (educationObj) {

    var SelectedEducationObj = ko.toJS(educationObj);

    SelectedEducation.push(SelectedEducationObj);
    educationObj.isEditEducation('1');
    educationObj.deleteCheck('1');
}
ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});


function AddEducationSkills(educationId, acquiredId) {
    // alert(JOBSEEKERID);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&acquiredId=" + acquiredId + "&workHistoryId" + educationId);
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