var viewModel = {}

$(document).ready(function () {
    initSkillAdd();
    ko.applyBindings(viewModel);
});


function initSkillAdd() {

    viewModel.SkillName = ko.observable('');
    
}

viewModel.skillAdd = function () {

    var jsonObjectWorkExperience = ko.toJS(viewModel);
    var dataobjWorkExpereince;
    var jobseekerworkExperienceObj = {}


    jobseekerworkExperienceObj.SkillName = jsonObjectWorkExperience.SkillName;
    jobseekerworkExperienceObj.Active = 1;

    dataobjWorkExpereince = JSON.stringify(jobseekerworkExperienceObj);
    alert(dataobjWorkExpereince);

    var apiUrlWorkExperience = GetWebAPIURL() + '/api/Skill/';
    alert(apiUrlWorkExperience);
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