$(document).ready(function () {
    initCertification();
});

function getCertification() {
    var apiUrlCertification = GetWebAPIURL() + '/api/Certification/'
    var dataobjCertification;

    //To get certification from certification table
    $.ajax({
        url: apiUrlCertification,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
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
    self.jobseekerId = ko.observable();
    self.certificationId = ko.observable();

    self.certificationName = ko.observable().extend({ required: { message: "Certification Name required" } });
    self.certificationEnrolled = ko.observable();
    self.certificationInstituion = ko.observable().extend({ required: { message: "Instituion required" } });
    self.completedDate = ko.observable().extend({ required: { message: "completedDate required" } });
    self.expireDate = ko.observable().extend({ required: { message: "expireDate required" } });
    self.certificationDetails = ko.observable().extend({ required: { message: "CertificationDetails required" } });
    self.deleteCheck = ko.observable('1');

    self.emailAddress = ko.observable().extend({ required: { message: "Email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } });
    self.phone = ko.observable().extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } });
    self.address = ko.observable().extend({ required: { message: "Address required" } });
    self.city = ko.observable().extend({ required: { message: "City required" } });
    self.state = ko.observable().extend({ required: { message: "State required" } });
    self.url = ko.observable().extend({ required: { message: "Website required" } });

    self.isEditCertification = ko.observable('0');

    self.btnCertificationSkill = ko.observable('+');

    self.errorCertification = ko.validation.group({ p1: self.certificationName, p2: self.certificationInstituion,  p4: self.expireDate, p5: self.certificationDetails, p7: self.emailAddress, p8: self.phone, p9: self.address, p10: self.city, p11: self.state, p12: self.url });
    if (objCertification) {

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

    self.certificationEnrolled.subscribe(function (newValue) {
        if (self.certificationEnrolled() == true) {
            $("#certification_endDate").hide();

        }
    });
}
viewModel.saveCertification = function (certificationObj) {

    if (certificationObj.certificationName.isValid() && certificationObj.certificationDetails.isValid() && certificationObj.certificationInstituion.isValid() &&  certificationObj.expireDate.isValid() && certificationObj.emailAddress.isValid() && certificationObj.phone.isValid() && certificationObj.address.isValid() && certificationObj.city.isValid() && certificationObj.state.isValid() && certificationObj.url.isValid()) {
        viewModel.certificationButtonCheck('1');
        

        var jsonObjectVM = ko.toJS(viewModel);
        var jsonObjectCertification = ko.toJS(certificationObj);

        if (jsonObjectCertification.certificationId) {

            var dataobjCertification;
            var jobseekerCertificationObj = {}
            jobseekerCertificationObj.CertificationName = jsonObjectCertification.certificationName;
            jobseekerCertificationObj.CurrentlyEnrolled = jsonObjectCertification.certificationEnrolled;
            jobseekerCertificationObj.InstitutionName = jsonObjectCertification.certificationInstituion;
            jobseekerCertificationObj.ExpirationDate = convert(jsonObjectCertification.expireDate);
            jobseekerCertificationObj.CompletionDate = convert(jsonObjectCertification.completedDate);
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
            headers: app.securityHeaders(),
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
            jobseekerCertificationObj.CertificationName = jsonObjectCertification.certificationName;
            jobseekerCertificationObj.CurrentlyEnrolled = jsonObjectCertification.certificationEnrolled;
            jobseekerCertificationObj.InstitutionName = jsonObjectCertification.certificationInstituion;
            jobseekerCertificationObj.ExpirationDate = convert(jsonObjectCertification.expireDate);
            jobseekerCertificationObj.CompletionDate = convert(jsonObjectCertification.completedDate);
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
            headers: app.securityHeaders(),
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
else {
    certificationObj.errorCertification.showAllMessages();
}
}

viewModel.editCertificationDetails = function (certificationObj) {
    var SelectedCertificationObj = ko.toJS(certificationObj);
    SelectedCertification.push(SelectedCertificationObj);

    certificationObj.isEditCertification('1');
    certificationObj.deleteCheck('1');
}

var SelectedCertification = [];

viewModel.cancelCertification = function (certificationObj) {
    var jsonObjectCertification = ko.toJS(certificationObj);
    if (jsonObjectCertification.certificationId) {

        certificationObj.isEditCertification('0');

    }
    else {
        viewModel.certification.remove(certificationObj);
    }

    if (viewModel.certification().length == 0) {
        viewModel.certificationCheck('0');
    }
    else {
        viewModel.certificationButtonCheck('1');
    }

    certificationObj.isEditCertification('0');


    for (var i = 0; i < SelectedCertification.length; i++) {
        if (SelectedCertification[i].certificationId == certificationObj.certificationId()) {
            certificationObj.certificationName(SelectedCertification[i].certificationName);
            certificationObj.certificationEnrolled(SelectedCertification[i].certificationEnrolled);
            certificationObj.certificationInstituion(SelectedCertification[i].certificationInstituion);
            certificationObj.completedDate(SelectedCertification[i].completedDate);
            certificationObj.expireDate(SelectedCertification[i].expireDate);
            certificationObj.certificationDetails(SelectedCertification[i].certificationDetails);

            certificationObj.url(SelectedCertification[i].url);
            certificationObj.emailAddress(SelectedCertification[i].emailAddress);
            certificationObj.state(SelectedCertification[i].state);
            certificationObj.city(SelectedCertification[i].city);
            certificationObj.phone(SelectedCertification[i].phone);
            certificationObj.address(SelectedCertification[i].address);

        }

    }
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
                headers: app.securityHeaders(),
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

    viewModel.certificationButtonCheck('0');
}

viewModel.addFirstCertification = function () {
    viewModel.certificationCheck('1');
    var Certification = new certificationCreate();
    Certification.isEditCertification('1');
    Certification.deleteCheck('0');
    viewModel.certification.splice(0, 0, Certification);
    viewModel.certificationButtonCheck('0');
}

viewModel.expandCertificationSkill = function (certificationObj) {
    if (certificationObj.btnCertificationSkill() == '+') {
        certificationObj.btnCertificationSkill('-');
    }
    else {
        certificationObj.btnCertificationSkill('+');
    }
}

function AddCertificationSkills(certificationId, acquiredId) {
    // alert(JOBSEEKERID);
    $("#ManageHoldingsFrame").attr('src', "/Views/JobSeeker/PopupSkills.html?&acquiredId=" + acquiredId + "&workHistoryId" + certificationId);
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