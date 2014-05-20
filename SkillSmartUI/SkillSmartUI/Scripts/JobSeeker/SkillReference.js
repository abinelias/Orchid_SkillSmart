viewModel.whichTemplateToUseReference = function (referenceObj) {
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
    self.JobSeekerId = ko.observable(userId);
    self.jobSeekerSkillId = ko.observable('');
    self.firstName = ko.observable('');
    self.lastName = ko.observable('');
    self.position = ko.observable('');
    self.referenceDescription = ko.observable('');
    self.contactMethod = ko.observable();
    self.isEdit = ko.observable('0');
    self.deleteCheck = ko.observable('1');
    if (da) {
        self.Id(da.Id);
        self.JobSeekerId(da.JobSeekerId);
        self.jobSeekerSkillId(da.JobSeekerSkillId);
        self.firstName(da.FirstName);
        self.lastName(da.LastName);
        self.position(da.Position);
        self.referenceDescription(da.Description);
        self.contactMethod(da.MethodOfContact);
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
    jsonObjectReference = ko.toJS(referenceObj);
    if (jsonObjectReference.Id) {
        var dataObjReference;
        var jobSeekerReferenceObj = {}

        jobSeekerReferenceObj.JobSeekerId = jsonObjectReference.JobSeekerId;
        jobSeekerReferenceObj.JobSeekerSkillId = jsonObjectReference.jobSeekerSkillId;
        jobSeekerReferenceObj.FirstName = jsonObjectReference.firstName;
        jobSeekerReferenceObj.LastName = jsonObjectReference.lastName;
        jobSeekerReferenceObj.Position = jsonObjectReference.position;
        jobSeekerReferenceObj.Description = jsonObjectReference.referenceDescription;
        jobSeekerReferenceObj.MethodOfContact = jsonObjectReference.contactMethod;

        dataObjReference = JSON.stringify(jobSeekerReferenceObj);
        var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference?Id=' + jsonObjectReference.Id;
        //To update Scholarship details
        $.ajax({
            url: apiUrlSkillReference,
            type: "PUT",
            data: dataObjReference,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                referenceObj.isEdit('0');
                alert($parent.referenceCheck());
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
        var dataObjReference;
        var jobSeekerReferenceObj = {}

        jobSeekerReferenceObj.JobSeekerId = jsonObjectReference.JobSeekerId;
        jobSeekerReferenceObj.JobSeekerSkillId = jsonObjectReference.jobSeekerSkillId;
        jobSeekerReferenceObj.FirstName = jsonObjectReference.firstName;
        jobSeekerReferenceObj.LastName = jsonObjectReference.lastName;
        jobSeekerReferenceObj.Position = jsonObjectReference.position;
        jobSeekerReferenceObj.Description = jsonObjectReference.referenceDescription;
        jobSeekerReferenceObj.MethodOfContact = jsonObjectReference.contactMethod;

        dataObjReference = JSON.stringify(jobSeekerReferenceObj);
        var apiUrlSkillReference = GetWebAPIURL() + '/api/SkillReference';
        //To insert data into scholarship table
        $.ajax({
            url: apiUrlSkillReference,
            type: "POST",
            data: dataObjReference,
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
viewModel.cancelReference = function (referenceObj) {
    jsonObjectReference = ko.toJS(referenceObj);

    if (jsonObjectReference.Id) {
        referenceObj.isEdit('0');
        referenceObj.firstName(currentReference.firstName);
        referenceObj.lastName(currentReference.lastName);
        referenceObj.position(currentReference.position);
        referenceObj.referenceDescription(currentReference.referenceDescription);
        referenceObj.contactMethod(currentReference.contactMethod);
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