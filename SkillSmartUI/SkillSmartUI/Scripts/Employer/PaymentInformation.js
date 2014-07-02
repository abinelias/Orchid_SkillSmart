$(document).ready(function () {

    initPaymentInformation();
    // $('#numinput').wijinputnumber({ decimalPlaces: 2, showSpinner: true });
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

function initPaymentInformation()
{
    viewModel.selectedIndexCredit = ko.observable(0);
    viewModel.dataCredit = ko.observable(createListCredit());

    viewModel.selectedIndexCountry = ko.observable(0);
    viewModel.dataCountry = ko.observable(createListCountry());

    viewModel.selectedIndexState = ko.observable(0);
    viewModel.dataState = ko.observable();

    viewModel.isEditablePayment = ko.observable(false);
    viewModel.payment = ko.observable("creditCard");
    viewModel.cardName = ko.observable();
    viewModel.businessName = ko.observable();
    viewModel.cardNumber = ko.observable();
    viewModel.expireDate = ko.observable();
    viewModel.securityCode = ko.observable();
    viewModel.addressline1 = ko.observable("").extend({ required: { message: "Address required" } });
    viewModel.addressline2 = ko.observable("").extend({ required: { message: "Address required" } });
    viewModel.city = ko.observable("").extend({ required: { message: "City required" } });
    viewModel.zip = ko.observable("").extend({ required: { message: "Zip is required" }, pattern: { message: "Zip can only be number", params: '^([0-9]*)$' } });

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

function createListCredit() {


    var list = [];
    list.push({ label: "Select", value: "" });
    
    return list;
}

viewModel.clickButtonPayment = function ()
{
   // viewModel.isEditablePayment(true);
}

viewModel.savePayment = function ()
{ }
viewModel.cancelPayment = function ()
{
   // viewModel.isEditablePayment(false);
}
viewModel.whichTemplateToUsePaymentInformation = function () {
    return viewModel.isEditablePayment() ? "EditFormPaymentInformation" : "ViewPaymentInformation";
}