$(document).ready(function ()
{
    var deleteId = getParameterByName('DeleteId');
    if (deleteId != null && deleteId.length > 0)
    {
        var rootUrl = 'http://localhost:2043';
        var apiUrl = '/api/JobSeeker/' + deleteId;
        var viewModel;

        $.ajax({
            url: rootUrl + apiUrl,
            type: 'DELETE',
            async : false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                alert('Job Seeker has been deleted.');
            },
            error: function (xhr, status, error) {
                alert('Error :' + status);
            }
        });
    }
    var rootUrl = 'http://localhost:2043';
    var apiUrl = '/api/JobSeeker/';   
    var viewModel =
    {
        persons: ko.observableArray()
    };
    $.ajax({
        url: rootUrl + apiUrl,
        type: 'GET',
        dataType: 'JSON',

        success: function (data) {
            for (da in data) {
                var person = {
                    FirstName: ko.observable(''),
                    LastName: ko.observable(''),
                    Email: ko.observable(''),
                    Birthday: ko.observable(''),
                    Id: ko.observable('')
                };
                Uid = data[da].Id;
                person.Id(data[da].Id);
                person.FirstName(data[da].FirstName);
                person.LastName(data[da].LastName);
                person.Email(data[da].Email);
                person.Birthday(data[da].Birthday);
                person.EditUrl = ko.computed(function () {
                    return '/Views/JobSeeker/JobSeekerEdit.html?Id=' + data[da].Id;
                }, this);
                person.DeleteUrl = ko.computed(function () {
                    return '/Views/JobSeeker/JobSeekerList.html?DeleteId=' + data[da].Id;
                }, this);
                viewModel.persons.push(person);
            }
        },
        error: function (xhr, status, error) {
            alert('Error :' + status);
        }
    });

    ko.applyBindings(viewModel, document.getElementById('form_div'));
    var that = this;
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
