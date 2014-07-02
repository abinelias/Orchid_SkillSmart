$(document).ready(function () {

    initAcountDetails();
});
var companyId = "503df823-4ee6-416f-82cd-cec253985bcc";



function initAcountDetails() {
 
    var dataObjState;
    var dataObjCountry = getCountryLookup();
    var dataObjCompanyInfo = getCompanyDetails();

    
    viewModel.selectedIndexSector = ko.observable(0);
    viewModel.dataSector = ko.observable(createListSector());

    viewModel.selectedIndexEmployerSize = ko.observable(0);
    viewModel.dataEmployerSize = ko.observable(createListEmployerSize());

    viewModel.selectedIndexIndustry = ko.observable(0);
    viewModel.dataIndustry = ko.observable(createListIndustry());

    viewModel.selectedIndexCountryName = ko.observable(0);
    viewModel.dataCountry = ko.observable(createListCountry());

    viewModel.selectedIndexStateName = ko.observable(0);
    viewModel.Statedata = ko.observable();

  
    viewModel.companyName = ko.observable("");
    viewModel.branch = ko.observable("");    
    viewModel.streetAddress = ko.observable("");
    viewModel.location = ko.observable("");
    viewModel.Maincity = ko.observable("");
    viewModel.zipCode = ko.observable().extend({ required: { message: "Zip is required" }, pattern: { message: "Zip can only be number", params: '^([0-9]*)$' } });
    viewModel.businessPhone = ko.observable("").extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } });
    viewModel.employerUrl = ko.observable();
    viewModel.employerDescription = ko.observable();

    viewModel.accountDetailsCheck = ko.observable('1');
    viewModel.isEditableAccountDetails = ko.observable(false);
    viewModel.btnAccountDetails = ko.observable("Edit");

    if (dataObjCompanyInfo)
    {
        viewModel.companyName(dataObjCompanyInfo.CompanyName);
        viewModel.branch(dataObjCompanyInfo.CompanyBranch);
        viewModel.streetAddress(dataObjCompanyInfo.StreetAddress);
        viewModel.location(dataObjCompanyInfo.Address2);
        viewModel.Maincity(dataObjCompanyInfo.City);
        viewModel.zipCode(JSON.stringify(dataObjCompanyInfo.Zip));
        viewModel.businessPhone = ko.observable(dataObjCompanyInfo.Phone);
        viewModel.employerUrl = ko.observable(dataObjCompanyInfo.CompanyURL);
        viewModel.employerDescription = ko.observable(dataObjCompanyInfo.CompanyDescription);

        viewModel.selectedIndexCountryName.subscribe(function (nextValue) {
            
            var countryId = viewModel.dataCountry()[viewModel.selectedIndexCountryName()].value;
            if (countryId != "") {
               
                var apiUrlState = GetWebAPIURL() + '/api/LookupByCriteria/?name=State&parentId=' + countryId;
                //To get State for lookup
                $.ajax({
                    url: apiUrlState,
                    type: 'GET',
                    async: false,
                    success: function (data) {
                        viewModel.Statedata(createStateList(data));
                        dataObjState = data;
                    },
                    error: function (xhr, status, error) {
                        alert('Error :' + status);
                    }
                });
            }
        });

        if (dataObjCompanyInfo.Country) {
            for (da in dataObjCountry) {
                if (dataObjCompanyInfo.Country == dataObjCountry[da].Id) {
                    viewModel.selectedIndexCountryName((parseInt(da) + 1));
                }
            }
        }
      
        if (dataObjCompanyInfo.State) {
            for (da in dataObjState) {
                if (dataObjCompanyInfo.State == dataObjState[da].Id) {
                    viewModel.selectedIndexStateName(da);
                }
            }
        }
        var dataObjSector = getSectorLookup();

        if (dataObjCompanyInfo.Sector) {
            for (da in dataObjSector) {
                if (dataObjCompanyInfo.Sector == dataObjSector[da].Id) {
                    viewModel.selectedIndexSector(da);
                }
            }
        }
        var dataIndustryTypeObj = getIndustryTypeLookup();

        if (dataObjCompanyInfo.Industry) {
            for (da in dataIndustryTypeObj) {
                if (dataObjCompanyInfo.Industry == dataIndustryTypeObj[da].Id) {
                    viewModel.selectedIndexIndustry(da);
                }
            }
        }
        var dataObjEmployerSize = getEmployerSizeLookup();

        if (dataObjCompanyInfo.Industry) {
            for (da in dataObjEmployerSize) {
                if (dataObjCompanyInfo.EmployerSize == dataObjEmployerSize[da].Id) {
                    viewModel.selectedIndexEmployerSize(da);
                }
            }
        }
    }
    viewModel.sectorName = ko.computed(function () {

        return viewModel.dataSector()[viewModel.selectedIndexSector()].label;

    }, viewModel);
    viewModel.industryName = ko.computed(function () {

        return viewModel.dataIndustry()[viewModel.selectedIndexIndustry()].label;

    }, viewModel);
    viewModel.employerSizeName = ko.computed(function () {

        return viewModel.dataEmployerSize()[viewModel.selectedIndexEmployerSize()].label;

    }, viewModel);
    viewModel.Country = ko.computed(function () {

        return viewModel.dataCountry()[viewModel.selectedIndexCountryName()].label;

    }, viewModel);

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

function createStateList(data) {
    var list = [];
    for (da in data) {
        list.push({

            label: data[da].Name,
            value: data[da].Id
        });
    }
    return list;
}

function createListSector() {

    var dataObjSector = getSectorLookup();
    var list = [];
    for (da in dataObjSector) {

        list.push({
            label: dataObjSector[da].Name,
            value: dataObjSector[da].Id
        });
    }
    return list;
}

function createListIndustry() {

    var dataIndustryTypeObj = getIndustryTypeLookup();
    var list = [];
    for (da in dataIndustryTypeObj) {

        list.push({
            label: dataIndustryTypeObj[da].Name,
            value: dataIndustryTypeObj[da].Id
        });
    }

    return list;
}

function createListEmployerSize() {
    
    var dataObjEmployerSize = getEmployerSizeLookup();
    var list = [];
    for (da in dataObjEmployerSize) {

        list.push({
            label: dataObjEmployerSize[da].Name,
            value: dataObjEmployerSize[da].Id
        });
    }

    return list;
}

viewModel.saveAccountDetails = function () {
    var jsonObjectAccountDetails = ko.toJS(viewModel);
    var dataobjAccountDetails;
    var jobseekerAccountDetailsObj = {}
    jobseekerAccountDetailsObj.CompanyName = jsonObjectAccountDetails.companyName;
    jobseekerAccountDetailsObj.CompanyBranch = jsonObjectAccountDetails.branch;
    jobseekerAccountDetailsObj.StreetAddress = jsonObjectAccountDetails.streetAddress;
    jobseekerAccountDetailsObj.Address2 = jsonObjectAccountDetails.location;
    jobseekerAccountDetailsObj.City = jsonObjectAccountDetails.Maincity;
    jobseekerAccountDetailsObj.Zip = jsonObjectAccountDetails.zipCode;
    jobseekerAccountDetailsObj.Country = viewModel.dataCountry()[viewModel.selectedIndexCountryName()].value;
    jobseekerAccountDetailsObj.State = viewModel.Statedata()[viewModel.selectedIndexStateName()].value;

    jobseekerAccountDetailsObj.Sector = viewModel.dataSector()[viewModel.selectedIndexSector()].value;
    jobseekerAccountDetailsObj.Industry = viewModel.dataIndustry()[viewModel.selectedIndexIndustry()].value;
    jobseekerAccountDetailsObj.EmployerSize = viewModel.dataEmployerSize()[viewModel.selectedIndexEmployerSize()].value;

    jobseekerAccountDetailsObj.Phone = jsonObjectAccountDetails.businessPhone;
    jobseekerAccountDetailsObj.CompanyURL = jsonObjectAccountDetails.employerUrl;
    jobseekerAccountDetailsObj.CompanyDescription = jsonObjectAccountDetails.employerDescription;

    dataobjAccountDetails = JSON.stringify(jobseekerAccountDetailsObj);


    var apiUrlAccountDetails = GetWebAPIURL() + '/api/Company?Id=' + companyId;

    //To create WorkHistory table
       $.ajax({
           url: apiUrlAccountDetails,
           type: "PUT",
           data: dataobjAccountDetails,
   
           contentType: "application/json; charset=utf-8",
           async: false,
           success: function (data) {
               viewModel.isEditableAccountDetails(false);
               viewModel.accountDetailsCheck("1");


           },
           error: function (xhr, error) {
               alert('Error :' + error);
           }
       });

}

viewModel.cancelAccountDetails = function () {

    viewModel.isEditableAccountDetails(false);
    viewModel.accountDetailsCheck("1");

}
viewModel.clickButtonAccount = function ()
{
    viewModel.isEditableAccountDetails(true);
    viewModel.accountDetailsCheck("0");
}

viewModel.whichTemplateToUseEmployerAccountDetails = function () {
    return viewModel.isEditableAccountDetails() ? "EditAccountDetails" : "ViewAccountDetails";
}

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

/*function getStateLookup()
{
    var dataObjState;
    var apiUrlState = GetWebAPIURL() + '/api/Lookup/?name=State';
    //To get State for lookup
    $.ajax({
        url: apiUrlState,
        type: 'GET',
        async: false,
        success: function (data) {
            dataObjState = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjState;
}*/

function getSectorLookup() {
    //To get Country for lookup
    var apiUrlSector = GetWebAPIURL() + 'api/Lookup/?name=Sector';
    var dataObjSector;

    $.ajax({
        url: apiUrlSector,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjSector = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjSector;
}

function getEmployerSizeLookup() {
    //To get Country for lookup
    var apiUrlEmployerSize = GetWebAPIURL() + 'api/Lookup/?name=EmployerSize';
    var dataObjEmployerSize;

    $.ajax({
        url: apiUrlEmployerSize,
        type: 'GET',
        async: false,

        success: function (data) {
            dataObjEmployerSize = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataObjEmployerSize;
}

function getIndustryTypeLookup() {
    var apiUrlIndustryType = GetWebAPIURL() + '/api/Lookup/?name=IndustryType';
    var dataIndustryTypeObj;

    //To get details of Industry lookup
    $.ajax({
        url: apiUrlIndustryType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataIndustryTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataIndustryTypeObj;
}

function getCompanyDetails() {

    var apiUrlCompanyInfo = GetWebAPIURL() + 'api/Company/?companyId=' + companyId;
    var dataObjCompanyInfo;

    $.ajax({
        url: apiUrlCompanyInfo,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataObjCompanyInfo = data;
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    return dataObjCompanyInfo;
}