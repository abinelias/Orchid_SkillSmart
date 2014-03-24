if (typeof (skillsmart) == 'undefined') skillsmart = {}
if (typeof (skillsmart.model) == 'undefined') skillsmart.model = {}
if (typeof (skillsmart.model.jobseekermyinformation) == 'undefined') skillsmart.model.jobseekermyinformation = {}

skillsmart.model.jobseekermyinformation.initializeViewModelMyInformation = function (dataObjJobSeeker, dataObjAdditionalInfo, dataCountryObj) {
    var viewModel = {
        name: ko.observable(dataObjJobSeeker.FirstName + " " + dataObjJobSeeker.LastName),
        address: ko.observable(dataObjAdditionalInfo.AddressLine1 + " " + dataObjAdditionalInfo.AddressLine2 + " " + dataCountryObj.Name)
    }
    return viewModel;
}
skillsmart.model.jobseekermyinformation.initializeViewModelPersonalInformation = function (dataObjOverview, dataSecurityCleareanceObj, dataWillingToRelocate, dataObjGetSecurityCleareance, dataObjGetWillingToRelocate) {
    var viewModel = {
        myinfoid: ko.observable(dataObjOverview.Id),

        industriesTextbox: ko.observable(dataObjOverview.Industry),
        industriesLabel: ko.observable(dataObjOverview.Industry),

        specialityLabel: ko.observable(dataObjOverview.Speciality),
        specialityTextbox: ko.observable(dataObjOverview.Speciality),

        WillingToRelocateLabel: ko.observable(dataObjGetWillingToRelocate.Name),
        SecurityCleareanceLabel: ko.observable(dataObjGetSecurityCleareance.Name),

        selectedSecurityCleareanceItem: ko.observable(dataObjOverview.SecurityClearanceId),
        SecurityCleareance: ko.observableArray(),

        selectedWillingToRelocate: ko.observable(dataObjOverview.WillingToRelocateId),
        WillingToRelocate: ko.observableArray()
    }
    viewModel.SecurityCleareance.push({ name: "Select", id: "" });
    for (key in dataSecurityCleareanceObj) {

        viewModel.SecurityCleareance.push({ name: dataSecurityCleareanceObj[key].Name, id: dataSecurityCleareanceObj[key].Id });
    }


    viewModel.WillingToRelocate.push({ name: "Select", id: "" });
    for (key in dataWillingToRelocate) {

        viewModel.WillingToRelocate.push({ name: dataWillingToRelocate[key].Name, id: dataWillingToRelocate[key].Id });
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelAboutMe = function (dataObjOverview) {
    var viewModel = {
        myinfoid: ko.observable(dataObjOverview.Id),
        summary: ko.observable(dataObjOverview.Summary),
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelAwardsInsertion = function () {
    var viewModel = {
        title: ko.observable(),
        description: ko.observable(),
        awardid: ko.observable(),
        jobseekerid: ko.observable()
    }

    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelAwardsListing = function (dataObjScholarShip) {
    var viewModel = {
        awards: ko.observableArray()
    }

    for (da in dataObjScholarShip) {
        var awards = {
            ScholarshipTitle: ko.observable(''),
            ScholarshipDescription: ko.observable(''),
            Id: ko.observable(''),
            jobseekerId: ko.observable('')
        };

        awards.ScholarshipTitle(dataObjScholarShip[da].ScholarshipTitle);
        awards.ScholarshipDescription(dataObjScholarShip[da].ScholarshipDescription);
        awards.Id(dataObjScholarShip[da].Id);
        awards.jobseekerId(dataObjScholarShip[da].JobSeekerId);
        viewModel.awards.push(awards);
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelActivitiesInsertion = function () {
    var viewModel = {
        hobbies: ko.observable(),
        activityid: ko.observable(),
        JobSeekerId: ko.observable()
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelActivitiesListing = function (dataObjActivities) {
    var viewModel = {

        activities: ko.observableArray()
    }
    for (da in dataObjActivities) {

        var activities = {
            Activity: ko.observable(''),
            JobSeekerId: ko.observable(''),
            Id: ko.observable('')
        };

        activities.Activity(dataObjActivities[da].Activity);
        activities.JobSeekerId(dataObjActivities[da].JobSeekerId);
        activities.Id(dataObjActivities[da].Id);
        viewModel.activities.push(activities);
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelLanguagesInsertion = function (dataLanguageListObj, dataProficiencyObj) {
    var viewModel = {
        languageId: ko.observable(''),
        jobSeekerId: ko.observable(''),
        LanguageLabel: ko.observable(''),
        Id: ko.observable(''),

        selectedLanguage: ko.observable(''),
        LanguageList: ko.observableArray(),

        selectedProficiency: ko.observable(''),
        Proficiency: ko.observableArray()
    }
    viewModel.LanguageList.push({ name: "Language", id: "" });
    for (da in dataLanguageListObj) {
        viewModel.LanguageList.push({ name: dataLanguageListObj[da].Name, id: dataLanguageListObj[da].Id });
    }

    viewModel.Proficiency.push({ name: "Proficiency", id: "" });
    for (da in dataProficiencyObj) {
        viewModel.Proficiency.push({ name: dataProficiencyObj[da].Name, id: dataProficiencyObj[da].Id });
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelLanguagesList = function (dataObjLanguages, dataLanguageListObj) {
    var viewModel = {

        languages: ko.observableArray()
    }
    for (da in dataObjLanguages) {

        var languages = {
            LanguageId: ko.observable(''),
            LanguageName: ko.observable(''),
            JobSeekerId: ko.observable(''),
            ProficiencyId: ko.observable(''),
            Id: ko.observable()
        };


        for (key in dataLanguageListObj) {
            if (dataLanguageListObj[key].Id == dataObjLanguages[da].LanguageId) {
                languages.LanguageName(dataLanguageListObj[key].Name);
                break;
            }
        }


        languages.LanguageId(dataObjLanguages[da].LanguageId);
        languages.JobSeekerId(dataObjLanguages[da].JobSeekerId);
        languages.ProficiencyId(dataObjLanguages[da].ProficiencyId);
        languages.Id(dataObjLanguages[da].Id);
        viewModel.languages.push(languages);
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelWorkExperienceInsertion = function (dataIndustryTypeObj, dataWorkTypeObj) {
    var viewModel = {
        companyName: ko.observable(),
        currentPosition: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        companyLocation: ko.observable(),
        currentSalary: ko.observable(),
        salaryType: ko.observable(),
        jobDescription: ko.observable(),
        jobSeekerId: ko.observable(''),
        workHistoryId: ko.observable(),
        industryTypeName: ko.observable(),
        workTypeName: ko.observable(),

        selectedIndusrtyType: ko.observable(''),
        IndusrtyType: ko.observableArray(),

        selectedWorkType: ko.observable(''),
        WorkType: ko.observableArray()
    }
    viewModel.IndusrtyType.push({ name: "IndusrtyType", id: "" });
    for (da in dataIndustryTypeObj) {
        viewModel.IndusrtyType.push({ name: dataIndustryTypeObj[da].Name, id: dataIndustryTypeObj[da].Id });
    }

    viewModel.WorkType.push({ name: "WorkType", id: "" });
    for (da in dataWorkTypeObj) {
        viewModel.WorkType.push({ name: dataWorkTypeObj[da].Name, id: dataWorkTypeObj[da].Id });
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelWorkExperienceList = function (dataobjWorkExpereince, dataIndustryTypeObj, dataWorkTypeObj) {

    var viewModel = {

        workHistory: ko.observableArray()
    }
    for (da in dataobjWorkExpereince) {

        var workHistory = {
            companyName: ko.observable(),
            currentPosition: ko.observable(),
            startDate: ko.observable(),
            endDate: ko.observable(),
            companyLocation: ko.observable(),
            currentSalary: ko.observable(),
            salaryType: ko.observable(),
            jobDescription: ko.observable(),
            jobSeekerId: ko.observable(''),
            workHistoryId: ko.observable(),
            industryTypeName: ko.observable(),
            workTypeName: ko.observable(),
            industryTypeId: ko.observable(),
            workTypeId: ko.observable()
        };


        for (key in dataIndustryTypeObj) {
            if (dataIndustryTypeObj[key].Id == dataobjWorkExpereince[da].IndustryId) {
                workHistory.industryTypeName(dataIndustryTypeObj[key].Name);
                break;
            }
        }

        for (key in dataWorkTypeObj) {
            if (dataWorkTypeObj[key].Id == dataobjWorkExpereince[da].WorkTypeId) {
                workHistory.workTypeName(dataWorkTypeObj[key].Name);
                break;
            }
        }


        workHistory.industryTypeId(dataobjWorkExpereince[da].IndustryId);
        workHistory.jobSeekerId(dataobjWorkExpereince[da].JobSeekerId);
        workHistory.workTypeId(dataobjWorkExpereince[da].WorkTypeId);
        workHistory.workHistoryId(dataobjWorkExpereince[da].Id);

        workHistory.companyName(dataobjWorkExpereince[da].CompanyName);
        workHistory.currentPosition(dataobjWorkExpereince[da].EndingPosition);
        workHistory.startDate(dataobjWorkExpereince[da].StartDate);
        workHistory.endDate(dataobjWorkExpereince[da].EndDate);
        workHistory.companyLocation(dataobjWorkExpereince[da].CompanyLocation);
        workHistory.salaryType(dataobjWorkExpereince[da].SalaryType);

        workHistory.jobDescription(dataobjWorkExpereince[da].JobDuties);
        workHistory.currentSalary(dataobjWorkExpereince[da].EndingSalary);


        viewModel.workHistory.push(workHistory);
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelEducationInsertion = function (dataDegreeTypeObj) {
    var viewModel = {
        jobseekerId: ko.observable(),
        educationId: ko.observable(),
        universityName: ko.observable(),
        startDate: ko.observable(),
        endDate: ko.observable(),
        universityLocation: ko.observable(),
        degreeName: ko.observable(),
        majorFocus: ko.observable(),

        selectedDegree: ko.observable(''),
        degree: ko.observableArray()
    }

    viewModel.degree.push({ name: "Degree", id: "" });
    for (da in dataDegreeTypeObj) {
        viewModel.degree.push({ name: dataDegreeTypeObj[da].Name, id: dataDegreeTypeObj[da].Id });
    }

    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelEducationList = function (dataobjEducation, dataDegreeTypeObj) {

    var viewModel = {

        education: ko.observableArray()
    }
    for (da in dataobjEducation) {

        var education = {
            universityName: ko.observable(),
            degree: ko.observable(),
            startDate: ko.observable(),
            endDate: ko.observable(),
            universityLocation: ko.observable(),
            degreeName: ko.observable(),
            majorFocus: ko.observable(),

            jobSeekerId: ko.observable(''),
            educationId: ko.observable()

        };

        for (key in dataDegreeTypeObj) {
            if (dataDegreeTypeObj[key].Id == dataobjEducation[da].DegreeId) {
                education.degreeName(dataDegreeTypeObj[key].Name);
                break;
            }
        }

        education.universityName(dataobjEducation[da].InstitutionName);
        education.degree(dataobjEducation[da].DegreeId);
        education.startDate(dataobjEducation[da].StartDate);
        education.endDate(dataobjEducation[da].EndDate);
        education.majorFocus(dataobjEducation[da].MajorFocus);

        education.universityLocation(dataobjEducation[da].InstitutionLocation);
        education.jobSeekerId(dataobjEducation[da].JobSeekerId);
        education.educationId(dataobjEducation[da].Id);

        viewModel.education.push(education);
    }
    return viewModel;
}

skillsmart.model.jobseekermyinformation.initializeViewModelTrainingCourseInsertion = function () {
    var viewModel =
    {
        jobseekerId: ko.observable(),
        trainingId: ko.observable(),

        selectedProgramType: ko.observable(),
        programType: ko.observableArray(),

        focus: ko.observable(),
        completionDate: ko.observable(),
        currentlyEnrolled: ko.observable()

    }
    return viewModel;
}