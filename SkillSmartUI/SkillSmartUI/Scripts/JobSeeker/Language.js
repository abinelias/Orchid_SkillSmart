$(document).ready(function () {
    init();
});
var url = window.location.href;
var userId = url.substring(url.lastIndexOf('=') + 1);
    //var userId = "d7cb31e2-2288-44f7-99af-f1a27fc8027a";

    function getLanguageLookup() {
        var apiUrlLanguageList = GetWebAPIURL() + '/api/Lookup/?name=LanguageList';
        var dataLanguageListObj;
        
        //To get language name from Language Lookup
        $.ajax({
            url: apiUrlLanguageList,
            type: 'GET',
            async: false,
            success: function (data) {
                dataLanguageListObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
        return dataLanguageListObj;
    }

    function getProficiencyLookup() {
        var apiUrlProficiency = GetWebAPIURL() + '/api/Lookup/?name=Proficiency';
        var dataProficiencyObj;

        //To get Proficiency name from Proficiency Lookup
        $.ajax({
            url: apiUrlProficiency,
            type: 'GET',
            async: false,
            success: function (data) {
                dataProficiencyObj = data;

            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
        return dataProficiencyObj;
    }

    function getJobseekerLanguages() {
        var apiUrlLanguages = GetWebAPIURL() + '/api/Language?jobSeekerId=' + userId;
        var dataObjLanguages;
        //To get Languages from Language table
        $.ajax({
            url: apiUrlLanguages,
            type: 'GET',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dataObjLanguages = data;
            },
            error: function (xhr, status, error) {
                alert('Erooororlang :' + status);
            }
        });
        return dataObjLanguages;
    }

    function saveLanguage(languageObj) {
        var jsonObjectLanguage = ko.toJS(languageObj);
        //var jsonObjectVM = ko.toJS(viewModel);
        if (jsonObjectLanguage.Id) {
            var dataObjLanguage;
            var jobSeekerLanguageObj = {}
            jobSeekerLanguageObj.JobSeekerId = jsonObjectLanguage.JobSeekerId;
            jobSeekerLanguageObj.ProficiencyId = viewModel.dataProficiency()[languageObj.selectedIndexProficiency()].value;
            jobSeekerLanguageObj.LanguageId = viewModel.dataLanguage()[languageObj.selectedIndexLanguage()].value;
            jobSeekerLanguageObj.Certification = jsonObjectLanguage.CertificationDetails;

            dataObjLanguage = JSON.stringify(jobSeekerLanguageObj);
            var apiUrlLanguage = GetWebAPIURL() + '/api/Language?Id=' + jsonObjectLanguage.Id;
            //To update Scholarship details
            $.ajax({
                url: apiUrlLanguage,
                type: "PUT",
                data: dataObjLanguage,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    languageObj.isEdit('0');
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
        else {
            var dataObjLanguage;
            var jobSeekerLanguageObj = {}

            jobSeekerLanguageObj.JobSeekerId = jsonObjectLanguage.JobSeekerId;
            jobSeekerLanguageObj.LanguageId = viewModel.dataLanguage()[languageObj.selectedIndexLanguage()].value;
            jobSeekerLanguageObj.ProficiencyId = viewModel.dataProficiency()[languageObj.selectedIndexProficiency()].value;
            jobSeekerLanguageObj.Certification = jsonObjectLanguage.CertificationDetails;

            dataObjLanguage = JSON.stringify(jobSeekerLanguageObj);
            var apiUrlLanguage = GetWebAPIURL() + '/api/Language';
            //To insert data into scholarship table
            $.ajax({
                url: apiUrlLanguage,
                type: "Post",
                data: dataObjLanguage,
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    languageObj.isEdit('0');
                    languageObj.Id(data);
                    viewModel.languageCheck('1');
                },
                error: function (xhr, error) {
                    alert('Error :' + error);
                }
            });

        }
    }

    function init() {
        viewModel.languageCheck = ko.observable('0');
        viewModel.isEditableLanguage = ko.observable(false);
        viewModel.btnLanguage = ko.observable("Edit");

        
        viewModel.LanguageList = ko.observableArray();
        viewModel.Proficiency = ko.observableArray();
        viewModel.languages = ko.observableArray();

        viewModel.dataLanguage = ko.observable(createListLanguage());
        viewModel.dataProficiency = ko.observable(createListProficiency());

        var dataLanguageListObj = getLanguageLookup();
       /* viewModel.LanguageList.push({ name: "Language", id: "" });
        for (da in dataLanguageListObj) {
            viewModel.LanguageList.push({ name: dataLanguageListObj[da].Name, id: dataLanguageListObj[da].Id });
        }*/

        var dataProficiencyObj = getProficiencyLookup();
      /*  viewModel.Proficiency.push({ name: "Proficiency", id: "" });
        for (da in dataProficiencyObj) {
            viewModel.Proficiency.push({ name: dataProficiencyObj[da].Name, id: dataProficiencyObj[da].Id });
        }*/

        var dataObjLanguages = getJobseekerLanguages();
        if (dataObjLanguages) {
            
            for (var i = 0; i < dataObjLanguages.length; i++) {
                viewModel.languageCheck('1');
                var language = new createLanguage(dataObjLanguages[i]);
                viewModel.languages.push(language);
            }
        }
       
    }
    function createListLanguage() {

        var dataLanguageListObj = getLanguageLookup();
        var list = [];
        for (da in dataLanguageListObj) {
       
            list.push({
                label: dataLanguageListObj[da].Name,
                value: dataLanguageListObj[da].Id
            });
        }
        return list;
    }

    function createListProficiency() {
        var dataProficiencyObj = getProficiencyLookup();
        var list = [];
        for (da in dataProficiencyObj) {
            list.push({
                label: dataProficiencyObj[da].Name,
                value: dataProficiencyObj[da].Id
            });
        }
        return list;
    }

    var dataLanguageListObj = getLanguageLookup();
    var dataProficiencyObj = getProficiencyLookup();

    function createLanguage(da) {
        
        var self = this;
        self.LanguageId = ko.observable('');
        self.JobSeekerId = ko.observable(userId);
        self.ProficiencyId = ko.observable('');
        self.CertificationDetails = ko.observable('');
        self.isEdit = ko.observable('0');
        self.deleteCheck = ko.observable('1');

        self.selectedIndexLanguage = ko.observable(0);
        self.selectedIndexProficiency = ko.observable(0);

        
        self.Id = ko.observable('');

        if (da) {
            self.JobSeekerId(da.JobSeekerId);
           // self.ProficiencyId(da.ProficiencyId);
            for (i in dataProficiencyObj) {

                if (da.ProficiencyId == dataProficiencyObj[i].Id) {
                    self.selectedIndexProficiency(i);
                    
                }
            }
           // self.LanguageId(da.LanguageId);
            for (i in dataLanguageListObj) {
                if (da.LanguageId == dataLanguageListObj[i].Id) {
                    self.selectedIndexLanguage(i);
                   
                }
            }
            self.CertificationDetails(da.Certification);
            self.Id(da.Id);
            self.isEdit('0');
        }
        self.LanguageName = ko.computed(function () {
           
            return viewModel.dataLanguage()[self.selectedIndexLanguage()].label;
        }, this);
        self.ProfociencyName = ko.computed(function () {
            return viewModel.dataProficiency()[self.selectedIndexProficiency()].label;
        }, this);
    }
    
   
    var selectedLanguage;
    viewModel.addFirstLanguage = function () {
        viewModel.btnLanguage("Add More");
        viewModel.isEditableLanguage(true);
        var language = new createLanguage();
        language.isEdit('1');
        language.deleteCheck('0');
        viewModel.languages.push(language);
    }
    viewModel.saveLanguages = function (languageObj) {
        saveLanguage(languageObj);
        viewModel.languageCheck('1');
    }
    viewModel.cancelLanguage = function (languageObj) {

        if (viewModel.languageCheck() == 1) {
            document.getElementById("addMoreLanguage").disabled = false;
        }
        var jsonObjectLanguage = ko.toJS(languageObj);
        //var langTest = ko.toJS(selectedLanguage);
        if (jsonObjectLanguage.Id) {
            languageObj.isEdit('0');
            languageObj.selectedIndexLanguage(editedLanguage);
            languageObj.selectedIndexProficiency(editedProficiency);
            languageObj.CertificationDetails(selectedLanguage.CertificationDetails);
        }
        else {
            viewModel.languages.remove(languageObj);
        }

        if (viewModel.languages().length == 0) {
            viewModel.languageCheck('0');
            viewModel.isEditableLanguage(false);
        }


    }
    viewModel.deleteLanguage = function (languageObj) {

        var jsonObjectLanguage = ko.toJS(languageObj);

        var LanguageDelete = confirm("Do you want to delete!");
        if (LanguageDelete == true) {
            if (jsonObjectLanguage.Id) {
                var apiUrlLanguage = GetWebAPIURL() + '/api/Language?Id=' + jsonObjectLanguage.Id;
                //To delete data from Language Table
                $.ajax({
                    url: apiUrlLanguage,
                    type: "DELETE",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
                        viewModel.languages.remove(languageObj);
                        if (viewModel.languages().length == 0) {
                            viewModel.languageCheck('0');
                            viewModel.isEditableLanguage(false);
                        }
                    },
                    error: function (xhr, error) {
                        alert('Error :' + error);
                    }
                });

            }
            else {
                viewModel.languages.remove(languageObj);
            }
        }
    }

    var editedLanguage;
    var editedProficiency;
    viewModel.editLanguageDetails = function (languageObj) {
        editedLanguage = languageObj.selectedIndexLanguage();
        editedProficiency = languageObj.selectedIndexProficiency();
        document.getElementById("addMoreLanguage").disabled = false;
        selectedLanguage = ko.toJS(languageObj);
        languageObj.isEdit('1');
        languageObj.deleteCheck('1');
    }
    
    viewModel.clickButtonLanguage = function () {
        document.getElementById("addMoreLanguage").disabled = true;

        if (viewModel.btnLanguage() == "Add More") {
            alert("test");
            var language = new createLanguage();
            language.isEdit('1');
            language.deleteCheck('0');
            viewModel.languages.splice(0, 0, language);
        }

        else {
            document.getElementById("addMoreLanguage").disabled = false;
            viewModel.btnLanguage("Add More");
            viewModel.isEditableLanguage(true);
        }
    }
    viewModel.whichTemplateToUseLanguage = function () {
        return viewModel.isEditableLanguage() ? "EditLanguages" : "ViewLanguages";
    }