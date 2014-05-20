$(document).ready(function () {
    initMessageCenter();
});

function initMessageCenter()
{
    viewModel.jobList = ko.observableArray();
    for (var i = 0; i < 4; i++) {
        addJobList();
    }    
}
function jobListCreate()
{
    var self = this;
    self.employer = "Brandekko";
    self.position = 'Creative Director';
    self.place = 'Washington, Dc Area';
    self.datePosted = 'January 31,2014';
    self.jobDescription = 'Job vaccancy is for creative director';
}
function addJobList() {
    var listJob = new jobListCreate();
    viewModel.jobList.push(listJob);
}