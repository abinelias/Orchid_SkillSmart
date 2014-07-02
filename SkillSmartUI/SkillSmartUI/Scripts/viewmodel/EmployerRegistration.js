var viewModel = {}
$(document).ready(function () {

    initRegistration();
    // $('#numinput').wijinputnumber({ decimalPlaces: 2, showSpinner: true });
    ko.applyBindings(viewModel);
});

function getCountryLookup() {
    //To get Country for lookup
    var apiUrlCountry = GetWebAPIURL() + 'api/Lookup/?name=Country';
    var dataObjCountry;

    $.ajax({
        url: apiUrlCountry,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjCountry = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjCountry;
}

function getDepartmentLookup() {
    //To get Employer Department for lookup
    var apiUrlDepartment = GetWebAPIURL() + 'api/Lookup/?name=EmployerDepartment';
    var dataObjDepartment;

    $.ajax({
        url: apiUrlDepartment,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjDepartment = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjDepartment;
}


function initRegistration()
{
    var dataObjCountry = getCountryLookup();

    viewModel.businessName = ko.observable();
    viewModel.branch = ko.observable();
    viewModel.addressline1 = ko.observable();
    viewModel.addressline2 = ko.observable();
    viewModel.city = ko.observable();
    viewModel.zip = ko.observable();
    viewModel.adminFirstName = ko.observable();
    viewModel.adminLastName = ko.observable();
    viewModel.adminEmail = ko.observable();
    viewModel.password = ko.observable();
    viewModel.confirmPassword = ko.observable();

    viewModel.selectedIndexCountry = ko.observable(0);
    viewModel.dataCountry = ko.observable(createListCountry());

    viewModel.selectedIndexState = ko.observable(0);
    viewModel.dataState = ko.observable();

    viewModel.selectedIndexDepartment = ko.observable(0);
    viewModel.dataDepartment = ko.observable(createListDepartment());

    viewModel.selectedIndexCountry.subscribe(function (newValue) {


        var countryId = viewModel.dataCountry()[viewModel.selectedIndexCountry()].value;
        if (countryId != "") {

            var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + countryId;
            //var dataStateObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlState,
                type: 'GET',
                async: false,

                success: function (data) {

                    viewModel.dataState(createListState(data));

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });
}
function createListCountry() {

    var dataObjCountry = getCountryLookup();
    var list = [];
    list.push({ label: "Select", value: "" });
    for (da in dataObjCountry) {

        list.push({
            label: dataObjCountry[da].Name,
            value: dataObjCountry[da].Id
        });
    }
    return list;
}

function createListState(data) {

    var list = [];
    for (da in data) {
        list.push({
            label: data[da].Name,
            value: data[da].Id
        });
    }
    return list;
}
function createListDepartment() {

    var dataObjDepartment = getDepartmentLookup();
    var list = [];
    for (da in dataObjDepartment) {

        list.push({
            label: dataObjDepartment[da].Name,
            value: dataObjDepartment[da].Id
        });
    }
    return list;
}

viewModel.submit = function ()
{
    var jsonObjectRegistration = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerRegistrationObj = {}
    jobseekerRegistrationObj.CompanyName = jsonObjectRegistration.businessName;
    jobseekerRegistrationObj.CompanyBranch = jsonObjectRegistration.branch;
    jobseekerRegistrationObj.StreetAddress = jsonObjectRegistration.addressline1;
    jobseekerRegistrationObj.Address2 = jsonObjectRegistration.addressline2;
    jobseekerRegistrationObj.City = jsonObjectRegistration.city;
    jobseekerRegistrationObj.Zip = jsonObjectRegistration.zip;
    jobseekerRegistrationObj.Country = viewModel.dataCountry()[viewModel.selectedIndexCountry()].value;
    jobseekerRegistrationObj.State = viewModel.dataState()[viewModel.selectedIndexState()].value;
    
    dataobjRegistration = JSON.stringify(jobseekerRegistrationObj);
    
    var apiUrlWorkExperience = GetWebAPIURL() + '/api/Company/';

    //To create WorkHistory table
    $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjRegistration,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            saveEmployer(data);
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
   

}

function saveEmployer(companyObj)
{
    var jsonObjectRegistration = ko.toJS(viewModel);
    var dataobjRegistration;
    var jobseekerRegistrationObj = {}

    jobseekerRegistrationObj.FirstName = jsonObjectRegistration.adminFirstName;
    jobseekerRegistrationObj.LastNmae = jsonObjectRegistration.adminLastName;
    jobseekerRegistrationObj.Password = jsonObjectRegistration.password;
    jobseekerRegistrationObj.Email = jsonObjectRegistration.adminEmail;
    jobseekerRegistrationObj.CompanyId = companyObj;
    jobseekerRegistrationObj.Permission = "2b3f4f88-c219-4294-90af-a144a4383247";
    jobseekerRegistrationObj.Department = viewModel.dataDepartment()[viewModel.selectedIndexDepartment()].value;
    dataobjRegistration = JSON.stringify(jobseekerRegistrationObj);
    var apiUrlRegistration = GetWebAPIURL() + '/api/Employer/';
   // alert(dataobjRegistration);
    //To create WorkHistory table
    $.ajax({
        url: apiUrlRegistration,
        type: "POST",
        data: dataobjRegistration,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            window.location = "AccountInformation.html"
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}
viewModel.reset = function () {

}
//id="503df823-4ee6-416f-82cd-cec253985bcc"