$(document).ready(function () {
    initMessageCenter();
});

function getJobSeekerMessageList()
{
    var apiUrlMessage = GetWebAPIURL() + '/api/ListJobSeekerMessage/';
    var dataJobSeekerMessageObj;

    //TO get details of worktype lookup details
    $.ajax({
        url: apiUrlMessage,
        type: 'GET',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            dataJobSeekerMessageObj = data;


        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });
   
    return dataJobSeekerMessageObj;
}

function initMessageCenter()
{
    viewModel.messageList = ko.observableArray();    
    var dataJobSeekerMessageObj = getJobSeekerMessageList();

    if (dataJobSeekerMessageObj) {

        for (var i = 0; i < dataJobSeekerMessageObj.length; i++) {
            
            var listMessage = new jobListCreate(dataJobSeekerMessageObj[i]);
            viewModel.messageList.push(listMessage);
        }
    }
}
function jobListCreate(objMessage) {
    var self = this;
    self.btnrespondMessage = ko.observable('+');
    self.replayMessageSubject = ko.observable('');
    self.replayMessageContent = ko.observable('');
    if (objMessage) {
        self.companyId = objMessage.CompanyId;
        self.jobseekerId = objMessage.JobSeekerId;
        self.employerId = objMessage.EmployerId;
        self.messageId = objMessage.MessageID;

        self.employer = objMessage.EmployerName;
        self.companyName = objMessage.CompanyName;
        self.position = objMessage.JobTitle;
        self.place = objMessage.CompanyLocation;
        self.datePosted = objMessage.JobPostedDate;
        self.jobId = objMessage.JobId;
        self.jobDescription = objMessage.MessageDetails;
        self.messageSentDate = objMessage.MessageSentDate;
        self.subject = objMessage.MessageSubject;
        self.skillScore = objMessage.SkillScore;
    }
}

viewModel.respondMessage=function(objMessage)
{
    if (objMessage.btnrespondMessage() == '+') {
        objMessage.btnrespondMessage('-');
        
    }
    else {
        objMessage.btnrespondMessage('-');
        
    }
}
viewModel.saveSentMessage = function (objMessage)
{
    var jsonObjectMessage = ko.toJS(objMessage);
    var dataObjMessage;
    var jobSeekerMessageObj = {}
    jobSeekerMessageObj.JobSeekerId = jsonObjectMessage.jobseekerId;
    jobSeekerMessageObj.CompanyId = jsonObjectMessage.companyId;
    jobSeekerMessageObj.EmployerId = jsonObjectMessage.employerId;
    jobSeekerMessageObj.JobId = jsonObjectMessage.jobId;
    jobSeekerMessageObj.Subject = jsonObjectMessage.replayMessageSubject;
    jobSeekerMessageObj.Message = jsonObjectMessage.replayMessageContent;
    jobSeekerMessageObj.Date = "Date";

    dataObjMessage = JSON.stringify(jobSeekerMessageObj);
    alert(dataObjMessage);
    var apiUrlMessage = GetWebAPIURL() + '/api/EmployerMessage';
    //To insert data into scholarship table
    $.ajax({
        url: apiUrlMessage,
        type: "Post",
        data: dataObjMessage,
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            objMessage.btnrespondMessage('+');
        },
        error: function (xhr, error) {
            alert('Error :' + error);
        }
    });
}
viewModel.cancelSentMessage = function (objMessage)
{
    objMessage.replayMessageSubject('');
    objMessage.replayMessageContent('');
    objMessage.btnrespondMessage('+');
}

