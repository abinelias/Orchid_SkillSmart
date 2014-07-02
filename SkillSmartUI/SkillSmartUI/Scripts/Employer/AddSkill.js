var viewModel = {}

$(document).ready(function () {
    initAddSkill();
    ko.applyBindings(viewModel);
});



function getCategoryList() {
    var apiUrlCategory = GetWebAPIURL() + '/api/Category?parentId=0';
    var dataCategoryObj;

    //To get Category name from Category table
    $.ajax({
        url: apiUrlCategory,
        type: 'GET',
        async: false,
        //headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataCategoryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataCategoryObj;

}
function getSkillList()
{
   
    var apiUrlSkill = GetWebAPIURL() + '/api/Skill';
    var dataSkillObj;

    $.ajax({
        url: apiUrlSkill,
        type: 'GET',
        async: false,
        // headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataSkillObj = data;
           
        },
        error: function (xhr, status, error) {
            alert('Errorskill :' + status);
        }
    });
    return dataSkillObj;
}

function initAddSkill() {
   
    viewModel.selectedCategory = ko.observable('');
    viewModel.category = ko.observableArray();

    viewModel.selectedSpeciality = ko.observable('');
    viewModel.speciality = ko.observableArray();

    viewModel.selectedSkill = ko.observable('');
    viewModel.skill = ko.observableArray();


    var dataSkillObj = getSkillList();
    for (keySkill in dataSkillObj) {
        viewModel.skill.push({ name: dataSkillObj[keySkill].SkillName, id: dataSkillObj[keySkill].Id });
    }

   

    var dataCategoryObj = getCategoryList();
    viewModel.category.push({ name: "Category", id: "" });
    for (da in dataCategoryObj) {

        viewModel.category.push({ name: dataCategoryObj[da].CategoryName, id: dataCategoryObj[da].Id });
    }

   
    viewModel.speciality.push({ name: "Speciality", id: "" });
    viewModel.selectedCategory.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlSpeciality = GetWebAPIURL() + '/api/Category/?parentId=' + newValue;
            var dataSpecialityObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSpeciality,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
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

   /* viewModel.selectedSpeciality.subscribe(function (newValue) {

        if (newValue != "") {

            var apiUrlSkill = GetWebAPIURL() + '/api/SkillMap/?specialityId=' + newValue;
            var dataSkillObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSkill,
                type: 'GET',
                async: false,
                // headers: app.securityHeaders(),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    viewModel.skill([]);
                    for (keySkill in data) {
                        viewModel.skill.push({ name: data[keySkill].SkillName, id: data[keySkill].SkillMapId });
                    }
                },
                error: function (xhr, status, error) {
                    alert('Errorskill :' + status);
                }
            });
        }
    });*/
}





viewModel.saveSkills = function () {

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}

   
    jobseekerworkExperienceObj.CategoryId = jsonObjectWorkExperience.selectedSpeciality.toString();
    jobseekerworkExperienceObj.SkillId = jsonObjectWorkExperience.selectedSkill.toString();



    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    alert(dataobjWorkExpereince);

    var apiUrlWorkExperience = GetWebAPIURL() + '/api/SkillMap/';
    //To create WorkHistory table
  $.ajax({
        url: apiUrlWorkExperience,
        type: "POST",
        data: dataobjWorkExpereince,

        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}