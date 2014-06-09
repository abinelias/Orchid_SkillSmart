var viewModel = {}
$(document).ready(function () {

    (function (ko, $) {

        if (typeof (ko) === undefined) { throw 'Knockout is required, please ensure it is loaded before loading this plug-in'; }
        if (typeof (jQuery) === undefined) { throw 'jQuery is required, please ensure it is loaded before loading this plug-in'; }
        if (typeof (jQuery.ui) === undefined) { throw 'jQuery UI is required, please ensure it is loaded before loading this plug-in'; }

        // private functions here

        // the binding
        ko.bindingHandlers.multiSelectCheck = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
                var multiselectOptions = ko.utils.unwrapObservable(allBindingsAccessor().multiselectOptions) || {};

                // pass the original optionsCaption to the similar widget option
                if (ko.utils.unwrapObservable(allBindingsAccessor().optionsCaption)) {
                    multiselectOptions.noneSelectedText = ko.utils.unwrapObservable(allBindingsAccessor().optionsCaption);
                }

                // remove this and use the widget's
                allBindingsAccessor().optionsCaption = '';
                $(element).multiselect(multiselectOptions);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).multiselect("destroy");
                });

            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                // This will be called once when the binding is first applied to an element,
                // and again whenever the associated observable changes value.
                // Update the DOM element based on the supplied values here.
                var selectOptions = ko.utils.unwrapObservable(allBindingsAccessor().multiSelectCheck);
                // remove this and use the widget's
                allBindingsAccessor().optionsCaption = '';

                ko.bindingHandlers.options.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

                setTimeout(function () {
                    $(element).multiselect("refresh");
                }, 0);

            }

        };

    })(ko, jQuery);

    $(function () {

        ensureTemplates(["JobSearch", "JobsList", "SkillList"]);

    });

    function ensureTemplates(list) {

        var loadedTemplates = [];
        ko.utils.arrayForEach(list, function (name) {
            $.get("/Templates/JobSeeker/" + name + ".html", function (template) {
                $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
                loadedTemplates.push(name);
                if (list.length === loadedTemplates.length) {


                    ko.applyBindings(viewModel);
                }
            });
        });
    }
    initAdvancedJobSearch();
    initJobSkillScoreCalculation();
});

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

function getEmploymentLookup() {
    var apiUrlWorkType = GetWebAPIURL() + '/api/Lookup/?name=WorkType';
    var dataWorkTypeObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlWorkType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataWorkTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataWorkTypeObj;
}

function getDegreeTypeLookup() {
    var apiUrlDegreeType = GetWebAPIURL() + '/api/Lookup/?name=DegreeType';
    var dataDegreeTypeObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlDegreeType,
        type: 'GET',
        async: false,
        success: function (data) {
            dataDegreeTypeObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataDegreeTypeObj;
}

function getDistanceLookup() {
    var apiUrlDistance = GetWebAPIURL() + '/api/Lookup/?name=Distance';
    var dataDistanceObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlDistance,
        type: 'GET',
        async: false,
        success: function (data) {
            dataDistanceObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataDistanceObj;
}

function getSalaryLookup() {
    var apiUrlSalary = GetWebAPIURL() + '/api/Lookup/?name=Salary';
    var dataSalaryObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlSalary,
        type: 'GET',
        async: false,
        success: function (data) {
            dataSalaryObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataSalaryObj;
}

function getCarrierLevelLookup() {
    var apiUrlCarrierLevel = GetWebAPIURL() + '/api/Lookup/?name=CarrierLevel';
    var dataCarrierLevelObj;

    //To get details of DegreeType lookup
    $.ajax({
        url: apiUrlCarrierLevel,
        type: 'GET',
        async: false,
        success: function (data) {
            dataCarrierLevelObj = data;

        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
    return dataCarrierLevelObj;
}

function getSavedJobSearch() {


    var apiUrlgetSavedJobs = GetWebAPIURL() + '/api/SavedJobSearch/';
    var dataSavedJobSearchObj;
    //To get Languages from Language table
    $.ajax({
        url: apiUrlgetSavedJobs,
        type: 'GET',
        async: false,
        headers: app.securityHeaders(),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            dataSavedJobSearchObj = data;
        },
        error: function (xhr, status, error) {
            alert('Erooororlang :' + status);
        }
    });

    return dataSavedJobSearchObj;
}

function initAdvancedJobSearch() {
    viewModel.savedApplyCheck = ko.observable('0');
    viewModel.saveSearchCheck = ko.observable('0');
    viewModel.applyCheck = ko.observable('0');
    viewModel.listJobs = ko.observable('0');

    viewModel.industryType = ko.observableArray();

    viewModel.employmentType = ko.observableArray();
    viewModel.employmentTypeId = ko.observableArray();


    viewModel.salary = ko.observableArray();

    viewModel.industryTypeId = ko.observableArray();
    viewModel.degreeId = ko.observable();
    viewModel.distanceId = ko.observable();
    viewModel.salaryId = ko.observableArray();
    viewModel.careerLevelId = ko.observable();

    viewModel.jobCheck = ko.observable('0');
    viewModel.searchCriteria = ko.observableArray();

    viewModel.textDistance = ko.observable("");
    viewModel.selectedIndexDistance = ko.observable(0);
    viewModel.dataDistance = ko.observable(createListDistance());

    viewModel.textCarrierLevel = ko.observable("");
    viewModel.selectedIndexCarrierLevel = ko.observable(0);
    viewModel.dataCarrierLevel = ko.observable(createListCarrierLevel());

    viewModel.textEducationLevel = ko.observable("");
    viewModel.selectedIndexEducationLevel = ko.observable(0);
    viewModel.dataEducationLevel = ko.observable(createListEducationLevel());

    viewModel.textSavedSearch = ko.observable("");
    viewModel.selectedIndexSavedSearch = ko.observable(-1);
    viewModel.dataSavedSearch = ko.observable(createListSearch());

    viewModel.searchName = ko.observable();

    viewModel.jobs = ko.observableArray();
    var dataObjJobSeeker = getHeaderDetails();
    viewModel.firstname = ko.observable(dataObjJobSeeker.FirstName);
    viewModel.lastname = ko.observable(dataObjJobSeeker.LastName);

    var dataSalaryObj = getSalaryLookup();
    for (da in dataSalaryObj) {
        viewModel.salary.push({ name: dataSalaryObj[da].Name, id: dataSalaryObj[da].Id });
    }

    var dataIndustryTypeObj = getIndustryTypeLookup();
    for (da in dataIndustryTypeObj) {
        viewModel.industryType.push({ name: dataIndustryTypeObj[da].Name, id: dataIndustryTypeObj[da].Id });
    }

    var dataEmploymentObj = getEmploymentLookup();
    viewModel.employmentType.push({ name: "All", id: "" });
    for (da in dataEmploymentObj) {
        viewModel.employmentType.push({ name: dataEmploymentObj[da].Name, id: dataEmploymentObj[da].Id });
    }


    viewModel.selectedIndexSavedSearch.subscribe(function (newValue) {

        var countryId = viewModel.dataSavedSearch()[viewModel.selectedIndexSavedSearch()].value;
        var dataCarrierLevelObj = getCarrierLevelLookup();
        var dataDegreeTypeObj = getDegreeTypeLookup();
        var dataDistanceObj = getDistanceLookup();

        if (countryId != "") {

            var apiUrlSavedSearch = GetWebAPIURL() + '/api/SavedJobSearch?Id=' + countryId;
            var dataSaveSearchObj;

            //To get State for lookup
            $.ajax({
                url: apiUrlSavedSearch,
                type: 'GET',
                async: false,
                success: function (data) {

                    dataSaveSearchObj = data;

                },
                error: function (xhr, status, error) {
                    alert('Error :' + status);
                }
            });

            if (dataSaveSearchObj.carrierLevel) {
                for (da in dataCarrierLevelObj) {
                    if (dataSaveSearchObj.carrierLevel == dataCarrierLevelObj[da].Id) {
                        viewModel.selectedIndexCarrierLevel((parseInt(da) + 1));
                    }
                }
            }

            if (dataSaveSearchObj.EducationLevel) {
                for (i in dataDegreeTypeObj) {
                    if (dataSaveSearchObj.EducationLevel == dataDegreeTypeObj[i].Id) {
                        viewModel.selectedIndexEducationLevel((parseInt(i) + 1));
                        break;
                    }
                }
            }

            if (dataSaveSearchObj.Distance) {
                for (da in dataDistanceObj) {
                    if (dataSaveSearchObj.Distance == dataDistanceObj[da].Id) {
                        viewModel.selectedIndexDistance((parseInt(da) + 1));
                    }
                }
            }

            if (dataSaveSearchObj.EmployeementType) {
                var getEmployeementType = dataSaveSearchObj.EmployeementType;
                var notification = getEmployeementType.split(',');
                for (var index = 0; index < notification.length; index++) {
                    viewModel.employmentTypeId.push(notification[index]);
                }


            }

            if (dataSaveSearchObj.Industry) {
                var getIndustry = dataSaveSearchObj.Industry;
                var notification = getIndustry.split(',');
                for (var index = 0; index < notification.length; index++) {
                    viewModel.industryTypeId.push(notification[index]);
                }

            }

            if (dataSaveSearchObj.Salary) {
                var getSalary = dataSaveSearchObj.Salary;
                var notification = getSalary.split(',');
                for (var index = 0; index < notification.length; index++) {
                    viewModel.salaryId.push(notification[index]);
                }

            }
        }
    });

}

function createListDistance() {
    var dataDistanceObj = getDistanceLookup();
    var list = [];
    list.push({
        label: "All",
        value: ""
    });
    for (da in dataDistanceObj) {
        list.push({
            label: dataDistanceObj[da].Name,
            value: dataDistanceObj[da].Id
        });
    }
    return list;
}

function createListCarrierLevel() {
    var dataCarrierLevelObj = getCarrierLevelLookup();
    var list = [];
    list.push({
        label: "All",
        value: ""
    });
    for (da in dataCarrierLevelObj) {
        list.push({
            label: dataCarrierLevelObj[da].Name,
            value: dataCarrierLevelObj[da].Id
        });
    }
    return list;
}

function createListEducationLevel() {
    var dataDegreeTypeObj = getDegreeTypeLookup();
    var list = [];
    list.push({
        label: "All",
        value: ""
    });
    for (da in dataDegreeTypeObj) {
        list.push({
            label: dataDegreeTypeObj[da].Name,
            value: dataDegreeTypeObj[da].Id
        });
    }
    return list;
}

function createListSearch() {
    var dataSavedJobSearchObj = getSavedJobSearch()
    var list = [];

    for (da in dataSavedJobSearchObj) {
        list.push({
            label: dataSavedJobSearchObj[da].SearchName,
            value: dataSavedJobSearchObj[da].Id
        });
    }
    return list;
}

function createsearchCriteria(i) {
    var self = this;
    self.lookUpName = ko.observable('');
    self.contentArray = ko.observableArray();

    if (i == 0) {
        if (viewModel.workTypeId() != "") {
            self.lookUpName('WorkType');
            for (var i = 0; i < viewModel.workTypeId().length; i++) {
                var addContent = new addContentForWorkType(i);
                self.contentArray.push(addContent);
            }
        }
    }
    else if (i == 1) {
        if (viewModel.industryTypeId() != "") {
            // alert(viewModel.industryTypeId());
            self.lookUpName('IndustryType');
            for (var i = 0; i < viewModel.industryTypeId().length; i++) {
                var addContentIndustry = new addContentForIndustry(i);
                self.contentArray.push(addContentIndustry);
            }
        }
    }
    else if (i == 2) {
        if (viewModel.selectedIndexEducationLevel() != -1) {
            self.lookUpName('DegreeType');
            var addContentDegreeType = new addContentForDegree(i);
            self.contentArray.push(addContentDegreeType);
        }
    }
    else if (i == 3) {
        if (viewModel.selectedIndexDistance() != -1) {
            self.lookUpName('Distance');
            var addContentDistance = new addContentForDistance();
            self.contentArray.push(addContentDistance);
        }

    }

    else if (i == 4) {
        if (viewModel.salaryId() != "") {
            self.lookUpName('Salary');
            for (var i = 0; i < viewModel.salaryId().length; i++) {
                var addContentSalary = new addContentForSalary(i);
                self.contentArray.push(addContentSalary);
            }
        }
    }
    else {
        if (viewModel.selectedIndexCarrierLevel() != " ") {
            self.lookUpName('CareerLevel');
            var addContentCarrierLevel = new addContentForCarrierLevel();
            self.contentArray.push(addContentCarrierLevel);
        }
    }
}

function createListSearch() {
    var dataSavedJobSearchObj = getSavedJobSearch()
    var list = [];

    for (da in dataSavedJobSearchObj) {
        list.push({
            label: dataSavedJobSearchObj[da].SearchName,
            value: dataSavedJobSearchObj[da].Id
        });
    }
    return list;
}

viewModel.applyJobs = function (objExpand) {

    var jobApplyCheck = 1;
    var dataObjJobSeekerAppliedJobs = getJobSeekerAppliedJobs();
    if (dataObjJobSeekerAppliedJobs.length != 0) {

        for (var i = 0; i < dataObjJobSeekerAppliedJobs.length; i++) {
            if (objExpand.jobId == dataObjJobSeekerAppliedJobs[i].JobId) {
                alert("Job already applied");
                jobApplyCheck = 0;
                break;
            }

        }
    }
    else {

        jobApplyCheck = 1;
    }
    if (jobApplyCheck == 1) {

        window.location = "AppliedJobs.html?&jobId=" + objExpand.jobId;

    }

}

viewModel.saveJobs = function (objExpand) {
    var jobSavedCheck = 1;
    var dataObjJobSeekerSavedJobs = getJobSeekerSavedJobs();
    if (dataObjJobSeekerSavedJobs.length != 0) {
        for (var i = 0; i < dataObjJobSeekerSavedJobs.length; i++) {
            if (objExpand.jobId == dataObjJobSeekerSavedJobs[i].JobId) {
                alert("Job already Saved");
                jobSavedCheck = 0;
                break;
            }

        }
    }
    else {
        jobSavedCheck = 1;
    }
    if (jobSavedCheck == 1) {

        var today = new Date();
        var monthtext = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var dataObjSavedJobs;
        var jobSeekerSavedJobsObj = {}
        jobSeekerSavedJobsObj.JobId = objExpand.jobId;
        jobSeekerSavedJobsObj.DateApplied = monthtext[today.getMonth()] + today.getDate() + ',' + today.getFullYear();


        dataObjSavedJobs = JSON.stringify(jobSeekerSavedJobsObj);
        var apiUrlSaveJob = GetWebAPIURL() + '/api/JobSeekerSavedJobs/';


        //To create additional information of jobseeker
        $.ajax({
            url: apiUrlSaveJob,
            type: "POST",
            data: dataObjSavedJobs,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                alert("job Saved Successfully");
            },
            error: function (xhr, error) {
            }
        });
    }
}

viewModel.deleteWork = function (objWork) {
    var worktypeObj = ko.toJS(objWork);

    viewModel.searchCriteria.remove(objWork);

    if (objWork.lookUpName() == 'EmploymentType') {
        viewModel.employmentTypeId([""]);
    }
    if (objWork.lookUpName() == 'IndustryType') {
        viewModel.industryTypeId([""]);
    }
    if (objWork.lookUpName() == 'DegreeType') {
        viewModel.selectedIndexEducationLevel(0);
    }
    if (objWork.lookUpName() == 'Distance') {
        viewModel.selectedIndexDistance(0);
    }
    if (objWork.lookUpName() == 'Salary') {
        viewModel.salaryId([""]);
    }
    if (objWork.lookUpName() == 'CareerLevel') {
        viewModel.selectedIndexCarrierLevel(0);
    }
}

viewModel.deleteSingleSelect = function (objsingleSelect) {
    var da = 0;
    var res = '';
    var temp = '';
    $.each(viewModel.searchCriteria(), function () {
        res = this.contentArray.remove(objsingleSelect);
        if (res.length > 0) {
            if (viewModel.searchCriteria()[da].lookUpName() == 'EmploymentType') {
                viewModel.employmentTypeId.remove(objsingleSelect.lookUpId());
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                if (viewModel.employmentTypeId().length > 0) {
                    var createSearch = new createsearchCriteria(0);
                    viewModel.searchCriteria.splice(0, 0, createSearch);
                }
            }
            else if (viewModel.searchCriteria()[da].lookUpName() == 'IndustryType') {
                viewModel.industryTypeId.remove(objsingleSelect.lookUpId());
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                if (viewModel.industryTypeId().length > 0) {
                    var createSearch = new createsearchCriteria(1);
                    viewModel.searchCriteria.splice(1, 0, createSearch);
                }
            }
            else if (viewModel.searchCriteria()[da].lookUpName() == 'Salary') {
                viewModel.salaryId.remove(objsingleSelect.lookUpId());
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                if (viewModel.salaryId().length > 0) {
                    var createSearch = new createsearchCriteria(4);
                    viewModel.searchCriteria.splice(4, 0, createSearch);
                }
            }
            else if (viewModel.searchCriteria()[da].lookUpName() == 'DegreeType') {
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                viewModel.selectedIndexEducationLevel(0);
            }

            else if (viewModel.searchCriteria()[da].lookUpName() == 'CareerLevel') {
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                viewModel.selectedIndexCarrierLevel(0);
            }

            else if (viewModel.searchCriteria()[da].lookUpName() == 'Distance') {
                temp = viewModel.searchCriteria()[da];
                viewModel.searchCriteria.remove(temp);
                viewModel.selectedIndexDistance(0);
            }
        }
        da++
    });
}

viewModel.saveSearch = function () {
    viewModel.saveSearchCheck('1');
    employment = [];
    salary = [];
    industry = [];
    degree = [];
    carrierLevel = [];
    distance = [];
    viewModel.searchCriteria.removeAll();

    if (viewModel.employmentTypeId() && viewModel.employmentTypeId() != "") {
        var createSearch = new createsearchCriteria(0);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.industryTypeId() && viewModel.industryTypeId() != "") {
        var createSearch = new createsearchCriteria(1);
        viewModel.searchCriteria.push(createSearch);
    }

    if (viewModel.salaryId() && viewModel.salaryId() != "") {
        var createSearch = new createsearchCriteria(4);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexEducationLevel() && viewModel.selectedIndexEducationLevel() != "") {
        var createSearch = new createsearchCriteria(2);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexDistance() && viewModel.selectedIndexDistance() != -1) {
        var createSearch = new createsearchCriteria(3);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.selectedIndexCarrierLevel() && viewModel.selectedIndexCarrierLevel() != -1) {

        var createSearch = new createsearchCriteria(5);
        viewModel.searchCriteria.push(createSearch);
    }
    if (viewModel.searchName()) {
        var jobSeekerSaveSearchObj = {}
        var jsonObject = ko.toJS(viewModel);
        jobSeekerSaveSearchObj.SearchName = jsonObject.searchName;

        jobSeekerSaveSearchObj.EmployeementType = jsonObject.employmentTypeId.toString();
        jobSeekerSaveSearchObj.Industry = jsonObject.industryTypeId.toString();
        jobSeekerSaveSearchObj.carrierLevel = viewModel.dataCarrierLevel()[viewModel.selectedIndexCarrierLevel()].value;
        jobSeekerSaveSearchObj.EducationLevel = viewModel.dataEducationLevel()[viewModel.selectedIndexEducationLevel()].value;
        jobSeekerSaveSearchObj.Distance = viewModel.dataDistance()[viewModel.selectedIndexDistance()].value;
        jobSeekerSaveSearchObj.Salary = jsonObject.salaryId.toString();
        var dataObjJobSeekerSaveSearch = JSON.stringify(jobSeekerSaveSearchObj);
        //alert(dataObjJobSeekerSaveSearch);

        var apiUrlSavedJobSearch = GetWebAPIURL() + '/api/SavedJobSearch/';

        //To create additional information of jobseeker
        $.ajax({
            url: apiUrlSavedJobSearch,
            type: "POST",
            data: dataObjJobSeekerSaveSearch,
            headers: app.securityHeaders(),
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {

            },
            error: function (xhr, error) {
                alert('Error :' + error);
            }
        });
    }
    else {
        alert("Enter Name to save search");
    }
}
