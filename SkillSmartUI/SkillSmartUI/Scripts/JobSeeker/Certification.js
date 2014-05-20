$(document).ready(function () {
    initCertification();
});

var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
//var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

function getCertification() {
    var apiUrlCertification = GetWebAPIURL() + '/api/Certification?jobSeekerId=' + userId;
    var dataobjCertification;

    //To get certification from certification table
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
    return dataobjCertification;
}

function initCertification() {
    viewModel.certification = ko.observableArray();
    viewModel.certificationCheck = ko.observable('0');
    viewModel.certificationButtonCheck = ko.observable('0');



    var dataobjCertification = getCertification();
    if (dataobjCertification.length != 0) {
        viewModel.certificationCheck('1');
    }

    if (dataobjCertification) {

        for (var i = 0; i < dataobjCertification.length; i++) {
            viewModel.certificationButtonCheck('1');
            var Certification = new certificationCreate(dataobjCertification[i]);
            viewModel.certification.push(Certification);
        }
    }
}

function certificationCreate(objCertification) {
    var self = this;
    self.jobseekerId = ko.observable(userId);
    self.certificationId = ko.observable();

    self.certificationName = ko.observable();
    self.certificationEnrolled = ko.observable();
    self.certificationInstituion = ko.observable();
    self.completedDate = ko.observable();
    self.expireDate = ko.observable();
    self.certificationDetails = ko.observable();
    self.deleteCheck = ko.observable('1');

    self.emailAddress = ko.observable();
    self.phone = ko.observable();
    self.address = ko.observable();
    self.city = ko.observable();
    self.state = ko.observable();
    self.url = ko.observable();

    self.isEditCertification = ko.observable('0');
    if (objCertification) {

        self.jobseekerId(objCertification.JobSeekerId);
        self.certificationId(objCertification.Id);

        self.certificationName(objCertification.CertificationName);
        self.certificationEnrolled(objCertification.CurrentlyEnrolled);
        self.certificationInstituion(objCertification.InstitutionName);
        self.completedDate(objCertification.CompletionDate);
        self.expireDate(objCertification.ExpirationDate);
        self.certificationDetails(objCertification.CertificationDetails);

        self.emailAddress(objCertification.Email);
        self.phone(objCertification.Phone);
        self.address(objCertification.Address);
        self.city(objCertification.City);
        self.state(objCertification.State);
        self.url(objCertification.Website);
        self.isEditCertification('0');
    }
}
viewModel.saveCertification = function (certificationObj) {

    if (viewModel.certificationButtonCheck() == 1) {
        document.getElementById("addMoreCertification").disabled = false;
    }

    var jsonObjectVM = ko.toJS(viewModel);
    var jsonObjectCertification = ko.toJS(certificationObj);

    if (jsonObjectCertification.certificationId) {

        var dataobjCertification;
        var jobseekerCertificationObj = {}
        jobseekerCertificationObj.JobSeekerId = jsonObjectCertification.jobseekerId;
        jobseekerCertificationObj.CertificationName = jsonObjectCertification.certificationName;
        jobseekerCertificationObj.CurrentlyEnrolled = jsonObjectCertification.certificationEnrolled;
        jobseekerCertificationObj.InstitutionName = jsonObjectCertification.certificationInstituion;
        jobseekerCertificationObj.ExpirationDate = convert(jsonObjectCertification.expireDate);
        if (jsonObjectCertification.certificationEnrolled) {
            jobseekerCertificationObj.CompletionDate = "present";
            jsonObjectCertification.completedDate = "present";
        }
        else {
            jobseekerCertificationObj.CompletionDate = convert(jsonObjectCertification.completedDate);
        }
        jobseekerCertificationObj.CertificationDetails = jsonObjectCertification.certificationDetails;

        jobseekerCertificationObj.Email = jsonObjectCertification.emailAddress;
        jobseekerCertificationObj.Phone = jsonObjectCertification.phone;
        jobseekerCertificationObj.Address = jsonObjectCertification.address;
        jobseekerCertificationObj.City = jsonObjectCertification.city;
        jobseekerCertificationObj.State = jsonObjectCertification.state;
        jobseekerCertificationObj.Website = jsonObjectCertification.url;

        dataobjCertification = JSON.stringify(jobseekerCertificationObj);
        var apiUrlCertification = GetWebAPIURL() + '/api/Certification?Id=' + jsonObjectCertification.certificationId;
        var certificationObject;
        //To update Certification
        $.ajax({
            url: apiUrlCertification,
            type: "PUT",
            data: dataobjCertification,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                certificationObj.isEditCertification('0');
                certificationObj.completedDate(convert(jsonObjectCertification.completedDate));
                certificationObj.expireDate(convert(jsonObjectCertification.expireDate));
            }, error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
    else {
        var dataobjCertification;
        var jobseekerCertificationObj = {}
        jobseekerCertificationObj.JobSeekerId = jsonObjectVM.jobseekerId;
        jobseekerCertificationObj.CertificationName = jsonObjectCertification.certificationName;
        jobseekerCertificationObj.CurrentlyEnrolled = jsonObjectCertification.certificationEnrolled;
        jobseekerCertificationObj.InstitutionName = jsonObjectCertification.certificationInstituion;
        jobseekerCertificationObj.ExpirationDate = convert(jsonObjectCertification.expireDate);
        if (jsonObjectCertification.certificationEnrolled) {
            jobseekerCertificationObj.CompletionDate = "present";
            jsonObjectCertification.completedDate = "present";
        }
        else {
            jobseekerCertificationObj.CompletionDate = convert(jsonObjectCertification.completedDate);
        }
        jobseekerCertificationObj.CertificationDetails = jsonObjectCertification.certificationDetails;

        jobseekerCertificationObj.Email = jsonObjectCertification.emailAddress;
        jobseekerCertificationObj.Phone = jsonObjectCertification.phone;
        jobseekerCertificationObj.Address = jsonObjectCertification.address;
        jobseekerCertificationObj.City = jsonObjectCertification.city;
        jobseekerCertificationObj.State = jsonObjectCertification.state;
        jobseekerCertificationObj.Website = jsonObjectCertification.url;

        dataobjCertification = JSON.stringify(jobseekerCertificationObj);
        var apiUrlCertification = GetWebAPIURL() + '/api/Certification';
        //To create Certification
        $.ajax({
            url: apiUrlCertification,
            type: "POST",
            data: dataobjCertification,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                certificationObj.certificationId(data);
                certificationObj.isEditCertification('0');
                certificationObj.completedDate(convert(jsonObjectCertification.completedDate));
                certificationObj.expireDate(convert(jsonObjectCertification.expireDate));
                viewModel.certificationButtonCheck('1');

            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }


}

viewModel.editCertificationDetails = function (certificationObj) {
    SelectedCertification = ko.toJS(certificationObj);
    certificationObj.isEditCertification('1');
    certificationObj.deleteCheck('1');
}

var SelectedCertification;

viewModel.cancelCertification = function (certificationObj) {
    if (viewModel.certificationButtonCheck() == 1) {
        document.getElementById("addMoreCertification").disabled = false;
    }
    else {
        viewModel.certificationCheck('0');
    }

    certificationObj.isEditCertification('0');
    var jsonObjectCertification = ko.toJS(certificationObj);
    if (jsonObjectCertification.certificationId) {
        certificationObj.certificationName(SelectedCertification.certificationName);
        certificationObj.certificationEnrolled(SelectedCertification.certificationEnrolled);
        certificationObj.certificationInstituion(SelectedCertification.certificationInstituion);
        certificationObj.completedDate(SelectedCertification.completedDate);
        certificationObj.expireDate(SelectedCertification.expireDate);
        certificationObj.certificationDetails(SelectedCertification.certificationDetails);
        certificationObj.isEditCertification('0');

    }
    else {
        viewModel.certification.remove(certificationObj);
    }
    SelectedCertification = "";
}

viewModel.deleteCertification = function (certificationObj) {
    var jsonObjectVM = ko.toJS(viewModel);
    var jsonObjectCertification = ko.toJS(certificationObj);
    var Certificationdelete = confirm("Do you want to delete!");

    if (Certificationdelete == true) {
        if (jsonObjectCertification.certificationId) {
            var apiUrlEducation = GetWebAPIURL() + '/api/Certification?Id=' + jsonObjectCertification.certificationId;
            //To delete data from Certification
            $.ajax({
                url: apiUrlEducation,
                type: "DELETE",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    viewModel.certification.remove(certificationObj);
                    if (viewModel.certification().length == 0) {
                        viewModel.certificationCheck('0');
                        viewModel.certificationButtonCheck('0');
                    }
                }, error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        else {
            viewModel.certification.remove(certificationObj);
        }
    }
}

viewModel.addMoreCertification = function () {
    document.getElementById("addMoreCertification").disabled = true;
    var Certification = new certificationCreate();
    Certification.isEditCertification('1');
    Certification.deleteCheck('0');
    viewModel.certification.splice(0, 0, Certification);
}

viewModel.addFirstCertification = function () {
    viewModel.certificationCheck('1');
    var Certification = new certificationCreate();
    Certification.isEditCertification('1');
    Certification.deleteCheck('0');
    viewModel.certification.splice(0, 0, Certification);
    viewModel.certificationButtonCheck('0');
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