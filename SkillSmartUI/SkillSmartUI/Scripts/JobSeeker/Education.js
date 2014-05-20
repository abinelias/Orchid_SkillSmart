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

    var apiUrlEducation = GetWebAPIURL() + '/api/Education?jobSeekerId=' + userId;
    var dataobjEducation;

    //To get Education details 
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
    self.universityName = ko.observable();
    self.degreeId = ko.observable();
    self.startDate = ko.observable();
    self.endDate = ko.observable();
    self.universityLocation = ko.observable();
    self.majorFocus = ko.observable();
    self.deleteCheck = ko.observable('1');
    self.selectedIndexDegreeType = ko.observable(0);

    self.jobSeekerId = ko.observable(userId);
    self.isEditEducation = ko.observable('0');
   
    

    self.educationId = ko.observable('');
    self.currentlyStudying = ko.observable(false);
    if (objEducation) {
        self.universityName(objEducation.InstitutionName);
        self.degreeId(objEducation.DegreeId);
        for (da in dataDegreeTypeObj) {
            if (objEducation.DegreeId == dataDegreeTypeObj[da].Id) {
                self.selectedIndexDegreeType(da);
            }
        }
        self.startDate(objEducation.StartDate);
        self.endDate(objEducation.EndDate);
        self.universityLocation(objEducation.InstitutionLocation);
        self.majorFocus(objEducation.MajorFocus);

        self.jobSeekerId(objEducation.JobSeekerId);
        self.educationId(objEducation.Id);

        self.isEditEducation('0');
        if (objEducation.EndDate == 'present') {
            self.currentlyStudying(true);
        }

    }
    self.degreeName = ko.computed(function () {
        
         return viewModel.dataDegreeType()[self.selectedIndexDegreeType()].label;
    }, this);
  
}

viewModel.addMoreEducation = function () {
    document.getElementById("addMoreEducation").disabled = true;
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

var SelectedEducationObj;

viewModel.cancelEducation = function (educationObj) {

    if (viewModel.educationButtonCheck() == 1) {
        document.getElementById("addMoreEducation").disabled = false;
    }
    else {
        viewModel.educationCheck('0');
    }
    educationObj.isEditEducation('0');
    var jsonObjectEducation = ko.toJS(educationObj);
    if (jsonObjectEducation.educationId) {
        educationObj.universityName(SelectedEducationObj.universityName);
        educationObj.universityLocation(SelectedEducationObj.universityLocation);
        educationObj.majorFocus(SelectedEducationObj.majorFocus);
        educationObj.startDate(SelectedEducationObj.startDate);
        educationObj.endDate(SelectedEducationObj.endDate);
        educationObj.selectedIndexDegreeType(selectedDegree);
        educationObj.isEditEducation('0');
    }
    else {
        viewModel.education.remove(educationObj);
    }
    SelectedEducationObj = "";
}

viewModel.saveEducation = function (educationObj) {

    if (viewModel.educationButtonCheck() == 1) {
        document.getElementById("addMoreEducation").disabled = false;
    }

    var jsonObjectEducation = ko.toJS(educationObj);
    var jsonObjectVM = ko.toJS(viewModel);

    if (jsonObjectEducation.educationId) {
        var dataobjEducation;
        var jobseekerEducationObj = {}
        jobseekerEducationObj.JobSeekerId = jsonObjectEducation.jobSeekerId;
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
var selectedDegree;
viewModel.editEducationDetails = function (educationObj) {
    selectedDegree = educationObj.selectedIndexDegreeType();
    SelectedEducationObj = ko.toJS(educationObj);
    educationObj.isEditEducation('1');
    educationObj.deleteCheck('1');
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