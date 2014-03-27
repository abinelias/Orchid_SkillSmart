if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.popupskill) == 'undefined') skillsmart.mediator.popupskill = {}

skillsmart.mediator.popupskill.createViewMediatorPopupskill = function ()
{
    var apiUrlCategory = GetWebAPIURL() + '/api/Category?parentId=0';
    var dataCategoryObj;

    //To get language name from Language Lookup
    $.ajax({
        url: apiUrlCategory,
        type: 'GET',
        async: false,
        success: function (data) {
            dataCategoryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

  
    var viewModel = skillsmart.model.popupskill.initializeViewModelPopupSkill(dataCategoryObj);
    skillsmart.mediator.popupskill.setViewModel("skillsmart.model.popupskill.viewModel", viewModel);
}

skillsmart.mediator.popupskill.setupViewDataBindingsPopupskill = function ()
{
    $("#CategoryList").attr("data-bind", "options:category,optionsText: 'name', optionsValue: 'id', value: selectedCategory");
    $("#SpecialityList").attr("data-bind", "options:speciality,optionsText: 'name', optionsValue: 'id', value: selectedSpeciality");

    var viewNode = $("#Popup_div")[0];
    var viewModel = skillsmart.mediator.popupskill.getViewModel("skillsmart.model.popupskill.viewModel");

    viewModel.selectedCategory.subscribe(function (newValue)
    {

        if (newValue != "") {

            var apiUrlSpeciality = GetWebAPIURL() + '/api/Category/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSpeciality,
                type: 'GET',
                async: false,
                success: function (data) {
                    viewModel.speciality([]);
                    viewModel.speciality.push({ name: "Speciality", id: "" });
                    for (keySpeciality in data) {
                        viewModel.speciality.push({ name: data[keySpeciality].CategoryName, id: data[keySpeciality].Id });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });
        }
    });
    ko.applyBindings(viewModel, viewNode);
}

skillsmart.mediator.popupskill.getViewModel = function (key) {
    return $(document).data(key);
}

skillsmart.mediator.popupskill.setViewModel = function (key, viewModel) {
    $(document).data(key, viewModel);
}