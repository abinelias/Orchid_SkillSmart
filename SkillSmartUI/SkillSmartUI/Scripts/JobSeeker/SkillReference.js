﻿viewModel.whichTemplateToUseReference = function (referenceObj) {
    selectedReference = ko.toJS(referenceObj);
    return selectedReference.isEditableReference ? "ViewReference" : "EditReferene";
}

viewModel.addFirstReference = function (referenceObj) {
    selectedReference = ko.toJS(referenceObj);
    referenceObj.btnReference("Add More");
    referenceObj.isEditableReference(false);
    var reference = new createReference();

    reference.deleteCheck('0');
    reference.isEdit('1');

    reference.jobSeekerSkillId(selectedReference.SkillId);

    referenceObj.referenceArray.push(reference);
}

function createReference(da) {
    var self = this;
    self.Id = ko.observable('');
    self.jobSeekerSkillId = ko.observable('');
    self.firstName = ko.observable('').extend({ required: { message: "FirstName required" } });
    self.lastName = ko.observable('').extend({ required: { message: "LastName required" } });
    self.position = ko.observable('').extend({ required: { message: "Position required" } });
    self.referenceDescription = ko.observable('').extend({ required: { message: "Description required" } });
    self.referenceContact = ko.observable('').extend({ required: { message: "Contact required." } });

    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');
    self.errorReference = ko.validation.group({ p1: self.firstName, p2: self.lastName, p3: self.position, p4: self.referenceDescription, p5: self.referenceContact });
    if (da) {

        self.Id(da.Id);
        self.jobSeekerSkillId(da.JobSeekerSkillId);
        self.firstName(da.FirstName);
        self.lastName(da.LastName);
        self.position(da.Position);
        self.referenceDescription(da.Description);

        self.referenceContact(da.Phone);

        self.isEdit('0');

    }
}


viewModel.clickButtonSkillReference = function (referenceObj) {
    selectedReference = ko.toJS(referenceObj);
    if (referenceObj.btnReference() == "Add More") {
        var reference = new createReference();
        reference.deleteCheck('0');
        reference.isEdit('1');
        reference.jobSeekerSkillId(selectedReference.SkillId);
        referenceObj.referenceArray.splice(0, 0, reference);
    }

    else {
        referenceObj.btnReference("Add More");
        referenceObj.isEditableReference(false);
    }
}
var currentReference;
viewModel.editReferenceDetails = function (referenceObj) {
    currentReference = ko.toJS(referenceObj);
    referenceObj.isEdit('1');
    referenceObj.deleteCheck('1');
}

viewModel.saveReference = function (referenceObj) {
    if (referenceObj.firstName.isValid() && referenceObj.lastName.isValid() && referenceObj.position.isValid() && referenceObj.referenceDescription.isValid() && referenceObj.referenceContact.isValid()) {
        jsonObjectReference = ko.toJS(referenceObj);
        if (jsonObjectReference.Id) {
            var dataObjReference;
            var jobSeekerReferenceObj = {}

            jobSeekerReferenceObj.JobSeekerSkillId = jsonObjectReference.jobSeekerSkillId;
            jobSeekerReferenceObj.FirstName = jsonObjectReference.firstName;
            jobSeekerReferenceObj.LastName = jsonObjectReference.lastName;
            jobSeekerReferenceObj.Position = jsonObjectReference.position;
            jobSeekerReferenceObj.Description = jsonObjectReference.referenceDescription;

            jobSeekerReferenceObj.Phone = jsonObjectReference.referenceContact;
            

            dataObjReference = JSON.stringify(jobSeekerReferenceObj);
        var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference?Id=' + jsonObjectReference.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlSkillReference,
            type: "PUT",
            data: dataObjReference,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                referenceObj.isEdit('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
            var dataObjReference;
            var jobSeekerReferenceObj = {}

            jobSeekerReferenceObj.JobSeekerSkillId = jsonObjectReference.jobSeekerSkillId;
            jobSeekerReferenceObj.FirstName = jsonObjectReference.firstName;
            jobSeekerReferenceObj.LastName = jsonObjectReference.lastName;
            jobSeekerReferenceObj.Position = jsonObjectReference.position;
            jobSeekerReferenceObj.Description = jsonObjectReference.referenceDescription;

            jobSeekerReferenceObj.Phone = jsonObjectReference.referenceContact;
            

            dataObjReference = JSON.stringify(jobSeekerReferenceObj);
        var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlSkillReference,
            type: "POST",
            data: dataObjReference,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                referenceObj.isEdit('0');
                referenceObj.Id(data);
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
        }
    }
    else {
        referenceObj.errorReference.showAllMessages();
    }
}
viewModel.cancelReference = function (referenceObj) {
    jsonObjectReference = ko.toJS(referenceObj);

    if (jsonObjectReference.Id) {
        referenceObj.isEdit('0');
        referenceObj.firstName(currentReference.firstName);
        referenceObj.lastName(currentReference.lastName);
        referenceObj.position(currentReference.position);
        referenceObj.referenceDescription(currentReference.referenceDescription);
        referenceObj.referenceContact(currentReference.referenceContact);
    }
    else {
        $.each(viewModel.categoryArray(), function () {
            $.each(this.specialityArray(), function () {
                $.each(this.skillArray(), function () {
                    this.referenceArray.remove(referenceObj);
                    if (this.referenceArray().length == 0) {
                        this.referenceCheck('0');
                        this.isEditableReference(true);
                    }
                })
            })
        })
    }
}
viewModel.deleteReference = function (referenceObj) {
    var jsonObjectReference = ko.toJS(referenceObj);

    var ReferenceDelete = confirm("Do you want to delete!");
    if (ReferenceDelete == true) {
        if (jsonObjectReference.Id) {
            var apiUrlReference = GetWebAPIURL() + '/api/SkillReference?Id=' + jsonObjectReference.Id;
            //To delete data from Language Table
            $.ajax({
                url: apiUrlReference,
                type: "DELETE",
                headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    $.each(viewModel.categoryArray(), function () {
                        $.each(this.specialityArray(), function () {
                            $.each(this.skillArray(), function () {
                                this.referenceArray.remove(referenceObj);
                                if (this.referenceArray().length == 0) {
                                    this.referenceCheck('0');
                                    this.isEditableReference(true);
                                }
                            })
                        })
                    })
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
    }
}


ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true
});