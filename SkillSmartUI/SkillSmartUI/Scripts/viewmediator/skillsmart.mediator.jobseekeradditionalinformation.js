if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.mediator) == 'undefined') skillsmart.mediator = {}
if (typeof (skillsmart.mediator.jobseekeradditionalinformation) == 'undefined') skillsmart.mediator.jobseekeradditionalinformation = {}

skillsmart.mediator.jobseekeradditionalinformation.createViewMediator = function ()
{
    var viewModel = skillsmart.model.jobseekeradditionalinformation.initializeViewModel();
    skillsmart.mediator.jobseekeradditionalinformation.setViewModel(viewModel);
};
skillsmart.mediator.jobseekeradditionalinformation.setupViewDataBindings = function ()
{
    $("#preferred-name").attr("data-bind", "value:preferredname");
    $("#address-line1").attr("data-bind", "value:addressline1");
    $("#address-line2").attr("data-bind", "value:addressline2");
    $("#city").attr("data-bind", "value:city");
    $("#zip").attr("data-bind", "value:zip");
    $("#citizenship").attr("data-bind", "value:citizenship");
    $("#phone-home").attr("data-bind", "value:phonehome");
    $("#phone-mobile").attr("data-bind", "value:phonemobile");
    $("#country").attr("data-bind", "options:country,optionsText: 'name', optionsValue: 'id', value: selectedItem");

    $("#submit-button").attr("data-bind", "click:submit");
    $("#reset-button").attr("data-bind", "click:reset");
    var viewNode = $("#form_div")[0];
    var viewModel = skillsmart.mediator.jobseekeradditionalinformation.getViewModel();
    viewModel.reset = function ()
    {
        this.preferredname("");
        this.addressline1("");
        this.addressline2("");
        this.city("");
        this.zip("");
        this.phonehome("");
        this.phonemobile("");
        this.emailaddress("");
        this.citizenship("");
    };
    viewModel.submit = function ()
    {
        var jsonObject = ko.toJS(viewModel);
        alert(jsonObject.selectedItem);
        //alert(jsonObject);
    };
    ko.applyBindings(viewModel, viewNode);


}

skillsmart.mediator.jobseekeradditionalinformation.getViewModel = function ()
{
    return $(document).data("skillsmart.model.jobseekeradditionalinformation.viewmodel");
}

skillsmart.mediator.jobseekeradditionalinformation.setViewModel = function (viewModel)
{
    $(document).data("skillsmart.model.jobseekeradditionalinformation.viewmodel", viewModel);
}

