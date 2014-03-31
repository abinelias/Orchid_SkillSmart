if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.popupskill) == 'undefined') skillsmart.model.popupskill = {}

skillsmart.model.popupskill.initializeViewModelPopupSkill = function (dataCategoryObj)
{
    var viewModel = {
        selectedCategory: ko.observable(''),
        category: ko.observableArray(),

        selectedSpeciality: ko.observable(''),
        speciality: ko.observableArray(),

        selectedSkill: ko.observable(''),
        skill: ko.observableArray(),

    }
    viewModel.category.push({ name: "Category", id: "" });
    for (da in dataCategoryObj)
    {
        
        viewModel.category.push({ name: dataCategoryObj[da].CategoryName, id: dataCategoryObj[da].Id });
    }
    viewModel.speciality.push({ name: "Speciality", id: "" });
    viewModel.skill.push({ name: "Skill", id: "" });
    return viewModel;
}
