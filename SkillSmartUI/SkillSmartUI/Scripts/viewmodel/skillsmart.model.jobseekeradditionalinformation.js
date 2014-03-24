if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekeradditionalinformation) == 'undefined') skillsmart.model.jobseekeradditionalinformation = {}

skillsmart.model.jobseekeradditionalinformation.initializeViewModel = function (dataTitleObj, dataObjSuffix, dataObjCitizenship, dataObjCountry, dataObjJobSeeker) {
    var viewModel =
    {
        firstname: ko.observable(dataObjJobSeeker.FirstName).extend({ required: { message: "FirstName required" } }),
        middlename: ko.observable(""),
        lastname: ko.observable(dataObjJobSeeker.LastName).extend({ required: { message: "LastName required" } }),
        preferredname: ko.observable(""),

        addressline1: ko.observable("").extend({ required: { message: "Address required" } }),
        addressline2: ko.observable("").extend({ required: { message: "Address required" } }),
        city: ko.observable("").extend({ required: { message: "City required" } }),
        zip: ko.observable("").extend({ required: { message: "Zip is required" }, pattern: { message: "Zip can only be number", params: '^([0-9]*)$' } }),
        phonehome: ko.observable("").extend({ required: { message: "Phone required." }, pattern: { message: "Phone can only be number", params: '^([0-9]*)$' } }),
        email: ko.observable(dataObjJobSeeker.Email).extend({ required: { message: "Email required" }, pattern: { message: "please enter proper email", params: '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$' } }),
        citizenship: ko.observable("").extend({ required: { message: "citizenship required" } }),

        contact: ko.observable("email"),
        selectedCountryItem: ko.observable().extend({ required: { message: "country required" } }),
        country: ko.observableArray(),
        selectedTitleItem: ko.observable(),
        title: ko.observableArray(),
        password: ko.observable(dataObjJobSeeker.Password),
        selectedSuffixItem: ko.observable(),
        suffix: ko.observableArray(),
        selectedCitizenshipItem: ko.observable().extend({ required: { message: "Citizenship required" } }),
        citizenship: ko.observableArray(),
        selectedStateItem: ko.observable().extend({ required: { message: "State required" } }),
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

    return viewModel;
};