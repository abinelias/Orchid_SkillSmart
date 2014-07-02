var viewModel = {}
var companyId = "419b31b2-d199-4507-ab00-193469e5d924";

$(document).ready(function () {
    initListEmployer();
});

function getEmployerList() {
    var dataEmployerList;
    var apiUrlEmployerList = GetWebAPIURL() + '/api/Employer?companyId=' + companyId;
    //To get JobSeekerSkillList
    $.ajax({
        url: apiUrlEmployerList,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataEmployerList = data;
        },
        error: function (xhr, status, error) {
            alert('ErrorList :' + status);
        }
    });
    return dataEmployerList;
}

function getDepartmentLookUp() {
    var apiUrlDepartment = GetWebAPIURL() + '/api/Lookup/?name=EmployerDepartment';
    var dataDepartmentObj;

    //To get details of Industry lookup
    $.ajax({
        url: apiUrlDepartment,
        type: 'GET',
        async: false,
        success: function (data) {
            dataDepartmentObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataDepartmentObj;
}

function getPermissionLookUp() {
    var apiUrlPermission = GetWebAPIURL() + '/api/Lookup/?name=EmployerPermission';
    var dataPermissionObj;

    //To get details of Industry lookup
    $.ajax({
        url: apiUrlPermission,
        type: 'GET',
        async: false,
        success: function (data) {
            dataPermissionObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataPermissionObj;
}


var dataDepartmentObj = getDepartmentLookUp();
var dataPermissionObj = getPermissionLookUp();

function initListEmployer() {

    viewModel.employerList = ko.observableArray();

    viewModel.dataDepartment = ko.observable(createListDepartment());

    viewModel.dataPermission = ko.observable(createListPermission());

    viewModel.selectedIndexDepartment = ko.observable(0);
    viewModel.selectedIndexPermission = ko.observable(0);

    viewModel.employerFirstName = ko.observable();
    viewModel.employerLastName = ko.observable();
    viewModel.employerEmail = ko.observable();
    viewModel.employerPassword = ko.observable();
    viewModel.employerConfirmPassword = ko.observable();

    viewModel.adminPhone = ko.observable();
    viewModel.phone = ko.observable();
    viewModel.contact = ko.observable("no");
    viewModel.addUser = ko.observable("0");

    viewModel.employerListHR = ko.observableArray();
    viewModel.employerListIT = ko.observableArray();
    viewModel.employerListOperations = ko.observableArray();
    viewModel.employerListMarketting = ko.observableArray();

    viewModel.btnHR = ko.observable('+');
    viewModel.btnOperations = ko.observable('+');
    viewModel.btnMarketing = ko.observable('+');
    viewModel.btnIT = ko.observable('+');

    var dataEmployerList = getEmployerList();


    for (da in dataEmployerList) {

        if (dataEmployerList[da].Department == "2c8fed99-940b-4841-ab31-ddf25a96336c") {
            var createHREmployersOBJ = new createEmployers(dataEmployerList[da]);
            viewModel.employerListHR.push(createHREmployersOBJ);

        }

        else if (dataEmployerList[da].Department == "da3e8fb2-2d9e-414f-9ac5-a4c2dde52b0d") {
            var createHREmployersOBJ = new createEmployers(dataEmployerList[da]);
            viewModel.employerListIT.push(createHREmployersOBJ);
        }


        else if (dataEmployerList[da].Department == "da7a5d32-bab1-4670-a644-44afc8301992") {
            var createHREmployersOBJ = new createEmployers(dataEmployerList[da]);
            viewModel.employerListOperations.push(createHREmployersOBJ);
        }
        else {
            var createHREmployersOBJ = new createEmployers(dataEmployerList[da]);
            viewModel.employerListMarketting.push(createHREmployersOBJ);
        }
    }

}

function createEmployers(objEmployer) {
    var self = this;
    self.employerFirstName = ko.observable();
    self.employerLastName = ko.observable();
    self.location = ko.observable("U.S.A");
    self.selectedIndexDepartment = ko.observable(0);
    self.selectedIndexPermission = ko.observable(0);
    self.Id = ko.observable();
    self.isEditEmployer = ko.observable('0');
    if (objEmployer) {

        for (da in dataDepartmentObj) {
            if (objEmployer.Department == dataDepartmentObj[da].Id) {

                self.selectedIndexDepartment((parseInt(da) + 1));

            }
        }
        for (da in dataPermissionObj) {
            if (objEmployer.Permission == dataPermissionObj[da].Id) {
                self.selectedIndexPermission((parseInt(da) + 1));
            }
        }
        self.employerFirstName(objEmployer.FirstName);
        self.employerLastName(objEmployer.LastNmae);
        self.isEditEmployer('0');
        self.Id(objEmployer.Id);
    }
    self.DepartmentName = ko.computed(function () {
        return viewModel.dataDepartment()[self.selectedIndexDepartment()].label;
    });
    self.PermissionName = ko.computed(function () {
        return viewModel.dataPermission()[self.selectedIndexPermission()].label;
    });

}

function createListDepartment() {

    //var dataPermissionObj = getPermissionLookUp();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataDepartmentObj) {

        list.push({
            label: dataDepartmentObj[da].Name,
            value: dataDepartmentObj[da].Id
        });
    }
    return list;
}
function createListPermission() {


    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataPermissionObj) {

        list.push({
            label: dataPermissionObj[da].Name,
            value: dataPermissionObj[da].Id
        });
    }
    return list;
}

viewModel.clickButtonAdduser = function () {
   
    var employerList = new createEmployers();
    viewModel.btnHR('-');
    employerList.isEditEmployer('1');
    viewModel.employerListHR.splice(0, 0, employerList);
}

viewModel.addEmployer = function (employerObj) {

    var jsonObjectAddEmployer = ko.toJS(employerObj);

    if (jsonObjectAddEmployer.Id) {
        var dataobjAddEmployer;
        var jobseekerAddEmployerObj = {}

        jobseekerAddEmployerObj.FirstName = jsonObjectAddEmployer.employerFirstName;
        jobseekerAddEmployerObj.LastNmae = jsonObjectAddEmployer.employerLastName;
        jobseekerAddEmployerObj.Password = jsonObjectAddEmployer.employerPassword;
        jobseekerAddEmployerObj.Email = jsonObjectAddEmployer.employerEmail;
        jobseekerAddEmployerObj.CompanyId = "419b31b2-d199-4507-ab00-193469e5d924";
        jobseekerAddEmployerObj.Permission = viewModel.dataPermission()[employerObj.selectedIndexPermission()].value;

        jobseekerAddEmployerObj.Department = viewModel.dataDepartment()[employerObj.selectedIndexDepartment()].value;
        dataobjAddEmployer = JSON.stringify(jobseekerAddEmployerObj);

        var apiUrlRegistration = GetWebAPIURL() + '/api/Employer/?Id=' + jsonObjectAddEmployer.Id;
        //To create WorkHistory table
        $.ajax({
            url: apiUrlRegistration,
            type: "PUT",
            data: dataobjAddEmployer,

            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                employerObj.isEditEmployer('0');
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });

    }
    else {
        var dataobjAddEmployer;
        var jobseekerAddEmployerObj = {}

        jobseekerAddEmployerObj.FirstName = jsonObjectAddEmployer.employerFirstName;
        jobseekerAddEmployerObj.LastNmae = jsonObjectAddEmployer.employerLastName;
        jobseekerAddEmployerObj.Password = jsonObjectAddEmployer.employerPassword;
        jobseekerAddEmployerObj.Email = jsonObjectAddEmployer.employerEmail;
        jobseekerAddEmployerObj.CompanyId = "419b31b2-d199-4507-ab00-193469e5d924";
        jobseekerAddEmployerObj.Permission = viewModel.dataPermission()[employerObj.selectedIndexPermission()].value;

        jobseekerAddEmployerObj.Department = viewModel.dataDepartment()[employerObj.selectedIndexDepartment()].value;
        dataobjAddEmployer = JSON.stringify(jobseekerAddEmployerObj);

        var apiUrlRegistration = GetWebAPIURL() + '/api/Employer/';
        //To create WorkHistory table
        $.ajax({
            url: apiUrlRegistration,
            type: "POST",
            data: dataobjAddEmployer,

            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                location.reload();
            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
}

viewModel.cancelEmployer = function (employerObj) {
    employerObj.isEditEmployer('0');
}

viewModel.deleteEmployer = function (employerObj) {
    employerObj.isEditEmployer('0');
    var jsonObjectEmployer = ko.toJS(employerObj);
    var jsonObjectVM = ko.toJS(viewModel);


    var deleteWork = confirm("Do you want to delete!");

    if (deleteWork == true) {

        if (jsonObjectEmployer.Id) {
            var apiUrlEmployer = GetWebAPIURL() + '/api/Employer/?Id=' + jsonObjectEmployer.Id;
            $.ajax({
                url: apiUrlEmployer,
                type: "DELETE",

                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    for (var i = 0; i < viewModel.employerListHR().length; i++) {
                        if (viewModel.employerListHR()[i].Id() == jsonObjectEmployer.Id) {
                            viewModel.employerListHR.remove(employerObj);
                        }
                    }
                    for (var i = 0; i < viewModel.employerListOperations().length; i++) {
                        if (viewModel.employerListOperations()[i].Id() == jsonObjectEmployer.Id) {
                            viewModel.employerListOperations.remove(employerObj);
                        }
                    }
                    for (var i = 0; i < viewModel.employerListIT().length; i++) {
                        if (viewModel.employerListIT()[i].Id() == jsonObjectEmployer.Id) {
                            viewModel.employerListIT.remove(employerObj);
                        }
                    }
                    for (var i = 0; i < viewModel.employerListMarketting().length; i++) {
                        if (viewModel.employerListMarketting()[i].Id() == jsonObjectEmployer.Id) {
                            viewModel.employerListMarketting.remove(employerObj);
                        }
                    }
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });
        }
        /*else {
            viewModel.workHistory.remove(workExperienceobj);
        }*/
    }
}

viewModel.editEmployer = function (employerObj) {

    employerObj.isEditEmployer('1');
    //viewModel.addUser('1');
    //alert(employerObj.isEditEmployer());
}
viewModel.expandHR = function () {
    if (viewModel.btnHR() == '+') {
        viewModel.btnHR('-');
    }
    else {
        viewModel.btnHR('+');
    }
}
viewModel.expandOperations = function () {
    if (viewModel.btnOperations() == '+') {
        viewModel.btnOperations('-');
    }
    else {
        viewModel.btnOperations('+');
    }
}
viewModel.expandMarketing = function () {
    if (viewModel.btnMarketing() == '+') {
        viewModel.btnMarketing('-');
    }
    else {
        viewModel.btnMarketing('+');
    }
}
viewModel.expandIT = function () {
    if (viewModel.btnIT() == '+') {
        viewModel.btnIT('-');
    }
    else {
        viewModel.btnIT('+');
    }
}