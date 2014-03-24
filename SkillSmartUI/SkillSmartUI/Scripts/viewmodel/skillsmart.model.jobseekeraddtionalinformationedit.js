if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekeradditionalinformationedit) == 'undefined') skillsmart.model.jobseekeradditionalinformationedit = {}

skillsmart.model.jobseekeradditionalinformationedit.initializeViewModel = function (dataTitleObj, dataObjSuffix, dataObjCitizenship, dataObjCountry, dataObjJobSeeker, dataObjAdditionalInfo, dataStateObj) {
    var viewModel =
    {
        firstname: ko.observable(dataObjJobSeeker.FirstName).extend({ required: { message: "FirstName required" } }),
        middlename: ko.observable(dataObjAdditionalInfo.MiddleName),
        lastname: ko.observable(dataObjJobSeeker.LastName).extend({ required: { message: "LastName required" } }),
        preferredname: ko.observable(dataObjAdditionalInfo.PreferedName),
        additionalinfoid: ko.observable(dataObjAdditionalInfo.Id),
        password: ko.observable(dataObjJobSeeker.Password),
        addressline1: ko.observable(dataObjAdditionalInfo.AddressLine1).extend({ required: { message: "Address required" } }),
        addressline2: ko.observable(dataObjAdditionalInfo.AddressLine2).extend({ required: { message: "Address required" } }),
        city: ko.observable(dataObjAdditionalInfo.City).extend({ required: { message: "City required" } }),
        zip: ko.observable(dataObjAdditionalInfo.ZipCode).extend({ required:{message:"Zip is required"},  pattern:{ message: "Zip can only be number", params: '^([0-9]*)$' } }),
        phonehome: ko.observable(dataObjAdditionalInfo.HomePhone).extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } }),
        email: ko.observable(dataObjJobSeeker.Email).extend({ required: { message: "Email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } }),

        contact: ko.observable(dataObjAdditionalInfo.MethodOfContact),
        selectedCountryItem: ko.observable(dataObjAdditionalInfo.CountryId).extend({ required: { message: "country required" } }),
        country: ko.observableArray(),
        selectedTitleItem: ko.observable(dataObjAdditionalInfo.Title),
        title: ko.observableArray(),
        selectedSuffixItem: ko.observable(dataObjAdditionalInfo.Suffix),
        suffix: ko.observableArray(),
        selectedCitizenshipItem: ko.observable(dataObjAdditionalInfo.Citizenship).extend({ required: { message: "Citizenship required" } }),
        citizenship: ko.observableArray(),
        selectedStateItem: ko.observable(dataObjAdditionalInfo.StateId).extend({ required: { message: "State required" } }),
        state: ko.observableArray()

    }

    viewModel.displayErrors = ko.observable(false);
    viewModel.title.push({ name: "Select", id: "" });
    for (key in dataTitleObj) {

        viewModel.title.push({ name: dataTitleObj[key].Name, id: dataTitleObj[key].Id });
    }

    viewModel.suffix.push({ name: "Select", id: "" });
    for (keySuffix in dataObjSuffix) {
        viewModel.suffix.push({ name: dataObjSuffix[keySuffix].Name, id: dataObjSuffix[keySuffix].Id });
    }

    viewModel.country.push({ name: "Select", id: "" });
    for (keyCountry in dataObjCountry) {
        viewModel.country.push({ name: dataObjCountry[keyCountry].Name, id: dataObjCountry[keyCountry].Id });
    }

    viewModel.citizenship.push({ name: "Select", id: "" });
    for (keyCitizenship in dataObjCitizenship) {
        viewModel.citizenship.push({ name: dataObjCitizenship[keyCitizenship].Name, id: dataObjCitizenship[keyCitizenship].Id });
    }


    viewModel.state.push({ name: "Select", id: "" });
    for (keyState in dataStateObj) {
        viewModel.state.push({ name: dataStateObj[keyState].Name, id: dataStateObj[keyState].Id });
    }

    return viewModel;
};
